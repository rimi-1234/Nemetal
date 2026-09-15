/**
 * EASYCON BD - Main Application JavaScript
 * =========================================
 * Core functionality for the entire website.
 */

'use strict';

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(title, type = 'info', message = '') {
  const icons = {
    success: 'bi-check-circle-fill',
    error: 'bi-x-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    info: 'bi-info-circle-fill',
  };

  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-custom ${type}`;
  toast.innerHTML = `
    <i class="bi ${icons[type] || icons.info} toast-icon"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    <button class="toast-close" onclick="this.closest('.toast-custom').remove()">
      <i class="bi bi-x"></i>
    </button>
  `;

  container.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

window.showToast = showToast;

// ============================================================
// PAGE LOADER
// ============================================================
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  let _loaderHidden = false;

  // Single hide function — safe to call multiple times
  function hideLoader() {
    if (_loaderHidden) return;
    _loaderHidden = true;
    loader.classList.add('hidden');
    setTimeout(() => { try { loader.remove(); } catch(_) {} }, 500);
  }

  // Expose globally so loadProductsToGrid / other callers can trigger it
  window.hidePageLoader = hideLoader;

  // Strategy 1: hide as soon as window.load fires (images & all)
  // Strategy 2: hard cap — never show loader more than 4 seconds
  const hardCap = setTimeout(hideLoader, 4000);

  if (document.readyState === 'complete') {
    // Page already fully loaded (e.g. cached) — hide quickly
    clearTimeout(hardCap);
    setTimeout(hideLoader, 150);
  } else {
    window.addEventListener('load', () => {
      clearTimeout(hardCap);
      setTimeout(hideLoader, 200);
    }, { once: true });
  }
}

// ============================================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(el => {
    observer.observe(el);
  });
}

// ============================================================
// HERO SLIDER
// ============================================================
function initHeroSlider() {
  const wrapper = document.querySelector('.hero-slider');
  if (!wrapper) return;

  const slides = wrapper.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  let current = 0;
  let timer = null;
  let isTransitioning = false;

  function goTo(index) {
    if (isTransitioning || index === current) return;
    isTransitioning = true;

    slides[current].style.opacity = '0';
    slides[current].style.transform = 'scale(1.02)';
    dots[current]?.classList.remove('active');

    setTimeout(() => {
      slides[current].style.display = 'none';
      current = (index + slides.length) % slides.length;
      slides[current].style.display = 'flex';
      slides[current].style.opacity = '0';
      slides[current].style.transform = 'scale(0.98)';
      
      requestAnimationFrame(() => {
        slides[current].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        slides[current].style.opacity = '1';
        slides[current].style.transform = 'scale(1)';
        dots[current]?.classList.add('active');
        
        setTimeout(() => {
          slides[current].style.transition = '';
          isTransitioning = false;
        }, 600);
      });
    }, 300);
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startTimer() {
    stopTimer();
    timer = setInterval(next, 5000);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  // Initialize
  slides.forEach((slide, i) => {
    slide.style.display = i === 0 ? 'flex' : 'none';
    slide.style.transition = '';
    if (i === 0) slide.style.opacity = '1';
  });

  // Dot controls
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  // Arrow controls
  document.querySelector('.slider-arrow.next')?.addEventListener('click', () => { next(); startTimer(); });
  document.querySelector('.slider-arrow.prev')?.addEventListener('click', () => { prev(); startTimer(); });

  // Pause on hover
  wrapper.closest('.hero-slider-wrapper')?.addEventListener('mouseenter', stopTimer);
  wrapper.closest('.hero-slider-wrapper')?.addEventListener('mouseleave', startTimer);

  // Touch support
  let touchStartX = 0;
  wrapper.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  wrapper.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      startTimer();
    }
  });

  startTimer();
}

// ============================================================
// FLASH SALE COUNTDOWN
// ============================================================
function initFlashSaleCountdown() {
  const countdowns = document.querySelectorAll('[data-countdown]');
  
  countdowns.forEach(el => {
    // Set end time - 4 hours from page load (or get from data attribute)
    const endTimeAttr = el.dataset.countdown;
    let endTime;
    
    if (endTimeAttr && endTimeAttr !== 'auto') {
      endTime = new Date(endTimeAttr).getTime();
    } else {
      // Auto: end of current day
      endTime = new Date();
      endTime.setHours(23, 59, 59, 0);
      endTime = endTime.getTime();
    }

    const hours = el.querySelector('[data-hours]');
    const mins = el.querySelector('[data-mins]');
    const secs = el.querySelector('[data-secs]');

    function update() {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        if (hours) hours.textContent = '00';
        if (mins) mins.textContent = '00';
        if (secs) secs.textContent = '00';
        return;
      }

      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      const pad = n => n.toString().padStart(2, '0');

      function animateChange(el, newVal) {
        if (el && el.textContent !== pad(newVal)) {
          el.classList.add('countdown-flip');
          setTimeout(() => el.classList.remove('countdown-flip'), 300);
          el.textContent = pad(newVal);
        }
      }

      animateChange(hours, h);
      animateChange(mins, m);
      animateChange(secs, s);
    }

    update();
    setInterval(update, 1000);
  });
}

// ============================================================
// CATEGORIES MEGA MENU
// (Handled by components.js — this is a no-op stub for index.html)
// ============================================================
function initMegaMenu() {
  // Mega menu is initialized by components.js (initComponentsMegaMenu)
  // OR directly in index.html inline script.
  // This stub prevents errors if called from DOMContentLoaded.
}

// ============================================================
// MOBILE MENU
// ============================================================
function initMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-mobile-menu');

  if (!menu) return;

  function openMenu() {
    menu.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
}

// ============================================================
// SEARCH FUNCTIONALITY
// ============================================================
function initSearch() {
  const searchInput = document.getElementById('main-search');
  const searchDropdown = document.getElementById('search-dropdown');
  const searchForm = document.getElementById('search-form');
  
  if (!searchInput) return;

  let debounceTimer = null;

  async function performSearch(query) {
    if (!query || query.length < 2) {
      searchDropdown?.classList.remove('show');
      return;
    }

    try {
      const result = await api.searchProducts(query);
      const products = result.data || [];
      renderSearchResults(products, query);
    } catch (e) {
      console.error('Search error:', e);
    }
  }

  function renderSearchResults(products, query) {
    if (!searchDropdown) return;

    if (products.length === 0) {
      searchDropdown.innerHTML = `
        <div class="p-4 text-center text-muted" style="font-size:14px;">
          <i class="bi bi-search me-2"></i>No results for "<strong>${query}</strong>"
        </div>
      `;
    } else {
      searchDropdown.innerHTML = `
        ${products.slice(0, 6).map(p => `
          <a href="product-detail.html?id=${p.id}" class="search-result-item text-decoration-none">
            <img src="${p.images?.[0] || ''}" alt="${p.name}"
              style="background:#f3f4f6;"
              onerror="this.removeAttribute('src');this.style.background='#f3f4f6';">
            <div class="result-info">
              <h6>${highlightMatch(p.name, query)}</h6>
              <span>৳${p.price.toLocaleString()}</span>
            </div>
          </a>
        `).join('')}
        ${products.length > 6 ? `
          <a href="product-listing.html?search=${encodeURIComponent(query)}" class="d-block text-center p-3 text-primary fw-600" style="border-top:1px solid var(--gray-200);font-size:13px;text-decoration:none;">
            See all ${products.length} results <i class="bi bi-arrow-right"></i>
          </a>
        ` : ''}
      `;
    }

    searchDropdown.classList.add('show');
  }

  function highlightMatch(text, query) {
    const re = new RegExp(`(${query})`, 'gi');
    return text.replace(re, '<mark style="background:rgba(232,70,16,0.15);border-radius:2px;padding:0 2px;">$1</mark>');
  }

  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();
    if (!query) {
      searchDropdown?.classList.remove('show');
      return;
    }
    debounceTimer = setTimeout(() => performSearch(query), 300);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length >= 2) {
      searchDropdown?.classList.add('show');
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchDropdown?.contains(e.target)) {
      searchDropdown?.classList.remove('show');
    }
  });

  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `product-listing.html?search=${encodeURIComponent(query)}`;
    }
  });

  // Mobile search toggle
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  const mobileSearchBar = document.getElementById('mobile-search-bar');
  
  mobileSearchBtn?.addEventListener('click', () => {
    mobileSearchBar?.classList.toggle('d-none');
    mobileSearchBar?.querySelector('input')?.focus();
  });
}

// ============================================================
// STICKY HEADER
// ============================================================
function initStickyHeader() {
  // Sticky collapse handled by initStickyHeaderScroll() in components.js and index.html inline.
  // This adds a subtle scrolled class for shadow.
  const header = document.querySelector('.main-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ============================================================
// BACK TO TOP
// ============================================================
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// COUNTER ANIMATION
// ============================================================
function animateCounter(el, target, duration = 1500, prefix = '', suffix = '') {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.floor(eased * target);
    
    el.textContent = prefix + value.toLocaleString() + suffix;

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = prefix + target.toLocaleString() + suffix;
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = parseInt(entry.target.dataset.target || '0');
        const prefix = entry.target.dataset.prefix || '';
        const suffix = entry.target.dataset.suffix || '';
        animateCounter(entry.target, target, 1500, prefix, suffix);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => observer.observe(el));
}

// ============================================================
// RIPPLE EFFECT
// ============================================================
function initRippleEffect() {
  document.querySelectorAll('.ripple-container').forEach(el => {
    el.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
      `;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ============================================================
// BRAND CAROUSEL (SCROLL)
// ============================================================
function initBrandCarousel() {
  const carousels = document.querySelectorAll('.brands-carousel');
  
  carousels.forEach(carousel => {
    const prevBtn = carousel.parentElement?.querySelector('.brand-prev');
    const nextBtn = carousel.parentElement?.querySelector('.brand-next');
    const scrollAmount = 200;

    prevBtn?.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn?.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Auto scroll
    let autoScroll = setInterval(() => {
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);

    carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
    carousel.addEventListener('mouseleave', () => {
      autoScroll = setInterval(() => {
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 3000);
    });
  });
}

// ============================================================
// NEWSLETTER
// ============================================================
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    const btn = form.querySelector('button[type="submit"]');
    
    if (!email) return;

    btn.innerHTML = '<span class="spinner-custom spinner-sm"></span>';
    btn.disabled = true;

    try {
      await api.subscribeNewsletter(email);
      showToast('Subscribed! 🎉', 'success', 'You\'ll receive exclusive offers and updates.');
      form.reset();
    } catch (e) {
      showToast('Subscription failed', 'error', 'Please try again.');
    } finally {
      btn.innerHTML = 'Subscribe';
      btn.disabled = false;
    }
  });
}

// ============================================================
// PRODUCT CARD RENDER HELPER
// ============================================================
// ────────────────────────────────────────────────
// Category-specific placeholder config
// ────────────────────────────────────────────────
const CAT_PLACEHOLDER = {
  'construction-chemical': { bg:'#fff4f1', accent:'#e84610', icon:'🧪' },
  'cement-aggregate':      { bg:'#f0fdf4', accent:'#059669', icon:'🏗️' },
  'tmt-steel-bar':         { bg:'#f0f9ff', accent:'#0369a1', icon:'🔩' },
  'bricks-blocks':         { bg:'#fef9c3', accent:'#b45309', icon:'🧱' },
  'doors':                 { bg:'#faf5ff', accent:'#7c3aed', icon:'🚪' },
  'door-fittings':         { bg:'#fff7ed', accent:'#c2410c', icon:'🔑' },
  'electric-materials':    { bg:'#fefce8', accent:'#ca8a04', icon:'⚡' },
  'pipe-fitting':          { bg:'#f0fdfa', accent:'#0d9488', icon:'🔧' },
  'sanitary-ware':         { bg:'#eff6ff', accent:'#1d4ed8', icon:'🚿' },
  'paint-coating':         { bg:'#fdf4ff', accent:'#a21caf', icon:'🎨' },
  'tiles-flooring':        { bg:'#f0fdf4', accent:'#15803d', icon:'🔲' },
  'safety-equipment':      { bg:'#fff1f2', accent:'#be123c', icon:'⛑️' },
};

window.CAT_PLACEHOLDER = CAT_PLACEHOLDER; // expose globally

function getProductPlaceholder(product) {
  const cfg = CAT_PLACEHOLDER[product.category] || { bg:'#f8f9fa', accent:'#6c757d', icon:'📦' };
  const brandShort = (product.brand || 'Product').substring(0, 12);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="220">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${cfg.bg}"/>
        <stop offset="100%" stop-color="${cfg.bg}dd"/>
      </linearGradient>
    </defs>
    <rect width="300" height="220" fill="url(#g)" rx="0"/>
    <circle cx="150" cy="100" r="58" fill="${cfg.accent}18"/>
    <text x="150" y="110" text-anchor="middle" dominant-baseline="middle" font-size="60">${cfg.icon}</text>
    <text x="150" y="178" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" fill="${cfg.accent}" font-weight="700" opacity="0.85">${brandShort}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function renderProductCard(product) {
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(product.rating);
    const half   = !filled && i < product.rating;
    return `<i class="bi bi-star${filled ? '-fill' : half ? '-half' : ''}"></i>`;
  }).join('');

  const placeholder = getProductPlaceholder(product);

  const badgeMap = {
    sale:     '<span class="badge-pill badge-sale">SALE</span>',
    new:      '<span class="badge-pill badge-new">NEW</span>',
    hot:      '<span class="badge-pill badge-hot">🔥 HOT</span>',
    featured: '<span class="badge-pill badge-featured">★ TOP</span>',
  };

  const safeAddToCart = `cartManager.addItem({id:${product.id},name:'${product.name.replace(/'/g,"\\'").replace(/"/g,'\\"')}',price:${product.price},originalPrice:${product.originalPrice||product.price},brand:'${(product.brand||'').replace(/'/g,"\\'")  }',images:[${product.images?.[0]?`'${product.images[0]}'`:'null'}],slug:'${product.slug||''}'},1)`;

  return `
    <div class="product-card reveal" data-id="${product.id}">

      <!-- Badges -->
      <div class="product-badges">
        ${product.badge ? (badgeMap[product.badge] || '') : ''}
        ${discount > 0 ? `<span class="badge-pill badge-sale">-${discount}%</span>` : ''}
      </div>

      <!-- Floating action buttons (slide in on hover) -->
      <div class="product-actions">
        <button class="action-btn"
          data-wishlist-btn="${product.id}"
          data-name="${product.name}"
          data-brand="${product.brand}"
          data-price="${product.price}"
          data-original-price="${product.originalPrice}"
          data-slug="${product.slug||''}"
          title="Add to Wishlist">
          <i class="bi bi-heart"></i>
        </button>
        <a href="product-detail.html?id=${product.id}" class="action-btn" title="View Details">
          <i class="bi bi-eye"></i>
        </a>
        <button class="action-btn" title="Compare"
          onclick="window.addToCompare && addToCompare(${product.id});event.preventDefault()">
          <i class="bi bi-arrow-left-right"></i>
        </button>
      </div>

      <!-- Image (link wrapper) -->
      <a href="product-detail.html?id=${product.id}" style="display:block;text-decoration:none;">
        <div class="product-image-wrap">
          <img
            src="${product.images?.[0] || placeholder}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.src='${placeholder}';this.style.objectFit='contain';">
        </div>
      </a>

      <!-- Info -->
      <div class="product-info">
        <div class="product-brand">${product.brand||''}</div>

        <a href="product-detail.html?id=${product.id}" class="text-decoration-none">
          <div class="product-name">${product.name}</div>
        </a>

        <div class="product-rating">
          <div class="rating-stars">${stars}</div>
          <span class="rating-count">(${product.reviewCount||0})</span>
        </div>

        <div class="product-price-group">
          <span class="price-current">৳${product.price.toLocaleString()}</span>
          ${product.originalPrice > product.price
            ? `<span class="price-original">৳${product.originalPrice.toLocaleString()}</span>
               <span class="price-discount">${discount}% off</span>`
            : ''}
        </div>

        <button class="btn-add-cart"
          onclick="${safeAddToCart}"
          ${product.stock === 0 ? 'disabled' : ''}>
          <i class="bi bi-cart-plus"></i>
          ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  `;
}

window.renderProductCard = renderProductCard;

// ============================================================
// LOAD PRODUCTS TO GRID
// ============================================================
async function loadProductsToGrid(containerId, filter = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Show skeleton loaders matching new card design
  container.innerHTML = Array.from({ length: 5 }, () => `
    <div class="product-card" style="border:1.5px solid var(--gray-100);">
      <div class="product-image-wrap skeleton" style="padding-top:70%;border-radius:14px 14px 0 0;"></div>
      <div class="product-info" style="gap:7px;">
        <div class="skeleton" style="height:10px;width:45%;border-radius:4px;"></div>
        <div class="skeleton" style="height:13px;width:92%;border-radius:4px;"></div>
        <div class="skeleton" style="height:13px;width:70%;border-radius:4px;"></div>
        <div class="skeleton" style="height:11px;width:55%;border-radius:4px;"></div>
        <div class="skeleton" style="height:18px;width:50%;border-radius:4px;margin-top:4px;"></div>
        <div class="skeleton" style="height:34px;width:100%;border-radius:10px;margin-top:4px;"></div>
      </div>
    </div>
  `).join('');

  try {
    let products;
    if (filter.flashSale) {
      products = (await api.getFlashSaleProducts()).data;
    } else if (filter.featured) {
      products = (await api.getFeaturedProducts()).data;
    } else {
      products = (await api.getProducts(filter)).data;
    }

    if (!products || products.length === 0) {
      container.innerHTML = `
        <div class="empty-state col-span-full" style="grid-column:1/-1;">
          <div class="empty-state-icon">📦</div>
          <h4>No products found</h4>
          <p>Try adjusting your filters</p>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(p => renderProductCard(p)).join('');

    // Products rendered — page has enough content, hide loader now
    window.hidePageLoader && window.hidePageLoader();

    // Re-init wishlist buttons
    container.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
      const id = parseInt(btn.dataset.wishlistBtn);
      if (wishlistManager.has(id)) {
        btn.classList.add('active');
        btn.querySelector('i').className = 'bi bi-heart-fill';
      }

      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const productData = {
          id,
          name: btn.dataset.name || '',
          brand: btn.dataset.brand || '',
          price: parseFloat(btn.dataset.price || 0),
          originalPrice: parseFloat(btn.dataset.originalPrice || btn.dataset.price || 0),
          images: [btn.dataset.image || null],
          slug: btn.dataset.slug || '',
        };
        const added = wishlistManager.toggle(productData);
        btn.classList.toggle('active', added);
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = added ? 'bi bi-heart-fill' : 'bi bi-heart';
          btn.classList.add('heart-pop');
          setTimeout(() => btn.classList.remove('heart-pop'), 500);
        }
      });
    });

    // Re-init scroll animations
    initScrollAnimations();
    initRippleEffect();

  } catch (err) {
    console.error('Failed to load products:', err);
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <div class="empty-state-icon">⚠️</div>
        <h4>Failed to load products</h4>
        <p>Please try refreshing the page</p>
      </div>
    `;
    // Always hide loader even on error
    window.hidePageLoader && window.hidePageLoader();
  }
}

window.loadProductsToGrid = loadProductsToGrid;

// ============================================================
// ACTIVE NAV LINK
// ============================================================
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-links a, .dashboard-nav a, .mobile-menu-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ============================================================
// AUTH STATE
// ============================================================
function checkAuthState() {
  const user = JSON.parse(localStorage.getItem('ec_user') || 'null');
  const token = localStorage.getItem('ec_token');
  
  const guestEls = document.querySelectorAll('[data-auth="guest"]');
  const userEls = document.querySelectorAll('[data-auth="user"]');
  const userNameEls = document.querySelectorAll('[data-user-name]');

  if (user && token) {
    guestEls.forEach(el => el.classList.add('d-none'));
    userEls.forEach(el => el.classList.remove('d-none'));
    userNameEls.forEach(el => { el.textContent = user.name || 'Account'; });
  } else {
    guestEls.forEach(el => el.classList.remove('d-none'));
    userEls.forEach(el => el.classList.add('d-none'));
  }
}

// Mock login for demo
window.mockLogin = function() {
  const mockUser = DUMMY_DATA.user;
  localStorage.setItem('ec_token', 'mock-token-123');
  localStorage.setItem('ec_user', JSON.stringify(mockUser));
  checkAuthState();
  showToast('Logged in successfully!', 'success', `Welcome back, ${mockUser.name}!`);
};

window.mockLogout = function() {
  localStorage.removeItem('ec_token');
  localStorage.removeItem('ec_user');
  checkAuthState();
  showToast('Logged out', 'info');
};

// ============================================================
// LAZY LOADING IMAGES
// ============================================================
function initLazyImages() {
  const images = document.querySelectorAll('img.lazy');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => observer.observe(img));
}

// ============================================================
// FILTER PRICE RANGE
// ============================================================
function initPriceRange() {
  const minInput = document.getElementById('price-min');
  const maxInput = document.getElementById('price-max');
  const minDisplay = document.getElementById('price-min-display');
  const maxDisplay = document.getElementById('price-max-display');

  if (!minInput || !maxInput) return;

  function update() {
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    
    if (minDisplay) minDisplay.textContent = `৳${min.toLocaleString()}`;
    if (maxDisplay) maxDisplay.textContent = `৳${max.toLocaleString()}`;
  }

  minInput.addEventListener('input', update);
  maxInput.addEventListener('input', update);
  update();
}

// ============================================================
// INITIALIZE ALL
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initScrollAnimations();
  initHeroSlider();
  initFlashSaleCountdown();
  initMegaMenu();
  initMobileMenu();
  initSearch();
  initStickyHeader();
  initBackToTop();
  initCounters();
  initRippleEffect();
  initBrandCarousel();
  initNewsletter();
  initLazyImages();
  initPriceRange();
  setActiveNavLink();
  checkAuthState();

  // Add ripple to all primary buttons
  document.querySelectorAll('.btn-primary-custom, .btn-add-cart, .btn-hero').forEach(btn => {
    btn.classList.add('ripple-container', 'btn-press');
  });

  console.log('%c🏗️ Easycon BD - Loaded', 'color: #e84610; font-size: 18px; font-weight: 900;');
});
