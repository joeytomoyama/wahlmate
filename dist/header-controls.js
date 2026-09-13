// Keep header controls accessible across the quiz's render cycles.
const icons = {
  moon: '<path d="M20.2 14.2A8.4 8.4 0 0 1 9.8 3.8 8.4 8.4 0 1 0 20.2 14.2Z"/>',
  sun: '<circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/>'
};
function enhanceHeader() {
  const toggle = document.querySelector('#theme-toggle');
  const icon = document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon';
  if (toggle && (toggle.dataset.icon !== icon || !toggle.querySelector('svg'))) {
    toggle.dataset.icon = icon;
    toggle.innerHTML = '<svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + icons[icon] + '</svg>';
  }
  const button = document.querySelector('#edition-select');
  const menu = document.querySelector('#edition-menu');
  if (!button || !menu || button.dataset.enhanced) return;
  button.dataset.enhanced = 'true';
  button.setAttribute('aria-controls', 'edition-menu');
  button.setAttribute('aria-label', (document.documentElement.lang === 'de' ? 'Wahl auswählen: ' : 'Choose election: ') + button.textContent.replace('⌄', '').trim());
  const options = [...menu.querySelectorAll('[data-edition]')];
  const close = (focus = false) => { menu.hidden = true; button.setAttribute('aria-expanded', 'false'); if (focus) button.focus(); };
  button.addEventListener('keydown', e => {
    if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
    e.preventDefault(); menu.hidden = false; button.setAttribute('aria-expanded', 'true');
    options[e.key === 'ArrowUp' ? options.length - 1 : 0].focus();
  });
  menu.addEventListener('keydown', e => {
    let i = options.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') i = (i + 1) % options.length;
    else if (e.key === 'ArrowUp') i = (i - 1 + options.length) % options.length;
    else if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = options.length - 1;
    else return;
    e.preventDefault(); options[i].focus();
  });
  button.closest('.edition-picker').addEventListener('focusout', e => {
    if (!button.closest('.edition-picker').contains(e.relatedTarget)) close();
  });
}
document.addEventListener('pointerdown', e => {
  if (e.target.closest('.edition-picker')) return;
  const menu = document.querySelector('#edition-menu');
  if (menu) menu.hidden = true;
  document.querySelector('#edition-select')?.setAttribute('aria-expanded', 'false');
});
document.addEventListener('keydown', e => {
  const menu = document.querySelector('#edition-menu');
  if (e.key === 'Escape' && menu && !menu.hidden) {
    menu.hidden = true;
    const button = document.querySelector('#edition-select');
    button.setAttribute('aria-expanded', 'false'); button.focus();
  }
});
new MutationObserver(enhanceHeader).observe(document.querySelector('#app'), {childList:true, subtree:true});
new MutationObserver(enhanceHeader).observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});
enhanceHeader();
