/* ============================================================
   DR. BISHNOI CHILD WELLNESS CENTER — JAVASCRIPT
   ============================================================ */

'use strict';

/* ============================================================
   SPLASH SCREEN ANIMATION
   ============================================================ */
(function initSplash() {

  // Skip animation for returning visitors in the same session
  if (sessionStorage.getItem('bishnoi_v1')) {
    const splash = document.getElementById('splash');
    if (splash) splash.style.display = 'none';
    return;
  }

  const splash    = document.getElementById('splash');
  const lineTop   = document.querySelector('.line-top');
  const lineBot   = document.querySelector('.line-bottom');
  const nameEl    = document.getElementById('splashName');
  const subtitle  = document.getElementById('splashSubtitle');
  const shimmer   = document.getElementById('splashShimmer');
  const tagline   = document.getElementById('splashTagline');
  const rating    = document.getElementById('splashRating');
  const flashEl   = document.getElementById('splashFlash');

  const NAME_TEXT = 'Dr. Bishnoi';

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function runAnimation() {
    // Step 1 — dark screen (0 – 0.5 s)
    await wait(500);

    // Step 2 — horizontal lines draw in (0.5 – 1.5 s)
    lineTop.style.width = '220px';
    lineBot.style.width = '220px';
    await wait(1200);

    // Step 3 — letter-by-letter name reveal (1.5 – 3.5 s)
    nameEl.innerHTML = '';
    NAME_TEXT.split('').forEach(function(ch, i) {
      var span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      nameEl.appendChild(span);
      setTimeout(function() {
        span.style.opacity   = '1';
        span.style.transform = 'translateY(0)';
        span.style.filter    = 'blur(0)';
      }, i * 80);
    });
    await wait(NAME_TEXT.length * 80 + 500);

    // Step 4 — "CHILD WELLNESS CENTER" (3.5 – 4.2 s)
    subtitle.style.opacity = '1';
    await wait(800);

    // Step 5 — shimmer line (4.2 – 5 s)
    shimmer.style.width = '180px';
    await wait(900);

    // Step 6 — tagline (5 – 5.6 s)
    tagline.style.opacity = '1';
    await wait(700);

    // Step 7 — rating badge (5.6 – 7 s)
    rating.style.opacity = '1';
    await wait(1400);

    // Step 8 — white flash, then exit
    flashEl.style.background = 'rgba(255,255,255,0.80)';
    await wait(300);
    flashEl.style.background = 'rgba(255,255,255,0)';
    await wait(200);

    splash.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
    splash.style.opacity    = '0';
    splash.style.transform  = 'translateY(-30px) scale(1.02)';
    await wait(1250);

    splash.style.display = 'none';
    sessionStorage.setItem('bishnoi_v1', '1');
  }

  runAnimation();

}());


/* ============================================================
   CANVAS BACKGROUND ANIMATION
   ============================================================ */
(function initCanvas() {

  var canvas = document.getElementById('bgCanvas');
  var ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ── Bokeh orbs (8 total) ── */
  var orbs = [
    { x: 0.08, y: 0.08, r: 380, col: 'rgba(14,165,233,0.06)',  phase: 0,   spd: 0.003  },
    { x: 0.88, y: 0.05, r: 300, col: 'rgba(6,182,212,0.05)',   phase: 2,   spd: 0.0025 },
    { x: 0.05, y: 0.90, r: 260, col: 'rgba(16,185,129,0.045)', phase: 4,   spd: 0.004  },
    { x: 0.92, y: 0.85, r: 220, col: 'rgba(14,165,233,0.04)',  phase: 1,   spd: 0.0035 },
    { x: 0.50, y: 0.45, r: 400, col: 'rgba(14,165,233,0.025)', phase: 3,   spd: 0.002  },
    { x: 0.25, y: 0.60, r: 200, col: 'rgba(6,182,212,0.035)',  phase: 5,   spd: 0.0045 },
    { x: 0.75, y: 0.30, r: 240, col: 'rgba(16,185,129,0.03)',  phase: 2.5, spd: 0.003  },
    { x: 0.50, y: 0.95, r: 180, col: 'rgba(14,165,233,0.04)',  phase: 1.5, spd: 0.005  }
  ];

  /* ── Rising particles (35 total, 3 colour types) ── */
  var PARTICLE_COLORS = [
    'rgba(14,165,233,',   // blue
    'rgba(6,182,212,',    // cyan
    'rgba(16,185,129,'    // green
  ];

  var particles = Array.from({ length: 35 }, function() {
    return {
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      r:       Math.random() * 2.5 + 1.5,
      vy:      Math.random() * 0.4  + 0.15,
      vx:      (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.12 + 0.04,
      type:    Math.floor(Math.random() * 3),
      glowing: Math.random() > 0.7
    };
  });

  /* ── Floating medical crosses (6 total) ── */
  var crosses = Array.from({ length: 6 }, function() {
    return {
      x:        Math.random() * window.innerWidth,
      y:        window.innerHeight + Math.random() * 400,
      size:     Math.random() * 16 + 8,
      vy:       Math.random() * 0.15 + 0.06,
      vx:       (Math.random() - 0.5) * 0.08,
      opacity:  Math.random() * 0.04 + 0.02,
      rotation: Math.random() * Math.PI * 2,
      rs:       (Math.random() - 0.5) * 0.005
    };
  });

  function draw() {
    var W = canvas.width;
    var H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    /* ── Bokeh orbs ── */
    orbs.forEach(function(o) {
      o.phase += o.spd;
      var pulse = (Math.sin(o.phase) + 1) / 2;
      var r     = o.r * (0.92 + pulse * 0.08);
      var grad  = ctx.createRadialGradient(o.x * W, o.y * H, 0, o.x * W, o.y * H, r);
      grad.addColorStop(0, o.col);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(o.x * W, o.y * H, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    /* ── Rising particles ── */
    particles.forEach(function(p) {
      p.y -= p.vy;
      p.x += p.vx;
      if (p.y < -10)    { p.y = H + 10;  p.x = Math.random() * W; }
      if (p.x < -10)    { p.x = W + 10; }
      if (p.x > W + 10) { p.x = -10; }

      var col = PARTICLE_COLORS[p.type];

      if (p.glowing && p.type === 0) {
        ctx.save();
        ctx.shadowBlur  = 6;
        ctx.shadowColor = 'rgba(14,165,233,0.5)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = col + p.opacity + ')';
        ctx.fill();
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = col + p.opacity + ')';
        ctx.fill();
      }
    });

    /* ── Medical crosses ── */
    crosses.forEach(function(c) {
      c.y        -= c.vy;
      c.x        += c.vx;
      c.rotation += c.rs;
      if (c.y < -30) { c.y = H + 20; c.x = Math.random() * W; }

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rotation);
      ctx.strokeStyle = 'rgba(14,165,233,' + c.opacity + ')';
      ctx.lineWidth   = 1.5;
      ctx.lineCap     = 'round';

      // vertical bar
      ctx.beginPath();
      ctx.moveTo(0, -c.size / 2);
      ctx.lineTo(0,  c.size / 2);
      ctx.stroke();

      // horizontal bar
      ctx.beginPath();
      ctx.moveTo(-c.size / 2, 0);
      ctx.lineTo( c.size / 2, 0);
      ctx.stroke();

      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  draw();

}());


/* ============================================================
   NAVBAR — scroll class + active link highlight
   ============================================================ */
(function initNavbar() {

  var nav      = document.getElementById('navbar');
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  var linkObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(l) { l.classList.remove('active'); });
        var active = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(function(s) { linkObserver.observe(s); });

}());


/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
(function initMobileNav() {

  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');

  if (!toggle || !links) return;

  toggle.addEventListener('click', function() {
    var isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

}());


/* ============================================================
   REVEAL ON SCROLL (Intersection Observer)
   ============================================================ */
(function initReveal() {

  var elements = document.querySelectorAll('.reveal');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = ((i % 4) * 0.08) + 's';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  elements.forEach(function(el) { observer.observe(el); });

}());


/* ============================================================
   BOOKING FORM — WhatsApp redirect
   ============================================================ */
(function initBookingForm() {

  var form = document.getElementById('bookForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var parentName = document.getElementById('parentName').value.trim();
    var phone      = document.getElementById('phone').value.trim();
    var childAge   = document.getElementById('childAge').value.trim();
    var problem    = document.getElementById('problem').value.trim();
    var prefTime   = document.getElementById('prefTime').value.trim();

    // Basic client-side validation
    if (!parentName || !phone || !childAge || !problem) {
      alert('Please fill in all required fields (marked with *).');
      return;
    }

    // Sanitise: strip control characters before encoding
    function sanitise(str) {
      return str.replace(/[\x00-\x1F\x7F]/g, ' ').slice(0, 300);
    }

    var message =
      'Hello Dr. Bishnoi! \uD83D\uDC76 I want to book an appointment.\n\n' +
      '\uD83D\uDC64 Parent Name: '  + sanitise(parentName) + '\n' +
      '\uD83D\uDCDE Phone: '        + sanitise(phone)      + '\n' +
      '\uD83D\uDC76 Child Age: '    + sanitise(childAge)   + '\n' +
      '\uD83C\uDF21\uFE0F Problem: '+ sanitise(problem)    + '\n' +
      (prefTime ? '\uD83D\uDD50 Preferred Time: ' + sanitise(prefTime) + '\n' : '') +
      '\nPlease confirm the appointment. Thank you!';

    var waUrl = 'https://wa.me/918619501881?text=' + encodeURIComponent(message);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });

}());
