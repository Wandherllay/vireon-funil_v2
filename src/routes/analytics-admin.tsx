import { createFileRoute } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';

type EventRow = {
  source?: string; event?: string; session_id?: string; path?: string; step?: string;
  product_name?: string; order_code?: string; sale_status_enum?: number;
  utm_source?: string; utm_campaign?: string; received_at?: string;
};
export const Route = createFileRoute('/analytics-admin')({
  component: AnalyticsAdmin,
  head: () => ({ meta: [{ name: 'robots', content: 'noindex,nofollow,noarchive' }, { title: 'Vireon Analytics - Private' }] }),
});
function AnalyticsAdmin() {
  const [token, setToken] = useState('');
  const [events, setEvents] = useState<EventRow[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  async function load(e?: FormEvent) {
    e?.preventDefault();
    setLoading(true); setError('');
    try {
      const response = await fetch('/v2/api/analytics/events', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' });
      if (!response.ok) throw new Error(response.status === 401 ? 'Token inválido.' : 'Falha ao consultar os eventos.');
      const data = await response.json();
      setEvents(data.events || []);
    } catch (err) { setError(err instanceof Error ? err.message : 'Falha de conexão'); }
    finally { setLoading(false); }
  }
  const rows = events.filter((r) => !filter || [r.session_id, r.event, r.path, r.product_name, r.order_code].some((x) => String(x || '').toLowerCase().includes(filter.toLowerCase())));
  return <main style={{ maxWidth: 1100, margin: '0 auto', padding: 24, minHeight: '100vh', fontFamily: 'Arial,sans-serif', color: '#e8eef7', background: '#111827' }}>
    <h1>Vireon Analytics — /v2</h1>
    <p>Consulta privada de eventos. O token permanece apenas na memória desta aba.</p>
    <form onSubmit={load} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
      <input aria-label="Token administrativo" type="password" autoComplete="off" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Token de administrador" style={{ padding: 12, flex: 1, minWidth: 200, color: '#111' }}/>
      <button type="submit" disabled={!token || loading} style={{ padding: 12, background: '#16a34a', borderRadius: 6, color: 'white' }}>{loading ? 'Carregando...' : 'Atualizar eventos'}</button>
    </form>
    {error && <p role="alert" style={{ color: '#fca5a5' }}>{error}</p>}
    <p>{rows.length} eventos exibidos (máximo de 300 eventos recentes).</p>
    <input aria-label="Filtrar eventos" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filtrar sessão, etapa, pedido..." style={{ padding: 12, width: '100%', marginBottom: 12, color: '#111' }}/>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
        <thead><tr>{['Horário', 'Origem', 'Evento', 'Sessão / Pedido', 'Página / Produto', 'Campanha'].map(x => <th key={x} style={{ padding: 10, borderBottom: '1px solid #64748b' }}>{x}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>
          <td style={{ padding: 10, borderBottom: '1px solid #334155' }}>{r.received_at ? new Date(r.received_at).toLocaleString('pt-BR') : '—'}</td>
          <td style={{ padding: 10 }}>{r.source}</td><td style={{ padding: 10 }}>{r.event}{r.sale_status_enum !== undefined ? ' (' + r.sale_status_enum + ')' : ''}</td>
          <td style={{ padding: 10 }}>{r.session_id?.slice(0, 8) || r.order_code || '—'}</td><td style={{ padding: 10 }}>{r.path || r.product_name || '—'}</td><td style={{ padding: 10 }}>{r.utm_campaign || '—'}</td>
        </tr>)}</tbody>
      </table>
    </div>
    <p style={{ marginTop: 22, opacity: .7 }}>Sem dados pessoais. Sessões do site e pedidos da PerfectPay não são vinculados automaticamente.</p>
  </main>;
}
