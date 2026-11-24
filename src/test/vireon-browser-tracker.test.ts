/// <reference types="vitest/jsdom" />
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Vireon browser telemetry', () => {
  const fetchMock = vi.fn<typeof fetch>();
  const payload = (index: number) => JSON.parse(String(fetchMock.mock.calls[index]?.[1]?.body));

  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    jsdom.reconfigure({ url: 'https://www.forcemichaelthompson.app/v2/quiz' });
    sessionStorage.clear();
    fetchMock.mockReset().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('updates the traffic group when a Meta UTM arrives and keeps it on untagged pages', async () => {
    const tracker = await import('@/lib/vireon-browser-tracker');
    tracker.trackQuestionMetric('symptom', 'view');
    history.replaceState(null, '', '/v2/quiz?utm_source=Meta');
    tracker.trackQuestionMetric('duration', 'view');
    history.replaceState(null, '', '/v2/offer');
    tracker.trackVideoMetric('offer', 'view');

    expect([payload(0).traffic, payload(1).traffic, payload(2).traffic]).toEqual(['other', 'fb', 'fb']);
    expect(payload(1)).not.toHaveProperty('session_id');
  });

  it('replaces the attribution pair together and restores it across reloads', async () => {
    let tracker = await import('@/lib/vireon-browser-tracker');
    history.replaceState(null, '', '/v2/quiz?utm_source=facebook');
    tracker.sendFunnelEvent('quiz_start');
    history.replaceState(null, '', '/v2/quiz?utm_source=google&utm_campaign=search');
    tracker.trackRoute();
    await vi.advanceTimersByTimeAsync(0);

    vi.resetModules();
    tracker = await import('@/lib/vireon-browser-tracker');
    history.replaceState(null, '', '/v2/offer');
    tracker.sendFunnelEvent('offer_view');
    expect(payload(2)).toMatchObject({ utm_source: 'google', utm_campaign: 'search' });

    history.replaceState(null, '', '/v2/offer?utm_campaign=new');
    tracker.sendFunnelEvent('checkout_click');
    expect(payload(3)).toMatchObject({ utm_source: '', utm_campaign: 'new' });
  });

  it('retries a 503 with an identical payload, suppressing duplicate milestone calls', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 503 }));
    const tracker = await import('@/lib/vireon-browser-tracker');
    tracker.sendFunnelEvent('quiz_complete');
    tracker.sendFunnelEvent('quiz_complete');
    await vi.advanceTimersByTimeAsync(1000);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(payload(1)).toEqual(payload(0));
    tracker.sendFunnelEvent('quiz_complete');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('restores a queued event after reload and drops a permanent rejection', async () => {
    fetchMock.mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce(new Response(null, { status: 400 }));
    let tracker = await import('@/lib/vireon-browser-tracker');
    tracker.sendFunnelEvent('checkout_click');
    await vi.advanceTimersByTimeAsync(0);

    vi.clearAllTimers();
    vi.resetModules();
    tracker = await import('@/lib/vireon-browser-tracker');
    history.replaceState(null, '', '/v2/offer');
    tracker.trackRoute();
    await vi.advanceTimersByTimeAsync(30_000);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(payload(1).event).toBe('offer_view');
    expect(payload(2)).toEqual(payload(0));
  });
});
