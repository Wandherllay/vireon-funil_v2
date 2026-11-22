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
  const [exporting, setExporting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(500);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const actionStyle = { padding: '11px 14px', background: '#2563eb', borderRadius: 6, color: 'white', cursor: 'pointer' };
  const mutedStyle = { opacity: 0.5, cursor: 'not-allowed' };

  async function load(nextPage = 1, size = pageSize, search = filter) {
    if (!token.trim()) return;
    setLoading(true);
    setError('');
    try {
      const normalized = search.trim().slice(0, 120);
      const params = new URLSearchParams({ page: String(nextPage), pageSize: String(size) });
      if (normalized) params.set('q', normalized);
      const response = await fetch('/v2/api/analytics/events?' + params.toString(), {
        headers: { Authorization: 'Bearer ' + token }, cache: 'no-store',
      });
      if (!response.ok) throw new Error(response.status === 401 ? 'Token inválido.' : 'Falha ao consultar eventos (HTTP ' + response.status + ').');
      const data = await response.json();
      setEvents(Array.isArray(data.events) ? data.events : []);
      setTotal(Number(data.total) || 0);
      setPage(Number(data.page) || 1);
      setPageSize(Number(data.pageSize) || size);
      setTotalPages(Number(data.totalPages) || 1);
      setAppliedFilter(normalized);
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
      const params = new URLSearchParams({ format: 'csv' });
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
    void load(1, pageSize, filter);
  }

  const first = total ? (page - 1) * pageSize + 1 : 0;
  const last = Math.min(page * pageSize, total);
  const disableBack = !loaded || loading || page <= 1;
  const disableNext = !loaded || loading || page >= totalPages;

  return <main style={{ maxWidth: 1150, margin: '0 auto', padding: 24, minHeight: '100vh', fontFamily: 'Arial,sans-serif', color: '#e8eef7', background: '#111827' }}>
    <h1>Vireon Analytics — /v2</h1>
    <p>Eventos do funil www.forcemichaelthompson.app/v2. O token permanece apenas na memória desta aba.</p>
    <form onSubmit={searchEvents} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18, alignItems: 'center' }}>
      <input aria-label="Token administrativo" type="password" autoComplete="off" value={token}
        onChange={(e) => { setToken(e.target.value); setLoaded(false); setEvents([]); setTotal(0); }}
        placeholder="Token de administrador" style={{ padding: 12, flex: 1, minWidth: 220, color: '#111', borderRadius: 6 }}/>
      <button type="submit" disabled={!token.trim() || loading}
        style={{ ...actionStyle, ...((!token.trim() || loading) ? mutedStyle : {}) }}>
        {loading ? 'Carregando...' : 'Atualizar eventos'}
      </button>
      <button type="button" disabled={!loaded || exporting || loading || total === 0}
        onClick={() => { void downloadCsv(); }}
        style={{ ...actionStyle, background: '#15803d', ...((!loaded || exporting || loading || total === 0) ? mutedStyle : {}) }}>
        {exporting ? 'Preparando CSV...' : 'Exportar CSV para Excel'}
      </button>
    </form>
    <form onSubmit={searchEvents} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
      <input aria-label="Filtrar eventos" value={filter} onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtrar sessão, evento, pedido, campanha..."
        style={{ padding: 12, color: '#111', flex: 1, minWidth: 220, borderRadius: 6 }}/>
      <button type="submit" disabled={!token.trim() || loading}
        style={{ ...actionStyle, ...((!token.trim() || loading) ? mutedStyle : {}) }}>Aplicar filtro</button>
      <label htmlFor="events-size">Registros por página</label>
      <select id="events-size" value={pageSize} aria-label="Registros por página"
        onChange={(e) => {
          const size = Number(e.target.value);
          setPageSize(size);
          if (loaded) void load(1, size, appliedFilter);
        }} style={{ padding: 11, borderRadius: 6, color: '#111' }}>
        {[100, 250, 500, 1000].map((size) => <option key={size} value={size}>{size}</option>)}
      </select>
    </form>
    {error && <p role="alert" style={{ color: '#fca5a5' }}>{error}</p>}
    <p>{loaded ? ('Exibindo ' + first + '–' + last + ' de ' + total + ' eventos encontrados.') : 'Consulte os eventos usando seu token administrativo.'}</p>
    <p style={{ fontSize: 13, opacity: 0.75 }}>
      Até 5.000 eventos recentes retidos pelo banco. A exportação CSV inclui todos os resultados do filtro aplicado, não apenas a página atual.
    </p>
    <nav aria-label="Paginação de eventos" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', margin: '18px 0' }}>
      <button type="button" disabled={disableBack} onClick={() => { void load(page - 1, pageSize, appliedFilter); }}
        style={{ ...actionStyle, ...(disableBack ? mutedStyle : {}) }}>← Anterior</button>
      <span>Página {loaded ? page : 0} de {loaded ? totalPages : 0}</span>
      <button type="button" disabled={disableNext} onClick={() => { void load(page + 1, pageSize, appliedFilter); }}
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
      <button type="button" disabled={disableBack} onClick={() => { void load(page - 1, pageSize, appliedFilter); }}
        style={{ ...actionStyle, ...(disableBack ? mutedStyle : {}) }}>← Anterior</button>
      <span>Página {loaded ? page : 0} de {loaded ? totalPages : 0}</span>
      <button type="button" disabled={disableNext} onClick={() => { void load(page + 1, pageSize, appliedFilter); }}
        style={{ ...actionStyle, ...(disableNext ? mutedStyle : {}) }}>Próxima →</button>
    </nav>
    <p style={{ marginTop: 22, opacity: 0.7 }}>
      Sem dados pessoais. Sessões do site e pedidos da PerfectPay não são vinculados automaticamente.
    </p>
  </main>;
}
