/**
 * anuncios.js — Lead Nacional
 * Inserta sección de publicidad después de .related
 * Maneja barra de progreso dual: dorada (lectura) → roja (anuncios)
 * Corazón animado al completar la sección de anuncios
 *
 * Uso: <script src="anuncios.js"></script> antes de </body>
 */
(function () {
  'use strict';

  // ── 1. ESTILOS ──────────────────────────────────────────────────────────────
  const css = `
    /* Sección anuncios */
    #lead-anuncios {
      background: #141414;
      padding: 48px 0 56px;
      font-family: 'Montserrat', sans-serif;
    }
    .ads-wrap {
      max-width: 720px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .ads-label-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 28px;
    }
    .ads-label {
      font-family: 'Montserrat', monospace;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #383838;
      flex-shrink: 0;
    }
    .ads-label-line {
      flex: 1;
      height: 1px;
      background: #1e1e1e;
    }
    .ads-label-note {
      font-size: 9px;
      color: #2e2e2e;
      font-family: 'Montserrat', monospace;
      letter-spacing: 1px;
    }

    /* ── AD UNITS ── */
    .ad-unit {
      background: #1a1a1a;
      border: 1px solid #242424;
      border-radius: 10px;
      margin-bottom: 16px;
      overflow: hidden;
      transition: border-color .25s;
    }
    .ad-unit:hover { border-color: #2e2e2e; }
    .ad-sponsored-tag {
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #2e2e2e;
      padding: 8px 16px 0;
      display: block;
    }

    /* Banner simple */
    .ad-banner {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 90px;
      background: #161616;
      border-style: dashed;
      border-color: #202020;
    }
    .ad-banner-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    .ad-banner-dims {
      font-size: 9px;
      color: #2a2a2a;
      letter-spacing: 1.5px;
    }
    .ad-banner-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 3px;
      color: #2e2e2e;
      text-transform: uppercase;
    }

    /* Product card */
    .ad-product-inner {
      display: flex;
      gap: 16px;
      padding: 16px;
      align-items: center;
    }
    .ad-product-img {
      width: 72px;
      height: 72px;
      border-radius: 8px;
      background: #222;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ad-product-img svg { opacity: .2; }
    .ad-product-body { flex: 1; }
    .ad-product-brand {
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #383838;
      margin-bottom: 4px;
    }
    .ad-product-name {
      font-size: 14px;
      font-weight: 600;
      color: #505050;
      margin-bottom: 4px;
      line-height: 1.3;
    }
    .ad-product-desc {
      font-size: 11px;
      color: #363636;
      line-height: 1.5;
      margin-bottom: 10px;
    }
    .ad-product-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .ad-product-price {
      font-size: 13px;
      font-weight: 700;
      color: #484848;
    }
    .ad-product-cta {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #404040;
      background: #232323;
      border: 1px solid #2e2e2e;
      padding: 6px 14px;
      border-radius: 5px;
      cursor: pointer;
      transition: background .2s, color .2s;
      text-decoration: none;
    }
    .ad-product-cta:hover { background: #2a2a2a; color: #505050; }

    /* Native / Editorial */
    .ad-native-inner { padding: 20px 20px 16px; }
    .ad-native-source {
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #2e2e2e;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ad-native-source::before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 1.5px;
      background: #2a2a2a;
    }
    .ad-native-headline {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 16px;
      font-weight: 700;
      color: #484848;
      line-height: 1.35;
      margin-bottom: 8px;
    }
    .ad-native-body {
      font-size: 12px;
      color: #333;
      line-height: 1.65;
      margin-bottom: 12px;
    }
    .ad-native-link {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #3a3a3a;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .ad-native-link:hover { color: #505050; }

    /* Classifieds / Text ads */
    .ad-classifieds-inner { padding: 16px; }
    .ad-classifieds-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .ad-classified {
      padding: 12px;
      background: #161616;
      border-radius: 6px;
      border: 1px solid #1e1e1e;
      cursor: pointer;
      transition: border-color .2s;
    }
    .ad-classified:hover { border-color: #2a2a2a; }
    .ad-classified-cat {
      font-size: 7.5px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #2e2e2e;
      margin-bottom: 5px;
    }
    .ad-classified-title {
      font-size: 12px;
      font-weight: 600;
      color: #424242;
      line-height: 1.35;
      margin-bottom: 4px;
    }
    .ad-classified-url {
      font-size: 9px;
      color: #2e2e2e;
    }

    /* ── BARRA ROJA ── */
    #prog-ads {
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      width: 0;
      background: linear-gradient(90deg, #c0392b, #e74c3c);
      z-index: 201;
      opacity: 0;
      transition: width .2s, opacity .4s;
      pointer-events: none;
    }
    #prog-ads.visible { opacity: 1; }

    /* ── CORAZÓN ── */
    #prog-heart {
      position: fixed;
      top: -4px;
      right: 8px;
      font-size: 14px;
      z-index: 202;
      opacity: 0;
      transform: scale(0.5);
      transition: opacity .4s, transform .4s;
      pointer-events: none;
      user-select: none;
      line-height: 1;
    }
    #prog-heart.visible {
      opacity: 1;
      transform: scale(1);
    }
    #prog-heart.pop {
      animation: heartPop .7s cubic-bezier(.36,.07,.19,.97) forwards;
    }
    @keyframes heartPop {
      0%   { transform: scale(1);    opacity: 1; }
      20%  { transform: scale(2.2);  opacity: 1; }
      40%  { transform: scale(1.6);  opacity: 1; }
      60%  { transform: scale(2);    opacity: 1; }
      80%  { transform: scale(1.8);  opacity: 1; }
      100% { transform: scale(3);    opacity: 0; }
    }

    /* Mini hearts voladores */
    .mini-heart {
      position: fixed;
      font-size: 10px;
      z-index: 202;
      pointer-events: none;
      animation: floatHeart .8s ease-out forwards;
    }
    @keyframes floatHeart {
      0%   { opacity: 1; transform: translate(0, 0)   scale(1); }
      100% { opacity: 0; transform: translate(var(--dx), -52px) scale(.4); }
    }

    @media (max-width: 640px) {
      .ads-wrap { padding: 0 16px; }
      .ad-classifieds-grid { grid-template-columns: 1fr; }
      .ad-product-inner { flex-direction: column; }
      .ad-product-img { width: 100%; height: 120px; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── 2. HTML DE ANUNCIOS ─────────────────────────────────────────────────────
  const adsHTML = `
  <section id="lead-anuncios" aria-label="Publicidad">
    <div class="ads-wrap">

      <div class="ads-label-row">
        <span class="ads-label">Publicidad</span>
        <span class="ads-label-line"></span>
        <span class="ads-label-note">Soporte al periodismo independiente</span>
      </div>

      <!-- Formato 1: Banner placeholder -->
      <div class="ad-unit ad-banner">
        <div class="ad-banner-inner">
          <span class="ad-banner-label">Anuncio</span>
          <span class="ad-banner-dims">728 × 90</span>
        </div>
      </div>

      <!-- Formato 2: Product card -->
      <div class="ad-unit">
        <span class="ad-sponsored-tag">Patrocinado</span>
        <div class="ad-product-inner">
          <div class="ad-product-img">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="8" width="24" height="18" rx="3" stroke="#404040" stroke-width="1.5"/>
              <path d="M4 14h24" stroke="#404040" stroke-width="1" stroke-dasharray="3 2"/>
              <rect x="9" y="18" width="6" height="4" rx="1" fill="#303030"/>
              <rect x="17" y="18" width="10" height="2" rx="1" fill="#282828"/>
              <rect x="17" y="22" width="6" height="2" rx="1" fill="#282828"/>
            </svg>
          </div>
          <div class="ad-product-body">
            <div class="ad-product-brand">Marca / Producto</div>
            <div class="ad-product-name">Nombre del producto o servicio destacado</div>
            <div class="ad-product-desc">Descripción breve del valor diferencial. Máximo dos líneas de texto para no saturar.</div>
            <div class="ad-product-row">
              <span class="ad-product-price">$99.990</span>
              <a class="ad-product-cta" href="#">Ver más →</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Formato 3: Native / Editorial -->
      <div class="ad-unit">
        <div class="ad-native-inner">
          <div class="ad-native-source">Contenido patrocinado por Empresa XYZ</div>
          <div class="ad-native-headline">Titular editorial que conecta con la temática del artículo leído</div>
          <div class="ad-native-body">El contenido patrocinado se integra sin interrumpir el flujo de lectura. El lector reconoce la etiqueta y decide si continúa. Así se construye publicidad honesta.</div>
          <a class="ad-native-link" href="#">
            Leer más en empresa.cl
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      <!-- Formato 4: Clasificados / Text ads -->
      <div class="ad-unit">
        <span class="ad-sponsored-tag">Avisos</span>
        <div class="ad-classifieds-inner">
          <div class="ad-classifieds-grid">
            <div class="ad-classified">
              <div class="ad-classified-cat">Tecnología</div>
              <div class="ad-classified-title">Soluciones digitales para tu empresa</div>
              <div class="ad-classified-url">empresa.cl/digital</div>
            </div>
            <div class="ad-classified">
              <div class="ad-classified-cat">Formación</div>
              <div class="ad-classified-title">Cursos online en economía y datos</div>
              <div class="ad-classified-url">plataforma.cl/cursos</div>
            </div>
            <div class="ad-classified">
              <div class="ad-classified-cat">Servicios</div>
              <div class="ad-classified-title">Asesoría financiera independiente</div>
              <div class="ad-classified-url">asesoria.cl</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
  `;

  // ── 3. INYECCIÓN ────────────────────────────────────────────────────────────
  const anchor = document.querySelector('.related');
  if (!anchor) return;
  anchor.insertAdjacentHTML('afterend', adsHTML);

  // ── 4. BARRA DUAL + CORAZÓN ─────────────────────────────────────────────────
  const mainProg = document.getElementById('prog');
  if (!mainProg) return;

  const redBar = document.createElement('div');
  redBar.id = 'prog-ads';
  document.body.appendChild(redBar);

  const heartEl = document.createElement('div');
  heartEl.id = 'prog-heart';
  heartEl.textContent = '❤';
  document.body.appendChild(heartEl);

  let heartPopped = false;
  let adsVisible = false;

  function updateProgress() {
    const adsSection = document.getElementById('lead-anuncios');
    if (!adsSection) return;

    const scrollY    = window.scrollY;
    const winH       = window.innerHeight;
    const docH       = document.documentElement.scrollHeight;
    const adsTop     = adsSection.offsetTop;
    const adsH       = adsSection.offsetHeight;

    // Zona de lectura: desde top hasta donde empieza la sección de anuncios
    const readMax    = Math.max(1, adsTop - winH);
    const readPct    = Math.min(100, (scrollY / readMax) * 100);
    mainProg.style.width = readPct + '%';

    // Zona de anuncios: desde adsTop hasta adsTop + adsH
    const adsScrollStart = adsTop - winH;
    const adsScrollEnd   = adsTop + adsH - winH;
    const adsRange       = Math.max(1, adsScrollEnd - adsScrollStart);
    const adsPct         = Math.min(100, Math.max(0, ((scrollY - adsScrollStart) / adsRange) * 100));

    if (scrollY >= adsScrollStart) {
      // Mostrar barra roja y corazón
      if (!adsVisible) {
        adsVisible = true;
        redBar.classList.add('visible');
        setTimeout(() => heartEl.classList.add('visible'), 200);
      }
      redBar.style.width = adsPct + '%';

      // Posicionar corazón en el extremo de la barra roja
      const barRightPx = (adsPct / 100) * window.innerWidth;
      heartEl.style.right = 'auto';
      heartEl.style.left  = Math.max(0, barRightPx - 8) + 'px';

      // Heart pop al completar
      if (adsPct >= 100 && !heartPopped) {
        heartPopped = true;
        heartEl.classList.add('pop');
        spawnMiniHearts(barRightPx);
      }
    } else {
      adsVisible = false;
      redBar.classList.remove('visible');
      heartEl.classList.remove('visible');
    }
  }

  // ── 5. MINI HEARTS ──────────────────────────────────────────────────────────
  function spawnMiniHearts(xPx) {
    const count = 6;
    const offsets = [-40, -24, -8, 8, 24, 40];
    offsets.forEach((dx, i) => {
      const el = document.createElement('span');
      el.className = 'mini-heart';
      el.textContent = '❤';
      el.style.left   = (xPx + dx) + 'px';
      el.style.top    = '2px';
      el.style.setProperty('--dx', dx + 'px');
      el.style.animationDelay = (i * 60) + 'ms';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1000);
    });
  }

  // ── 6. OVERRIDE SCROLL ──────────────────────────────────────────────────────
  // Usar requestAnimationFrame para correr DESPUÉS del listener original
  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateProgress);
  }, { passive: true });

  // Correr una vez al cargar por si ya está scrolleado
  updateProgress();

})();
