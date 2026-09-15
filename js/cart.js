/**
 * EASYCON BD - Cart Management
 * ============================
 * Handles shopping cart state, persistence, and UI updates.
 * API-ready: swap localStorage methods with API calls when ready.
 */

class CartManager {
  constructor() {
    this.storageKey = 'ec_cart';
    this.cart = this._loadCart();
    this._bindEvents();
    this.updateUI();
  }

  // ============================================================
  // STORAGE
  // ============================================================
  _loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Cart load error:', e);
      return [];
    }
  }

  _saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
      this._dispatch('cartUpdated', { cart: this.cart, totals: this.getTotals() });
    } catch (e) {
      console.warn('Cart save error:', e);
    }
  }

  // ============================================================
  // CART OPERATIONS
  // ============================================================
  
  /**
   * Add product to cart
   * @param {Object} product - Product object
   * @param {number} quantity - Quantity to add
   * @param {Object} variant - Selected variant (optional)
   */
  addItem(product, quantity = 1, variant = null) {
    const existingIndex = this.cart.findIndex(item => 
      item.id === product.id && JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (existingIndex >= 0) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0] || null,
        slug: product.slug,
        variant,
        quantity,
        addedAt: new Date().toISOString(),
      });
    }

    this._saveCart();
    this.updateUI();
    this._showAddedFeedback(product.name);
    
    return this.cart;
  }

  /**
   * Remove item from cart
   * @param {number} id - Product ID
   * @param {Object} variant - Variant (optional)
   */
  removeItem(id, variant = null) {
    const before = this.cart.length;
    this.cart = this.cart.filter(item => 
      !(item.id === id && JSON.stringify(item.variant) === JSON.stringify(variant))
    );

    if (this.cart.length < before) {
      this._saveCart();
      this.updateUI();
      window.showToast && window.showToast('Item removed from cart', 'info');
    }

    return this.cart;
  }

  /**
   * Update item quantity
   * @param {number} id - Product ID
   * @param {number} quantity - New quantity
   * @param {Object} variant - Variant (optional)
   */
  updateQuantity(id, quantity, variant = null) {
    const index = this.cart.findIndex(item =>
      item.id === id && JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (index >= 0) {
      if (quantity <= 0) {
        this.removeItem(id, variant);
      } else {
        this.cart[index].quantity = Math.max(1, Math.min(quantity, 999));
        this._saveCart();

        // Smooth in-place update for the cart drawer (no layout shift)
        const drawerItemEl = document.querySelector(`[data-drawer-item="${id}"]`);
        if (drawerItemEl) {
          // Only update specific DOM nodes, not full re-render
          this._updateDrawerItemInPlace(id);
        } else {
          this._updateCartDrawer(); // fallback full render (e.g. drawer just opened)
        }

        // Always update count badges and cart-page summary
        const totals = this.getTotals();
        const badges = document.querySelectorAll('.cart-count, [data-cart-count]');
        badges.forEach(badge => {
          badge.textContent = totals.itemCount;
          badge.classList.toggle('d-none', totals.itemCount === 0);
          if (totals.itemCount > 0) {
            badge.classList.add('badge-bump');
            setTimeout(() => badge.classList.remove('badge-bump'), 300);
          }
        });

        // Update cart page if open
        this._updateCartPage();
      }
    }

    return this.cart;
  }

  /**
   * Clear entire cart
   */
  clearCart() {
    this.cart = [];
    this._saveCart();
    this.updateUI();
    window.showToast && window.showToast('Cart cleared', 'info');
  }

  /**
   * Check if product is in cart
   * @param {number} id - Product ID
   */
  hasItem(id) {
    return this.cart.some(item => item.id === id);
  }

  /**
   * Get item quantity in cart
   * @param {number} id - Product ID
   */
  getItemQuantity(id) {
    const item = this.cart.find(i => i.id === id);
    return item ? item.quantity : 0;
  }

  // ============================================================
  // CALCULATIONS
  // ============================================================
  getTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const savings = this.cart.reduce((sum, item) => {
      const orig = item.originalPrice || item.price;
      return sum + ((orig - item.price) * item.quantity);
    }, 0);
    
    const shippingThreshold = 5000;
    const shippingRate = 100;
    const shipping = subtotal >= shippingThreshold ? 0 : shippingRate;
    
    const total = subtotal + shipping;

    return {
      subtotal,
      savings,
      shipping,
      total,
      itemCount: this.cart.reduce((sum, item) => sum + item.quantity, 0),
      productCount: this.cart.length,
      freeShippingRemaining: Math.max(0, shippingThreshold - subtotal),
    };
  }

  // ============================================================
  // UI UPDATES
  // ============================================================
  updateUI() {
    const totals = this.getTotals();
    
    // Update cart count badges
    const badges = document.querySelectorAll('.cart-count, [data-cart-count]');
    badges.forEach(badge => {
      badge.textContent = totals.itemCount;
      if (totals.itemCount > 0) {
        badge.classList.remove('d-none');
        badge.classList.add('badge-bump');
        setTimeout(() => badge.classList.remove('badge-bump'), 300);
      } else {
        badge.classList.add('d-none');
      }
    });

    // Update cart total displays
    const totalDisplays = document.querySelectorAll('[data-cart-total]');
    totalDisplays.forEach(el => {
      el.textContent = this._formatPrice(totals.total);
    });

    // Update cart page if we're on it
    this._updateCartPage();
    this._updateCartDrawer();
  }

  _updateCartPage() {
    const cartBody = document.getElementById('cart-items-body');
    if (!cartBody) return;

    if (this.cart.length === 0) {
      const emptyEl = document.getElementById('cart-empty');
      const cartContent = document.getElementById('cart-content');
      if (emptyEl) emptyEl.classList.remove('d-none');
      if (cartContent) cartContent.classList.add('d-none');
      return;
    }

    const emptyEl = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');
    if (emptyEl) emptyEl.classList.add('d-none');
    if (cartContent) cartContent.classList.remove('d-none');

    const totals = this.getTotals();

    cartBody.innerHTML = this.cart.map(item => `
      <tr data-cart-item="${item.id}">
        <td>
          <div class="cart-product">
            <div class="cart-product-img">
              <img src="${this._getProductImage(item.image)}" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-product-info">
              <h6><a href="product-detail.html?id=${item.id}" class="text-dark">${item.name}</a></h6>
              <span class="text-muted">${item.brand}</span>
              ${item.variant ? `<br><span class="badge bg-secondary mt-1">${Object.values(item.variant).join(', ')}</span>` : ''}
            </div>
          </div>
        </td>
        <td class="fw-700 text-primary">${this._formatPrice(item.price)}</td>
        <td>
          <div class="quantity-selector">
            <button class="qty-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
            <input type="number" class="qty-input" value="${item.quantity}" min="1" max="999"
              onchange="cartManager.updateQuantity(${item.id}, parseInt(this.value))">
            <button class="qty-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
        </td>
        <td class="fw-800 text-primary">${this._formatPrice(item.price * item.quantity)}</td>
        <td>
          <button class="cart-remove-btn" onclick="cartManager.removeItem(${item.id})" title="Remove">
            <i class="bi bi-trash3"></i>
          </button>
        </td>
      </tr>
    `).join('');

    // Update summary
    this._updateSummaryUI(totals);
  }

  // Render the full drawer (called on open, or when item count changes)
  _updateCartDrawer() {
    const drawerBody = document.getElementById('cart-drawer-body');
    if (!drawerBody) return;

    if (this.cart.length === 0) {
      document.getElementById('cart-drawer-footer')?.setAttribute('style','display:none');
      drawerBody.innerHTML = `
        <div class="empty-state py-5">
          <div class="empty-state-icon">🛒</div>
          <h4>Your cart is empty</h4>
          <p>Add items to get started</p>
          <a href="categories.html" class="btn-primary-custom mt-2">Browse Products</a>
        </div>
      `;
      return;
    }

    document.getElementById('cart-drawer-footer')?.removeAttribute('style');
    drawerBody.innerHTML = this.cart.map(item => this._renderDrawerItem(item)).join('');
    this._updateDrawerFooter();
  }

  // Render a single drawer item HTML
  _renderDrawerItem(item) {
    const subtotal = this._formatPrice(item.price * item.quantity);
    return `
      <div class="cart-drawer-item" data-drawer-item="${item.id}"
           style="display:flex;gap:12px;padding:14px 20px;border-bottom:1px solid var(--gray-100);align-items:flex-start;min-height:0;">
        <div style="width:64px;height:64px;border-radius:10px;overflow:hidden;flex-shrink:0;background:var(--gray-50);border:1px solid var(--gray-100);">
          <img src="${this._getProductImage(item.image)}" alt="${item.name}" style="width:100%;height:100%;object-fit:contain;" loading="lazy">
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:12.5px;font-weight:600;color:var(--gray-800);margin-bottom:4px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${item.name}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;gap:8px;">
            <!-- Qty controls - fixed width to prevent layout shift -->
            <div class="cart-qty-controls" style="flex-shrink:0;">
              <button class="cart-qty-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})" aria-label="Decrease">−</button>
              <span class="cart-qty-num" data-qty="${item.id}">${item.quantity}</span>
              <button class="cart-qty-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})" aria-label="Increase">+</button>
            </div>
            <!-- Price - fixed width -->
            <span class="cart-item-price" data-item-total="${item.id}" style="font-size:13px;font-weight:800;color:var(--primary);white-space:nowrap;">${subtotal}</span>
          </div>
        </div>
        <!-- Remove button -->
        <button onclick="cartManager.removeItem(${item.id})"
                style="background:none;border:none;cursor:pointer;color:var(--gray-300);font-size:15px;padding:2px;flex-shrink:0;line-height:1;transition:color 0.2s;margin-top:2px;"
                onmouseover="this.style.color='var(--danger)'" onmouseout="this.style.color='var(--gray-300)'"
                aria-label="Remove item">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    `;
  }

  // Update ONLY qty + price of a single item in the drawer (no layout shift)
  _updateDrawerItemInPlace(id) {
    const item = this.cart.find(i => i.id === id);
    if (!item) return;

    const qtyEl = document.querySelector(`[data-qty="${id}"]`);
    const priceEl = document.querySelector(`[data-item-total="${id}"]`);

    if (qtyEl) {
      qtyEl.textContent = item.quantity;
      // Brief flash animation
      qtyEl.style.transition = 'transform 0.15s, color 0.15s';
      qtyEl.style.transform = 'scale(1.3)';
      qtyEl.style.color = 'var(--primary)';
      setTimeout(() => {
        qtyEl.style.transform = 'scale(1)';
        qtyEl.style.color = '';
      }, 150);
    }

    if (priceEl) {
      priceEl.classList.add('price-update');
      priceEl.textContent = this._formatPrice(item.price * item.quantity);
      setTimeout(() => priceEl.classList.remove('price-update'), 350);
    }

    this._updateDrawerFooter();
  }

  // Update only the footer totals (no re-render)
  _updateDrawerFooter() {
    const totals = this.getTotals();

    const drawerTotal = document.getElementById('cart-drawer-total');
    if (drawerTotal) drawerTotal.textContent = this._formatPrice(totals.total);

    const drawerCount = document.getElementById('cart-drawer-count');
    if (drawerCount) drawerCount.textContent = `${totals.itemCount} item${totals.itemCount !== 1 ? 's' : ''}`;

    const savings = document.getElementById('drawer-savings');
    if (savings && totals.savings > 0) {
      savings.textContent = `You save ${this._formatPrice(totals.savings)}`;
      savings.style.display = '';
    } else if (savings) {
      savings.style.display = 'none';
    }

    // Shipping progress
    const progress = document.getElementById('drawer-ship-progress');
    const msg = document.getElementById('drawer-ship-msg');
    if (progress) {
      const pct = Math.min(100, ((5000 - totals.freeShippingRemaining) / 5000) * 100);
      progress.style.width = `${pct}%`;
    }
    if (msg) {
      msg.textContent = totals.freeShippingRemaining > 0
        ? `Add ${this._formatPrice(totals.freeShippingRemaining)} more for FREE shipping!`
        : '🎉 You have FREE shipping!';
    }

    // Show/hide footer
    const footer = document.getElementById('cart-drawer-footer');
    if (footer) footer.style.display = this.cart.length ? '' : 'none';
  }

  _updateSummaryUI(totals) {
    const fields = {
      'summary-subtotal': this._formatPrice(totals.subtotal),
      'summary-shipping': totals.shipping === 0 ? 'FREE' : this._formatPrice(totals.shipping),
      'summary-savings': this._formatPrice(totals.savings),
      'summary-total': this._formatPrice(totals.total),
    };

    Object.entries(fields).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    });

    // Free shipping progress
    const progressEl = document.getElementById('shipping-progress');
    if (progressEl && totals.freeShippingRemaining > 0) {
      const pct = ((5000 - totals.freeShippingRemaining) / 5000) * 100;
      progressEl.style.width = `${pct}%`;
      const msgEl = document.getElementById('shipping-msg');
      if (msgEl) msgEl.textContent = `Add ${this._formatPrice(totals.freeShippingRemaining)} more for FREE shipping`;
    }
  }

  // ============================================================
  // HELPERS
  // ============================================================
  _formatPrice(amount) {
    return `৳${amount.toLocaleString('en-BD')}`;
  }

  _getProductImage(image) {
    if (!image) return this._getPlaceholderImage();
    // If it's already a full URL or local assets path, use as-is
    if (image.startsWith('http') || image.startsWith('data:') || image.startsWith('//') || image.startsWith('assets/')) return image;
    return `assets/images/${image}`;
  }

  _getPlaceholderImage() {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' fill='%23f3f4f6'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E`;
  }

  _showAddedFeedback(productName) {
    window.showToast && window.showToast(
      `Added to cart!`,
      'success',
      productName.length > 40 ? productName.substring(0, 40) + '...' : productName
    );
  }

  _dispatch(event, detail = {}) {
    window.dispatchEvent(new CustomEvent(`cart:${event}`, { detail }));
  }

  _bindEvents() {
    // Listen for cart update events from other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === this.storageKey) {
        this.cart = this._loadCart();
        this.updateUI();
      }
    });
  }

  // ============================================================
  // CHECKOUT HELPERS
  // ============================================================
  getCheckoutData() {
    const totals = this.getTotals();
    return {
      items: this.cart.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        variant: item.variant,
      })),
      totals,
    };
  }

  // Apply coupon (placeholder)
  async applyCoupon(code) {
    // When API is ready, replace with: return api.request('/coupons/apply', { method: 'POST', body: JSON.stringify({ code, subtotal: this.getTotals().subtotal }) })
    await new Promise(r => setTimeout(r, 500));
    const validCoupons = {
      'SAVE10': { discount: 10, type: 'percent', label: '10% off' },
      'SAVE500': { discount: 500, type: 'fixed', label: '৳500 off' },
      'FREESHIP': { discount: 0, type: 'shipping', label: 'Free shipping' },
    };

    const coupon = validCoupons[code.toUpperCase()];
    if (coupon) {
      return { success: true, coupon, message: `Coupon applied: ${coupon.label}` };
    }
    throw new Error('Invalid coupon code');
  }
}

// ============================================================
// CART DRAWER
// ============================================================
function initCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  const openBtns = document.querySelectorAll('[data-open-cart]');
  const closeBtn = document.getElementById('close-cart-drawer');

  if (!drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    cartManager._updateCartDrawer();
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });
}

// ============================================================
// INITIALIZE
// ============================================================
const cartManager = new CartManager();
window.cartManager = cartManager;

document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
  
  // Initialize add-to-cart buttons on the page
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', function () {
      const productData = {
        id: parseInt(this.dataset.id),
        name: this.dataset.name,
        price: parseFloat(this.dataset.price),
        originalPrice: parseFloat(this.dataset.originalPrice || this.dataset.price),
        brand: this.dataset.brand || '',
        images: [this.dataset.image || null],
        slug: this.dataset.slug || '',
      };

      cartManager.addItem(productData, 1);
      this.classList.add('cart-add-anim');
      setTimeout(() => this.classList.remove('cart-add-anim'), 400);
    });
  });
});
