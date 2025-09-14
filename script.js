// Mobilni meni (toggle + zatvaranja)
const toggle = document.querySelector('.nav-toggle');
const menu   = document.getElementById('nav-menu');

if (toggle && menu) {
  const openMenu  = () => { menu.classList.add('open');  toggle.setAttribute('aria-expanded','true');  document.body.classList.add('no-scroll'); };
  const closeMenu = () => { menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); document.body.classList.remove('no-scroll'); };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Zatvori nakon klika na link unutar menija
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Zatvori klikom izvan menija
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  // ESC zatvara
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Na resize prema desktopu – očisti stanje
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

// Kontakt forma – slanje na FormSubmit (tvoj email)
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

if (form && statusEl) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Šaljem…';

    const data = new FormData(form);
    data.append('_subject', 'Upit s weba — MM Electric');
    data.append('_template', 'table');
    data.append('_captcha', 'false');

    try {
      const res = await fetch('https://formsubmit.co/ajax/mmelectric0101@gmail.com', {
        method: 'POST',
        body: data
      });
      if (!res.ok) throw new Error('Neuspjelo slanje');
      statusEl.textContent = 'Hvala! Vaš upit je uspješno poslan. 📬';
      statusEl.className = 'ok';
      form.reset();
    } catch (err) {
      statusEl.textContent = 'Došlo je do greške pri slanju. Pokušajte kasnije ili pošaljite email.';
      statusEl.className = 'err';
    }
  });
}

// Kopiraj email u footeru
const copyEmail = document.getElementById('copy-email');
if (copyEmail) {
  copyEmail.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'mmelectric0101@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const old = copyEmail.textContent;
      copyEmail.textContent = 'Email kopiran ✅';
      setTimeout(() => copyEmail.textContent = old, 1800);
    });
  });
}

(() => {
  const $  = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  const slides  = $$('.proj-slide');
  const thumbs  = $$('.proj-thumbs li');
  const prevBtn = $('.proj-nav.prev');
  const nextBtn = $('.proj-nav.next');
  const capBox  = $('.proj-caption');
  const capTitle= $('.proj-title');
  const capDesc = $('.proj-desc');

  if (!slides.length || !capBox || !capTitle || !capDesc) return;

  let i = slides.findIndex(s => s.classList.contains('is-active'));
  if (i < 0) i = 0;

  function render(idx){
    // Deaktiviraj stare
    slides.forEach(s => s.classList.remove('is-active'));
    thumbs.forEach(t => t.classList.remove('is-active'));

    // Aktiviraj nove
    slides[idx].classList.add('is-active');
    if (thumbs[idx]) thumbs[idx].classList.add('is-active');

    // Caption – prvo sakrij, pa prikaži s delayem
    capBox.classList.remove('show');
    const s = slides[idx];
    capTitle.textContent = s.dataset.title || '';
    capDesc.textContent  = s.dataset.desc  || '';
    setTimeout(() => capBox.classList.add('show'), 200);
  }

  function goTo(n){ i = (n + slides.length) % slides.length; render(i); }

  prevBtn?.addEventListener('click', () => goTo(i - 1));
  nextBtn?.addEventListener('click', () => goTo(i + 1));
  thumbs.forEach((t, n) => t.addEventListener('click', () => goTo(n)));

  // inicijalni prikaz
  render(i);
})();
