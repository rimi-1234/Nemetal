/**
 * EASYCON BD - Wishlist Management
 * =================================
 * Handles user wishlist with localStorage persistence.
 * Ready for API integration.
 */

class WishlistManager {
  constructor() {
    this.storageKey = 'ec_wishlist';
    this.wishlist = this._load();
    this.updateUI();
  }

  _load() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch { return []; }
  }

  _save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.wishlist));
    window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { wishlist: this.wishlist } }));
  }

  toggle(product) {
    const idx = this.wishlist.findIndex(i => i.id === product.id);
    if (idx >= 0) {
      this.wishlist.splice(idx, 1);
      this._save();
      this.updateUI();
      window.showToast && window.showToast('Removed from wishlist', 'info');
      return false;
    } else {
      this.wishlist.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0] || null,
        slug: product.slug,
        addedAt: new Date().toISOString(),
      });
      this._save();
      this.updateUI();
      window.showToast && window.showToast('Added to wishlist! ❤️', 'success');
      return true;
    }
  }

  has(id) {
    return this.wishlist.some(i => i.id === id);
  }

  remove(id) {
    this.wishlist = this.wishlist.filter(i => i.id !== id);
    this._save();
    this.updateUI();
  }

  clear() {
    this.wishlist = [];
    this._save();
    this.updateUI();
  }

  updateUI() {
    // Update wishlist count
    document.querySelectorAll('[data-wishlist-count]').forEach(el => {
      el.textContent = this.wishlist.length;
      el.classList.toggle('d-none', this.wishlist.length === 0);
    });

    // Update heart buttons
    document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
      const id = parseInt(btn.dataset.wishlistBtn);
      const isWishlisted = this.has(id);
      btn.classList.toggle('active', isWishlisted);
      btn.title = isWishlisted ? 'Remove from wishlist' : 'Add to wishlist';
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isWishlisted ? 'bi bi-heart-fill' : 'bi bi-heart';
      }
    });

    // Render wishlist page if on it
    this._renderWishlistPage();
  }

  _renderWishlistPage() {
    const container = document.getElementById('wishlist-container');
    if (!container) return;

    if (this.wishlist.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">💔</div>
          <h4>Your wishlist is empty</h4>
          <p>Save items you love to your wishlist and buy them later.</p>
          <a href="categories.html" class="btn-primary-custom mt-2">
            <i class="bi bi-grid me-2"></i>Browse Products
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="products-grid">
        ${this.wishlist.map(item => this._renderWishlistCard(item)).join('')}
      </div>
    `;
  }

  _renderWishlistCard(item) {
    const discount = item.originalPrice && item.originalPrice > item.price
      ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
      : 0;

    return `
      <div class="product-card product-card-shine" data-id="${item.id}">
        <div class="product-badges">
          ${discount > 0 ? `<span class="badge-pill badge-sale">-${discount}%</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="action-btn active" data-wishlist-btn="${item.id}"
            onclick="wishlistManager.remove(${item.id}); this.closest('.product-card').remove();" title="Remove">
            <i class="bi bi-heart-fill"></i>
          </button>
          <button class="action-btn" onclick="cartManager.addItem(${JSON.stringify(item).replace(/"/g, '&quot;')}, 1)" title="Add to Cart">
            <i class="bi bi-cart-plus"></i>
          </button>
        </div>
        <a href="product-detail.html?id=${item.id}">
          <div class="product-image-wrap zoom-on-hover">
            <img src="${item.image
              ? (item.image.startsWith('http') || item.image.startsWith('data:') || item.image.startsWith('assets/') ? item.image : 'assets/images/' + item.image)
              : this._placeholder()}" alt="${item.name}" loading="lazy">
          </div>
        </a>
        <div class="product-info">
          <div class="product-brand">${item.brand}</div>
          <a href="product-detail.html?id=${item.id}" class="text-decoration-none">
            <div class="product-name">${item.name}</div>
          </a>
          <div class="product-price-group">
            <span class="price-current">৳${item.price.toLocaleString()}</span>
            ${item.originalPrice > item.price ? `<span class="price-original">৳${item.originalPrice.toLocaleString()}</span>` : ''}
            ${discount > 0 ? `<span class="price-discount">${discount}% OFF</span>` : ''}
          </div>
          <button class="btn-add-cart btn-press" onclick="cartManager.addItem({id:${item.id},name:'${item.name.replace(/'/g, "\\'")}',price:${item.price},originalPrice:${item.originalPrice || item.price},brand:'${item.brand}',images:[null],slug:'${item.slug || ''}'},1)">
            <i class="bi bi-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
  }

  _placeholder() {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' fill='%23f3f4f6'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E`;
  }
}

const wishlistManager = new WishlistManager();
window.wishlistManager = wishlistManager;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const id = parseInt(this.dataset.wishlistBtn);
      const productData = {
        id,
        name: this.dataset.name || '',
        brand: this.dataset.brand || '',
        price: parseFloat(this.dataset.price || 0),
        originalPrice: parseFloat(this.dataset.originalPrice || this.dataset.price || 0),
        images: [this.dataset.image || null],
        slug: this.dataset.slug || '',
      };

      const added = wishlistManager.toggle(productData);
      this.classList.toggle('active', added);
      const icon = this.querySelector('i');
      if (icon) {
        icon.className = added ? 'bi bi-heart-fill' : 'bi bi-heart';
        this.classList.add('heart-pop');
        setTimeout(() => this.classList.remove('heart-pop'), 500);
      }
    });
  });
});
