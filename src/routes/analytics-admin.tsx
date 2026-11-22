import { createFileRoute } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';

type EventRow = {
  source?: string; event?: string; session_id?: string; path?: string; step?: string;
  product_name?: string; order_code?: string; sale_status_enum?: number;
  utm_source?: string; utm_campaign?: string; received_at?: string;
};
type EventDistributionItem = { event: string; count: number; percentage: number };
type TrackingHealth = {
  storage: 'ok';
  checkedAt: string;
  lastWebsiteEventAt: string | null;
  minutesSinceLastWebsiteEvent: number | null;
  eventsLastHour: number;
  eventsLast24Hours: number;
  activity: 'recent' | 'quiet' | 'none';
};

function TrackingHealthPanel({ health }: { health: TrackingHealth }) {
  const last = health.lastWebsiteEventAt ?
    new Date(health.lastWebsiteEventAt).toLocaleString('pt-BR') : 'Nenhum evento encontrado';
  const activity = health.activity === 'recent' ? 'Eventos recebidos na última hora'
    : health.activity === 'quiet' ? 'Sem eventos na última hora'
    : 'Sem eventos de visitantes armazenados';
  return <section aria-label="Diagnóstico do rastreamento" style={{
    padding: 16, margin: '16px 0', borderRadius: 10,
    background: '#1e293b', border: '1px solid #475569',
  }}>
    <h2 style={{ fontSize: 17, margin: '0 0 10px' }}>Diagnóstico do rastreamento</h2>
    <div className="va-panel-metrics">
      <div className="va-panel-metric">
        <div className="va-metric-label">Consulta ao banco</div>
        <div className="va-metric-value" style={{ color: '#86efac' }}>Respondendo</div>
      </div>
      <div className="va-panel-metric">
        <div className="va-metric-label">Último evento do /v2 recebido</div>
        <div className="va-metric-value">{last}</div>
      </div>
      <div className="va-panel-metric">
        <div className="va-metric-label">Eventos na última hora</div>
        <div className="va-metric-value">{health.eventsLastHour.toLocaleString('pt-BR')}</div>
      </div>
      <div className="va-panel-metric">
        <div className="va-metric-label">Eventos em 24 horas</div>
        <div className="va-metric-value">{health.eventsLast24Hours.toLocaleString('pt-BR')}</div>
      </div>
    </div>
    <p style={{ color: health.activity === 'recent' ? '#86efac' : '#fbbf24', margin: '12px 0 4px', fontSize: 13, fontWeight: 600 }}>
      {activity}
    </p>
    <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5, margin: 0 }}>
      Estes dados são independentes dos filtros e mostram apenas eventos recebidos do domínio /v2.
      Sem eventos recentes não significa, por si só, rastreamento com defeito: pode não haver tráfego.
      A resposta do banco não confirma que todos os navegadores estão enviando os eventos.
    </p>
  </section>;
}

const EVENT_LABELS: Record<string, string> = {
  page_view: 'Visitas ao funil',
  quiz_start: 'Inícios do quiz',
  quiz_midpoint: 'Metade do quiz (6/11)',
  quiz_complete: 'Quiz concluído (11/11)',
  offer_view: 'Visualizações da oferta',
  checkout_click: 'Cliques no checkout',
  upsell_view: 'Visualizações de upsell',
  upsell_accept: 'Aceites de upsell',
  upsell_decline: 'Recusas de upsell',
  thank_you_view: 'Página de obrigado',
  payment_status: 'Notificações de pagamento',
};

function EventDistributionChart({ items, total }: { items: EventDistributionItem[]; total: number }) {
  return <section aria-label="Gráfico percentual dos eventos" style={{
    background: '#1e293b', border: '1px solid #334155', borderRadius: 12,
    padding: '18px 20px', margin: '18px 0 22px',
  }}>
    <h2 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 7px' }}>
      Distribuição dos eventos (%)
    </h2>
    <p style={{ color: '#cbd5e1', fontSize: 13, margin: '0 0 18px' }}>
      Percentual calculado sobre os {total.toLocaleString('pt-BR')} eventos encontrados em todo o filtro, não apenas sobre a página exibida.
    </p>
    {total === 0 ? <p style={{ color: '#94a3b8' }}>Nenhum evento para exibir no gráfico.</p> :
      items.map((item) => <div key={item.event} style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 13,
      }}>
        <span title={item.event} style={{ width: 200, maxWidth: '100%', fontSize: 13, fontWeight: 600 }}>
          {EVENT_LABELS[item.event] || item.event}
        </span>
        <div role="meter" aria-label={EVENT_LABELS[item.event] || item.event}
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.percentage}
          style={{ flex: '1 1 180px', height: 16, background: '#334155', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: item.percentage + '%', borderRadius: 10,
            background: 'linear-gradient(90deg, #2563eb, #38bdf8)',
          }}/>
        </div>
        <span style={{ textAlign: 'right', minWidth: 120, fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>
          <strong>{item.percentage.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%</strong>
          <span style={{ color: '#cbd5e1' }}> · {item.count.toLocaleString('pt-BR')}</span>
        </span>
      </div>)
    }
    <p style={{ color: '#94a3b8', fontSize: 12, margin: '13px 0 0' }}>
      Esse gráfico mostra a participação de cada tipo de evento no total; não é taxa de conversão por visitante.
      Notificações de pagamento não representam necessariamente vendas aprovadas.
    </p>
  </section>;
}

type FunnelStep = {
  key: string;
  label: string;
  count: number;
  percentage: number;
  advanceFromPrevious?: number | null;
  missingFromPrevious?: number;
  missingFromPreviousPercentage?: number | null;
};
type SessionFunnel = {
  landingSessions: number;
  totalTrackedSessions: number;
  sessionsWithoutLanding: number;
  observedStages: FunnelStep[];
  lastStage: FunnelStep[];
};

function SessionFunnelPanel({ funnel }: { funnel: SessionFunnel }) {
  const steps = Array.isArray(funnel.observedStages) ? funnel.observedStages : [];
  const last = Array.isArray(funnel.lastStage) ? funnel.lastStage : [];
  const percent = (value: number) => value.toLocaleString('pt-BR', {
    minimumFractionDigits: 1, maximumFractionDigits: 1,
  }) + '%';
  return <section aria-label="Funil de sessões por etapa" style={{
    borderRadius: 12, border: '1px solid #334155', padding: 20,
    background: '#1e293b', margin: '20px 0',
  }}>
    <h2 style={{ fontSize: 19, fontWeight: 700, marginBottom: 6 }}>
      Onde os registros dos visitantes terminam
    </h2>
    <p style={{ fontSize: 13, color: '#cbd5e1', marginTop: 0 }}>
      Sessões únicas iniciadas na entrada /v2, considerando todos os registros do filtro aplicado.
      Contagens não são número de eventos repetidos. Os novos marcos do quiz só aparecem para sessões rastreadas após a atualização.
    </p>
    {funnel.landingSessions === 0 ?
      <p style={{ background: '#334155', padding: 12, borderRadius: 6 }}>
        Nenhuma sessão com entrada /v2 identificada neste conjunto de dados. Confira a instalação do rastreador e limpe o filtro antes de interpretar o abandono.
      </p> :
      <>
        <h3 style={{ fontSize: 15, margin: '15px 0' }}>Avanço observado por etapa</h3>
        {steps.map((step, index) => {
          const previous = index > 0 ? steps[index - 1] : null;
          const withoutNext = previous ? Math.max(previous.count - step.count, 0) : 0;
          const withoutNextPercent = previous?.count ? (withoutNext / previous.count) * 100 : 0;
          const advanceRate = previous ? step.advanceFromPrevious : null;
          return <div key={step.key} style={{ marginBottom: 15 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{step.label}</span>
              <strong style={{ fontVariantNumeric: 'tabular-nums' }}>
                {step.count.toLocaleString('pt-BR')} · {percent(step.percentage)}
              </strong>
            </div>
            <div style={{ background: '#334155', height: 13, borderRadius: 8, overflow: 'hidden', marginTop: 7 }}>
              <div style={{ width: step.percentage + '%', height: '100%', background: '#38bdf8', borderRadius: 8 }}/>
            </div>
            {previous && <div style={{ color: '#fbbf24', fontSize: 12, marginTop: 4 }}>
              {withoutNext.toLocaleString('pt-BR')} sessão(ões) sem registro dessa etapa ou posterior ({percent(withoutNextPercent)} da anterior).
            </div>}
            {previous && <div style={{ fontSize: 12, color: '#7dd3fc', marginTop: 4, fontWeight: 700 }}>
              Avanço da etapa anterior: {advanceRate === null || advanceRate === undefined ? 'Sem base de comparação' : percent(advanceRate)}
            </div>}
          </div>;
        })}
        <h3 style={{ fontSize: 15, margin: '22px 0 10px' }}>Última etapa observada por sessão</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10 }}>
          {last.map((step) => <div key={step.key} style={{
            border: '1px solid #475569', borderRadius: 8, padding: 12,
          }}>
            <div style={{ fontSize: 12, color: '#cbd5e1' }}>{step.label}</div>
            <strong style={{ display: 'block', fontSize: 23, fontVariantNumeric: 'tabular-nums' }}>
              {step.count.toLocaleString('pt-BR')}
            </strong>
            <div style={{ color: '#7dd3fc', fontSize: 13 }}>{percent(step.percentage)} das sessões de entrada</div>
          </div>)}
        </div>
      </>
    }
    {funnel.sessionsWithoutLanding > 0 && <p style={{
      borderLeft: '3px solid #fbbf24', paddingLeft: 12, marginTop: 18, fontSize: 13,
    }}>
      Há {funnel.sessionsWithoutLanding.toLocaleString('pt-BR')} sessão(ões) com eventos,
      mas sem entrada /v2 registrada. Podem ser acessos diretos a outras páginas ou falhas na coleta da entrada.
    </p>}
    <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5, marginTop: 18 }}>
      Atenção: “último registro” não prova abandono. Eventos podem não chegar por bloqueio
      do navegador, navegação direta ou falha de instalação. “Clique no checkout”
      não comprova carregamento ou pagamento no checkout externo.
      Para analisar o funil completo, remova filtros que selecionam apenas um tipo de evento.
    </p>
  </section>;
}

export const Route = createFileRoute('/analytics-admin')({
  component: AnalyticsAdmin,
  head: () => ({ meta: [{ name: 'robots', content: 'noindex,nofollow,noarchive' }, { title: 'Vireon Analytics - Private' }] }),
});
function AnalyticsAdmin() {
  const [token, setToken] = useState('');
  const [events, setEvents] = useState<EventRow[]>([]);
  const [sessionFunnel, setSessionFunnel] = useState<SessionFunnel | null>(null);
  const [distribution, setDistribution] = useState<EventDistributionItem[]>([]);
  const [health, setHealth] = useState<TrackingHealth | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showCharts, setShowCharts] = useState(true);
  const [filter, setFilter] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('');
  const [period, setPeriod] = useState('7d');
  const [appliedPeriod, setAppliedPeriod] = useState('7d');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(500);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const actionStyle = { padding: '11px 14px', background: '#2563eb', borderRadius: 6, color: 'white', cursor: 'pointer' };
  const mutedStyle = { opacity: 0.5, cursor: 'not-allowed' };

  async function load(nextPage = 1, size = pageSize, search = filter, selectedPeriod = period) {
    if (!token.trim()) return;
    setLoading(true);
    setError('');
    try {
      const normalized = search.trim().slice(0, 120);
      const params = new URLSearchParams({ page: String(nextPage), pageSize: String(size), period: selectedPeriod });
      if (normalized) params.set('q', normalized);
      const response = await fetch('/v2/api/analytics/events?' + params.toString(), {
        headers: { Authorization: 'Bearer ' + token }, cache: 'no-store',
      });
      if (!response.ok) throw new Error(response.status === 401 ? 'Token inválido.' : 'Falha ao consultar eventos (HTTP ' + response.status + ').');
      const data = await response.json();
      setEvents(Array.isArray(data.events) ? data.events : []);
      setSessionFunnel(data.funnel && Array.isArray(data.funnel.observedStages) ? data.funnel as SessionFunnel : null);
      setDistribution(Array.isArray(data.distribution) ? data.distribution : []);
      setHealth(data.health && data.health.storage === 'ok' ? data.health as TrackingHealth : null);
      setTotal(Number(data.total) || 0);
      setPage(Number(data.page) || 1);
      setPageSize(Number(data.pageSize) || size);
      setTotalPages(Number(data.totalPages) || 1);
      setAppliedFilter(normalized);
      setAppliedPeriod(selectedPeriod);
      setLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha de conexão.');
    } finally {
      setLoading(false);
    }
  }

  async function downloadCsv() {
    if (!loaded || exporting || !token.trim()) return;
    setExporting(true);
    setError('');
    try {
      const params = new URLSearchParams({ format: 'csv', period: appliedPeriod });
      if (appliedFilter) params.set('q', appliedFilter);
      const response = await fetch('/v2/api/analytics/events?' + params.toString(), {
        headers: { Authorization: 'Bearer ' + token }, cache: 'no-store',
      });
      if (!response.ok) throw new Error(response.status === 401 ? 'Token inválido.' : 'Falha ao exportar CSV (HTTP ' + response.status + ').');
      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'vireon-v2-eventos-' + new Date().toISOString().slice(0, 10) + '.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao exportar CSV.');
    } finally {
      setExporting(false);
    }
  }

  function searchEvents(e: FormEvent) {
    e.preventDefault();
    void load(1, pageSize, filter, period);
  }

  const first = total ? (page - 1) * pageSize + 1 : 0;
  const last = Math.min(page * pageSize, total);
  const disableBack = !loaded || loading || page <= 1;
  const disableNext = !loaded || loading || page >= totalPages;

  return <main id="vireon-admin" style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px', minHeight: '100vh', fontFamily: 'Arial,Helvetica,sans-serif', color: '#f1f5f9', background: '#111827' }}>
    <style>{`
      #vireon-admin .va-toolbar-section {
        border: 1px solid #465770;
        background: #1c293b;
        border-radius: 14px;
        padding: 20px;
        margin: 20px 0;
        box-shadow: 0 10px 24px rgba(0,0,0,.14);
      }
      #vireon-admin .va-toolbar { display: grid; align-items: end; gap: 16px; }
      #vireon-admin .va-toolbar-auth { grid-template-columns: minmax(250px,1fr) auto; }
      #vireon-admin .va-toolbar-filters {
        border-top: 1px solid #475569;
        margin-top: 20px;
        padding-top: 20px;
        grid-template-columns: minmax(235px,2.2fr) minmax(190px,1.1fr) minmax(165px,1fr) auto;
      }
      #vireon-admin .va-control-group { display: flex; flex-direction: column; min-width: 0; gap: 8px; }
      #vireon-admin .va-label {
        color: #f8fafc;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: .01em;
        line-height: 1.4;
      }
      #vireon-admin .va-field {
        display: block;
        width: 100%;
        min-width: 0;
        height: 48px;
        box-sizing: border-box;
        border: 1.5px solid #8293aa;
        border-radius: 9px;
        padding: 0 14px;
        background-color: #0c192b;
        color: #ffffff;
        font-size: 15px;
        font-weight: 500;
        line-height: 1.3;
        color-scheme: dark;
        opacity: 1;
        transition: border-color .16s ease, box-shadow .16s ease, background-color .16s ease;
      }
      #vireon-admin .va-field::placeholder { color: #b6c4d6; opacity: 1; }
      #vireon-admin .va-field:focus,
      #vireon-admin .va-field:focus-visible {
        outline: none;
        border-color: #60a5fa;
        box-shadow: 0 0 0 3px rgba(96,165,250,.26);
        background-color: #0f2036;
      }
      #vireon-admin .va-select {
        cursor: pointer;
        padding-right: 12px;
        font-weight: 600;
        -webkit-text-fill-color: #ffffff;
      }
      #vireon-admin .va-select option { color: #ffffff; background-color: #0c192b; }
      #vireon-admin .va-actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
      #vireon-admin .va-button {
        min-height: 48px;
        padding: 11px 16px !important;
        border: 1px solid rgba(255,255,255,.2);
        border-radius: 9px !important;
        font-weight: 700;
        font-size: 14px;
        white-space: nowrap;
        transition: filter .16s ease, box-shadow .16s ease;
      }
      #vireon-admin .va-button:hover:not(:disabled) { filter: brightness(1.15); }
      #vireon-admin .va-button:focus-visible {
        outline: 3px solid #93c5fd;
        outline-offset: 3px;
      }
      #vireon-admin .va-button:disabled { opacity: .58; cursor: not-allowed; }
      #vireon-admin .va-panel-metrics {
        display: grid;
        grid-template-columns: 1fr 1.7fr 1fr 1fr;
        gap: 12px;
      }
      #vireon-admin .va-panel-metric {
        background: #101d30;
        border: 1px solid #465770;
        border-radius: 9px;
        padding: 13px 14px;
        min-width: 0;
      }
      #vireon-admin .va-metric-label { color: #dbeafe; font-size: 13px; font-weight: 600; margin-bottom: 7px; }
      #vireon-admin .va-metric-value { font-size: 18px; font-weight: 700; line-height: 1.3; color: #ffffff; overflow-wrap: anywhere; }
      @media (max-width: 1120px) {
        #vireon-admin .va-toolbar-filters { grid-template-columns: repeat(2,minmax(0,1fr)); }
        #vireon-admin .va-filter-action { justify-content: flex-start; }
      }
      @media (max-width: 820px) {
        #vireon-admin .va-toolbar-auth { grid-template-columns: minmax(0,1fr); }
        #vireon-admin .va-panel-metrics { grid-template-columns: repeat(2,minmax(0,1fr)); }
      }
      @media (max-width: 600px) {
        #vireon-admin { padding: 18px 12px !important; }
        #vireon-admin .va-toolbar-section { padding: 14px; }
        #vireon-admin .va-toolbar-filters { grid-template-columns: minmax(0,1fr); }
        #vireon-admin .va-actions { width: 100%; }
        #vireon-admin .va-actions .va-button { flex: 1 1 auto; white-space: normal; }
        #vireon-admin .va-panel-metrics { grid-template-columns: minmax(0,1fr); }
      }
    `}</style>
    <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-.02em', margin: 0 }}>Vireon Analytics — /v2</h1>
    <p>Eventos do funil www.forcemichaelthompson.app/v2. O token permanece apenas na memória desta aba.</p>
    <div className="va-toolbar-section">
      <form onSubmit={searchEvents} className="va-toolbar va-toolbar-auth">
        <div className="va-control-group va-token">
          <label className="va-label" htmlFor="admin-token">Token de administrador</label>
          <input id="admin-token" aria-label="Token administrativo" type="password" autoComplete="off"
            value={token}
            onChange={(e) => { setToken(e.target.value); setLoaded(false); setEvents([]); setDistribution([]); setSessionFunnel(null); setHealth(null); setTotal(0); }}
            placeholder="Digite seu token de administrador" className="va-field"/>
        </div>
        <div className="va-actions">
          <button type="submit" className="va-button" disabled={!token.trim() || loading}
            style={{ ...actionStyle, ...((!token.trim() || loading) ? mutedStyle : {}) }}>
            {loading ? 'Carregando...' : 'Atualizar eventos'}
          </button>
          <button type="button" className="va-button" disabled={!loaded || exporting || loading || total === 0}
            onClick={() => { void downloadCsv(); }}
            style={{ ...actionStyle, background: '#15803d', ...((!loaded || exporting || loading || total === 0) ? mutedStyle : {}) }}>
            {exporting ? 'Preparando CSV...' : 'Exportar CSV para Excel'}
          </button>
        </div>
      </form>
      <form onSubmit={searchEvents} className="va-toolbar va-toolbar-filters">
        <div className="va-control-group va-search">
          <label className="va-label" htmlFor="admin-search">Buscar eventos</label>
          <input id="admin-search" aria-label="Filtrar eventos" value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Sessão, evento, pedido ou campanha..."
            className="va-field"/>
        </div>
        <div className="va-control-group va-period">
          <label className="va-label" htmlFor="events-period">Período</label>
          <select id="events-period" aria-label="Período dos eventos" value={period}
            className="va-field va-select"
            onChange={(e) => {
              const selected = e.target.value;
              setPeriod(selected);
              if (loaded) void load(1, pageSize, appliedFilter, selected);
            }}>
            <option value="24h">Últimas 24 horas</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="all">Todo o histórico disponível</option>
          </select>
        </div>
        <div className="va-control-group va-page-size">
          <label className="va-label" htmlFor="events-size">Registros por página</label>
          <select id="events-size" aria-label="Registros por página" value={pageSize}
            className="va-field va-select"
            onChange={(e) => {
              const size = Number(e.target.value);
              setPageSize(size);
              if (loaded) void load(1, size, appliedFilter, appliedPeriod);
            }}>
            {[100, 250, 500, 1000].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </div>
        <div className="va-actions va-filter-action">
          <button type="submit" className="va-button" disabled={!token.trim() || loading}
            style={{ ...actionStyle, ...((!token.trim() || loading) ? mutedStyle : {}) }}>
            Aplicar filtro
          </button>
        </div>
      </form>
    </div>
    {error && <p role="alert" style={{ color: '#fca5a5' }}>{error}</p>}
    {loaded && health && <TrackingHealthPanel health={health} />}
    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '14px 0' }}>
      <button type="button" className="va-button" aria-expanded={showCharts} aria-controls="vireon-charts"
        onClick={() => setShowCharts((visible) => !visible)}
        style={{ ...actionStyle, background: '#334155', border: '1px solid #64748b' }}>
        {showCharts ? 'Ocultar gráficos' : 'Mostrar gráficos'}
      </button>
    </div>
    <div id="vireon-charts" hidden={!showCharts}>
      {loaded && sessionFunnel && <SessionFunnelPanel funnel={sessionFunnel} />}
      {loaded && <EventDistributionChart items={distribution} total={total} />}
    </div>
    <p>{loaded ? ('Exibindo ' + first + '–' + last + ' de ' + total + ' eventos encontrados.') : 'Consulte os eventos usando seu token administrativo.'}</p>
    <p style={{ fontSize: 13, opacity: 0.75 }}>
      Até 5.000 eventos recentes retidos pelo banco. Filtros por período usam o horário UTC de recebimento.
      A exportação CSV respeita o período e a pesquisa e inclui todos os resultados, não apenas a página atual.
    </p>
    <nav aria-label="Paginação de eventos" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', margin: '18px 0' }}>
      <button type="button" disabled={disableBack} onClick={() => { void load(page - 1, pageSize, appliedFilter, appliedPeriod); }}
        style={{ ...actionStyle, ...(disableBack ? mutedStyle : {}) }}>← Anterior</button>
      <span>Página {loaded ? page : 0} de {loaded ? totalPages : 0}</span>
      <button type="button" disabled={disableNext} onClick={() => { void load(page + 1, pageSize, appliedFilter, appliedPeriod); }}
        style={{ ...actionStyle, ...(disableNext ? mutedStyle : {}) }}>Próxima →</button>
    </nav>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
        <thead><tr>{['Horário', 'Origem', 'Evento', 'Sessão / Pedido', 'Página / Produto', 'Etapa', 'Campanha'].map((name) =>
          <th key={name} style={{ padding: 10, borderBottom: '1px solid #64748b', whiteSpace: 'nowrap' }}>{name}</th>
        )}</tr></thead>
        <tbody>{events.map((r, i) => <tr key={i}>
          <td style={{ padding: 10, borderBottom: '1px solid #334155', whiteSpace: 'nowrap' }}>
            {r.received_at ? new Date(r.received_at).toLocaleString('pt-BR') : '—'}
          </td>
          <td style={{ padding: 10 }}>{r.source || '—'}</td>
          <td style={{ padding: 10 }}>{r.event || '—'}{r.sale_status_enum !== undefined ? ' (' + r.sale_status_enum + ')' : ''}</td>
          <td style={{ padding: 10 }}>{r.session_id?.slice(0, 8) || r.order_code || '—'}</td>
          <td style={{ padding: 10 }}>{r.path || r.product_name || '—'}</td>
          <td style={{ padding: 10 }}>{r.step || '—'}</td>
          <td style={{ padding: 10 }}>{r.utm_campaign || '—'}</td>
        </tr>)}</tbody>
      </table>
      {loaded && !events.length && <p>Nenhum evento encontrado para o filtro atual.</p>}
    </div>
    <nav aria-label="Paginação inferior" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginTop: 20 }}>
      <button type="button" disabled={disableBack} onClick={() => { void load(page - 1, pageSize, appliedFilter, appliedPeriod); }}
        style={{ ...actionStyle, ...(disableBack ? mutedStyle : {}) }}>← Anterior</button>
      <span>Página {loaded ? page : 0} de {loaded ? totalPages : 0}</span>
      <button type="button" disabled={disableNext} onClick={() => { void load(page + 1, pageSize, appliedFilter, appliedPeriod); }}
        style={{ ...actionStyle, ...(disableNext ? mutedStyle : {}) }}>Próxima →</button>
    </nav>
    <p style={{ marginTop: 22, opacity: 0.7 }}>
      Sem dados pessoais. Sessões do site e pedidos da PerfectPay não são vinculados automaticamente.
    </p>
  </main>;
}
