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
