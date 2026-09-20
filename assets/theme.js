/**
 * THE MEN'S AURA — MIDNIGHT DRIVE
 * Shopify Theme JavaScript
 * Handles: particles, cursor, mobile menu, cart drawer, FAQs, actives tabs, sticky CTA
 */

(function() {
  'use strict';

  /* ======================================================
     1. AMBIENT GOLD PARTICLES
  ====================================================== */
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles = [];
    let animFrame;

    const colors = [
      'rgba(245, 223, 168, ',
      'rgba(197, 160, 89, ',
      'rgba(212, 175, 55, ',
      'rgba(255, 240, 200, '
    ];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      const count = Math.floor(Math.min(window.innerWidth / 25, 45));
      particles = [];
      for (let i = 0; i < count; i++) {
        const baseOpacity = Math.random() * 0.4 + 0.1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8 + 0.5,
          speedY: -(Math.random() * 0.25 + 0.08),
          speedX: (Math.random() - 0.5) * 0.2,
          opacity: baseOpacity,
          baseOpacity: baseOpacity,
          fadeSpeed: Math.random() * 0.008 + 0.002,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(function(p) {
        p.y += p.speedY;
        p.x += p.speedX;

        p.opacity += p.fadeSpeed;
        if (p.opacity > p.baseOpacity * 1.5 || p.opacity < p.baseOpacity * 0.4) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.max(0, p.opacity) + ')';
        ctx.shadowBlur = p.size > 1.2 ? 6 : 0;
        ctx.shadowColor = 'rgba(197, 160, 89, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animFrame = requestAnimationFrame(render);
    }

    resize();
    init();
    window.addEventListener('resize', function() {
      resize();
      init();
    });
    render();
  }

  /* ======================================================
     2. LUXURY CURSOR GLOW (Desktop)
  ====================================================== */
  function initCursor() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;
    document.addEventListener('mousemove', function(e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ======================================================
     3. MOBILE MENU TOGGLE
  ====================================================== */
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const hamIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (hamIcon) hamIcon.style.display = isOpen ? 'none' : 'block';
      if (closeIcon) closeIcon.style.display = isOpen ? 'block' : 'none';
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        if (hamIcon) hamIcon.style.display = 'block';
        if (closeIcon) closeIcon.style.display = 'none';
      });
    });
  }

  /* ======================================================
     4. CART DRAWER
  ====================================================== */
  function initCartDrawer() {
    const overlay = document.getElementById('cart-overlay');
    const drawer = document.getElementById('cart-drawer');
    const closeBtn = document.getElementById('cart-close');
    const cartTriggers = document.querySelectorAll('#cart-trigger');
    const cartCountEl = document.getElementById('cart-count');

    if (!drawer) return;

    function openCart() {
      overlay && overlay.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      overlay && (overlay.setAttribute('aria-hidden', 'false'));
      fetchCart();
    }

    function closeCart() {
      overlay && overlay.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      overlay && (overlay.setAttribute('aria-hidden', 'true'));
    }

    cartTriggers.forEach(function(t) { t.addEventListener('click', openCart); });
    closeBtn && closeBtn.addEventListener('click', closeCart);
    overlay && overlay.addEventListener('click', closeCart);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeCart();
    });

    // Fetch cart from Shopify AJAX API
    function fetchCart() {
      fetch('/cart.js')
        .then(function(r) { return r.json(); })
        .then(function(cart) {
          updateCartUI(cart);
          updateCartCount(cart.item_count);
        })
        .catch(function() {});
    }

    function updateCartCount(count) {
      if (!cartCountEl) return;
      if (count > 0) {
        cartCountEl.textContent = count;
        cartCountEl.style.display = 'inline-block';
      } else {
        cartCountEl.style.display = 'none';
      }
    }

    function updateCartUI(cart) {
      const emptyMsg = document.getElementById('cart-empty-msg');
      const itemsContainer = document.getElementById('cart-items-container');
      const footer = document.getElementById('cart-drawer-footer');
      const totalPrice = document.getElementById('cart-total-price');

      if (!itemsContainer) return;

      if (cart.item_count === 0) {
        emptyMsg && (emptyMsg.style.display = 'block');
        itemsContainer.innerHTML = '';
        footer && (footer.style.display = 'none');
        return;
      }

      emptyMsg && (emptyMsg.style.display = 'none');
      footer && (footer.style.display = 'block');

      if (totalPrice) {
        totalPrice.textContent = 'PKR ' + formatMoney(cart.total_price);
      }

      itemsContainer.innerHTML = cart.items.map(function(item) {
        return '<div class="cart-item">' +
          (item.image ? '<img class="cart-item__img" src="' + item.image + '" alt="' + escapeHtml(item.title) + '" loading="lazy">' : '') +
          '<div class="cart-item__info">' +
          '<p class="cart-item__name">' + escapeHtml(item.product_title) + '</p>' +
          '<p class="cart-item__price">PKR ' + formatMoney(item.final_price) + '</p>' +
          '<div class="cart-item__qty">' +
          '<button class="qty-btn" data-action="decrease" data-key="' + item.key + '" data-qty="' + item.quantity + '" aria-label="Decrease quantity">−</button>' +
          '<span class="qty-value">' + item.quantity + '</span>' +
          '<button class="qty-btn" data-action="increase" data-key="' + item.key + '" data-qty="' + item.quantity + '" aria-label="Increase quantity">+</button>' +
          '</div>' +
          '</div>' +
          '</div>';
      }).join('');

      // Qty buttons
      itemsContainer.querySelectorAll('.qty-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          const key = this.getAttribute('data-key');
          const currentQty = parseInt(this.getAttribute('data-qty'));
          const action = this.getAttribute('data-action');
          const newQty = action === 'increase' ? currentQty + 1 : Math.max(0, currentQty - 1);
          updateCartItem(key, newQty);
        });
      });
    }

    function updateCartItem(key, qty) {
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: qty })
      })
        .then(function(r) { return r.json(); })
        .then(function(cart) {
          updateCartUI(cart);
          updateCartCount(cart.item_count);
        })
        .catch(function() {});
    }

    function formatMoney(cents) {
      return (cents / 100).toLocaleString('en-PK');
    }

    function escapeHtml(str) {
      return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    // Intercept Add to Cart forms
    document.addEventListener('submit', function(e) {
      const form = e.target;
      if (!form.id || form.id !== 'product-form') return;
      e.preventDefault();
      const formData = new FormData(form);
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
        .then(function(r) { return r.json(); })
        .then(function() {
          fetchCart();
          openCart();
        })
        .catch(function() {});
    });

    // Initial count load
    fetchCart();
  }

  /* ======================================================
     5. FAQ ACCORDION
  ====================================================== */
  function initFAQ() {
    const faqList = document.getElementById('faq-list');
    if (!faqList) return;

    faqList.addEventListener('click', function(e) {
      const btn = e.target.closest('.faq-question');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');

      // Close all
      faqList.querySelectorAll('.faq-item.open').forEach(function(openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (toggle)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  /* ======================================================
     6. INGREDIENTS / ACTIVES TABS
  ====================================================== */
  function initActivesTabs() {
    const tabBtns = document.querySelectorAll('.active-tab-btn');
    const panels = document.querySelectorAll('.active-panel');
    if (!tabBtns.length) return;

    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const idx = this.getAttribute('data-tab');

        tabBtns.forEach(function(b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        panels.forEach(function(p) { p.classList.remove('is-active'); });

        this.classList.add('is-active');
        this.setAttribute('aria-selected', 'true');

        const target = document.getElementById('active-panel-' + idx);
        if (target) target.classList.add('is-active');
      });
    });
  }

  /* ======================================================
     7. STICKY MOBILE CTA
  ====================================================== */
  function initStickyCTA() {
    const cta = document.getElementById('sticky-mobile-cta');
    if (!cta) return;

    let lastScroll = 0;
    let ticking = false;

    function checkScroll() {
      const scrollY = window.scrollY;
      if (scrollY > 300) {
        cta.classList.add('visible');
      } else {
        cta.classList.remove('visible');
      }
      lastScroll = scrollY;
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(checkScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ======================================================
     8. SMOOTH SCROLL for anchor links
  ====================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ======================================================
     INIT ALL
  ====================================================== */
  function init() {
    initParticles();
    initCursor();
    initMobileMenu();
    initCartDrawer();
    initFAQ();
    initActivesTabs();
    initStickyCTA();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
