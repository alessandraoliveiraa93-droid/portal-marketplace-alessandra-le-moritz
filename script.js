const revenueDashboard = {
  referenceDate: '22/11/2026',
  total: {
    goal: 2400000,
    actual: 1088373.10,
    gap: 1311626.90,
    projection: 1603270.15,
    attainment: 45.35,
    projectedAttainment: 66.80
  },
  channels: [
    { name: 'Mercado Livre', goal: 1510000, actual: 736008.19, gap: 773991.81, projection: 1037102.45, attainment: 48.74 },
    { name: 'Shopee', goal: 400000, actual: 129923.05, gap: 270076.95, projection: 183073.39, attainment: 32.48 },
    { name: 'Amazon', goal: 90000, actual: 50738.86, gap: 39261.14, projection: 87383.59, attainment: 56.38 },
    { name: 'TikTok Shop', goal: 400000, actual: 171703.00, gap: 228297.00, projection: 295710.72, attainment: 42.93 }
  ]
};

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const percentage = value => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) + '%';

function renderRevenueDashboard() {
  const summary = document.querySelector('#revenueSummary');
  const list = document.querySelector('#revenueChannelList');
  if (!summary || !list) return;

  const total = revenueDashboard.total;
  summary.innerHTML = `
    <article class="summary-card primary">
      <div>
        <span class="summary-label">Faturamento realizado</span>
        <strong class="summary-value">${currency.format(total.actual)}</strong>
        <p class="summary-sub">de ${currency.format(total.goal)} em meta</p>
      </div>
      <div class="attainment-ring" style="--progress:${Math.min(total.attainment, 100) * 3.6}deg" aria-label="${percentage(total.attainment)} da meta">
        <strong>${percentage(total.attainment)}</strong>
      </div>
    </article>
    <article class="summary-card">
      <span class="summary-label">Meta total</span>
      <strong class="summary-value">${currency.format(total.goal)}</strong>
      <p class="summary-sub">Novembro de 2026</p>
    </article>
    <article class="summary-card">
      <span class="summary-label">Desvio para a meta</span>
      <strong class="summary-value">${currency.format(total.gap)}</strong>
      <p class="summary-sub">valor ainda não alcançado</p>
    </article>
    <article class="summary-card">
      <span class="summary-label">Projeção do mês</span>
      <strong class="summary-value">${currency.format(total.projection)}</strong>
      <p class="summary-sub">${percentage(total.projectedAttainment)} da meta projetada</p>
    </article>
  `;

  list.innerHTML = revenueDashboard.channels.map(channel => {
    const actualWidth = Math.min((channel.actual / channel.goal) * 100, 100);
    const projectionWidth = Math.min((channel.projection / channel.goal) * 100, 100);
    return `
      <article class="revenue-row">
        <div class="revenue-row-head">
          <span class="revenue-channel-name">${channel.name}</span>
          <span class="revenue-attainment">${percentage(channel.attainment)} atingido</span>
        </div>
        <div class="revenue-bars" aria-label="${channel.name}: ${percentage(channel.attainment)} da meta realizada">
          <span class="revenue-bar-projection" style="width:${projectionWidth}%"></span>
          <span class="revenue-bar-actual" style="width:${actualWidth}%"></span>
        </div>
        <div class="revenue-metrics">
          <div class="revenue-metric"><span>Meta</span><strong>${currency.format(channel.goal)}</strong></div>
          <div class="revenue-metric"><span>Realizado</span><strong>${currency.format(channel.actual)}</strong></div>
          <div class="revenue-metric negative"><span>Desvio</span><strong>-${currency.format(channel.gap)}</strong></div>
          <div class="revenue-metric"><span>Projeção</span><strong>${currency.format(channel.projection)}</strong></div>
        </div>
      </article>
    `;
  }).join('');
}

renderRevenueDashboard();

const channels = [
  { id: 'ml', name: 'Mercado Livre', short: 'ML', description: 'Performance, operação Full e estratégia comercial.', accent: '#987d19', soft: '#fbf2bf' },
  { id: 'tiktok', name: 'TikTok Shop', short: 'TT', description: 'Conteúdo, lives, afiliados e conversão.', accent: '#373036', soft: '#eee8ed' },
  { id: 'shopee', name: 'Shopee', short: 'SH', description: 'Campanhas, cupons, mídia e crescimento.', accent: '#b44d36', soft: '#f9ddd3' },
  { id: 'amazon', name: 'Amazon', short: 'AZ', description: 'Catálogo, rentabilidade e desenvolvimento do canal.', accent: '#3d6e8b', soft: '#dcebf2' }
];

const sections = [
  ['◫', 'Indicadores e metas', 'Faturamento, margem, ROAS e progresso das metas.'],
  ['↗', 'Links importantes', 'Acesso rápido às páginas e ferramentas do canal.'],
  ['▤', 'Documentos e treinamentos', 'Materiais, procedimentos e conteúdos de apoio.'],
  ['◇', 'Calendário de campanhas', 'Datas comerciais, ações e entregas planejadas.'],
  ['✓', 'Planos de ação', 'Prioridades, responsáveis, prazos e andamento.'],
  ['○', 'Contatos e acessos', 'Contatos úteis e orientações de acesso sem expor senhas.']
];

const grid = document.querySelector('#channelGrid');
const dialog = document.querySelector('#channelDialog');
const dialogContent = document.querySelector('#dialogContent');

grid.innerHTML = channels.map(channel => `
  <article class="channel-card" tabindex="0" role="button" aria-label="Abrir ${channel.name}" style="--accent:${channel.accent};--accent-soft:${channel.soft}" data-channel="${channel.id}">
    <div class="card-top"><span class="channel-icon">${channel.short}</span><span class="arrow">↗</span></div>
    <h3>${channel.name}</h3><p>${channel.description}</p>
    <div class="card-meta"><span>Metas</span><span>Campanhas</span><span>Documentos</span></div>
  </article>`).join('');

function openChannel(id) {
  const channel = channels.find(item => item.id === id);
  dialogContent.innerHTML = `
    <div class="dialog-head" style="--soft:${channel.soft}">
      <span class="channel-icon" style="background:${channel.soft};color:${channel.accent}">${channel.short}</span>
      <h2>${channel.name}</h2><p>${channel.description}</p>
    </div>
    <div class="dialog-body">${sections.map(item => `<section class="info-block"><span>${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p></section>`).join('')}</div>`;
  dialog.showModal();
}

grid.addEventListener('click', event => {
  const card = event.target.closest('[data-channel]');
  if (card) openChannel(card.dataset.channel);
});
grid.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.dataset.channel) openChannel(event.target.dataset.channel);
});
document.querySelector('.close-button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelector('.menu-button').addEventListener('click', event => {
  const header = document.querySelector('.topbar');
  header.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', header.classList.contains('open'));
});
