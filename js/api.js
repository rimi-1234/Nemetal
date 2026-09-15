/**
 * EASYCON BD - API Configuration & Data Layer
 * ============================================
 * This file handles all API calls and data management.
 * Currently uses dummy/mock data.
 * Ready for real API integration - just update the BASE_URL and endpoints.
 */

// ============================================================
// API CONFIGURATION
// ============================================================
const API_CONFIG = {
  BASE_URL: 'https://api.easyconbd.com/v1', // Change this when API is ready
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  VERSION: 'v1',
};

// ============================================================
// DUMMY DATA — Loaded from data/products.json (real Easycon.com.bd data)
// ============================================================

/**
 * DUMMY_DATA is populated at runtime by ApiService.init().
 * It fetches data/products.json (extracted from easycon.com.bd)
 * and merges it with the static user/orders data below.
 * ─────────────────────────────────────────────────────────────
 * WHEN REAL API IS READY:
 *   1. Set ApiService.useMockData = false
 *   2. Update API_CONFIG.BASE_URL
 *   All product fields in products.json match the expected
 *   API response shape — zero refactoring required.
 */
let DUMMY_DATA = {
  categories: [],
  brands:     [],
  products:   [],
  heroSlides: [],
  promoBanners: [],
  flashSaleProductIds: [],
  featuredProductIds:  [],

  // ---- ORDERS (static, user-specific) ----
  orders: [
    { id: 'NMT-2024-001', date: '2024-12-10', status: 'delivered',  total: 15850, items: 3, paymentMethod: 'bKash',           tracking: 'TRK123456789' },
    { id: 'NMT-2024-002', date: '2024-12-15', status: 'shipped',    total: 8200,  items: 1, paymentMethod: 'Card',             tracking: 'TRK987654321' },
    { id: 'NMT-2024-003', date: '2024-12-18', status: 'processing', total: 32000, items: 5, paymentMethod: 'Cash on Delivery', tracking: null },
    { id: 'NMT-2024-004', date: '2024-12-20', status: 'pending',    total: 4600,  items: 2, paymentMethod: 'bKash',           tracking: null },
  ],

  // ---- USER (static) ----
  user: {
    id: 1, name: 'Md. Suhel', email: 'suhel@example.com',
    phone: '01700000000', joinDate: '2024-01-15',
    avatar: null, totalOrders: 12, totalSpent: 145600,
    loyaltyPoints: 2890,
    addresses: [
      { id: 1, label: 'Home', name: 'Md. Suhel', address: 'House 45, Road 12, Block B', area: 'Mirpur DOHS', city: 'Dhaka', postcode: '1216', phone: '01700000000', default: true },
    ],
  },
};

/** Resolves when products.json has been loaded into DUMMY_DATA */
let _dataReady = null;

// ============================================================
// API SERVICE CLASS
// ============================================================
class ApiService {
  constructor(config = API_CONFIG) {
    this.config = config;
    this.useMockData = true; // Set to false when real API is ready
    this._initData();
  }

  /**
   * Loads product data from window.PRODUCT_DATA (set by data/products.js).
   * data/products.js is loaded via <script src="data/products.js"> in every HTML page.
   * This works with file://, http:// and https:// equally — no fetch needed.
   */
  _initData() {
    const src = window.PRODUCT_DATA;
    if (!src) {
      console.warn('[Nematel] window.PRODUCT_DATA not found. Ensure <script src="data/products.js"> is loaded before api.js.');
      return;
    }

    DUMMY_DATA.categories        = src.categories        || [];
    DUMMY_DATA.brands            = src.brands            || [];
    DUMMY_DATA.heroSlides        = src.heroSlides        || [];
    DUMMY_DATA.promoBanners      = src.promoBanners      || [];
    DUMMY_DATA.flashSaleProductIds = src.flashSaleProductIds || [];
    DUMMY_DATA.featuredProductIds  = src.featuredProductIds  || [];

    // Normalise products: compute discount% & add a flat `specs` alias
    DUMMY_DATA.products = (src.products || []).map(p => {
      const disc = p.originalPrice && p.originalPrice > p.price
        ? Math.round((1 - p.price / p.originalPrice) * 100)
        : 0;
      return {
        ...p,
        specs: p.specifications || {},   // alias for legacy code
        discount: disc,
        images: p.images || [],
        categoryId: (DUMMY_DATA.categories.find(c => c.slug === p.category) || {}).id || null,
      };
    });

    console.info(`[Nematel] ✓ Loaded ${DUMMY_DATA.products.length} products, ${DUMMY_DATA.categories.length} categories from data/products.js`);
    _dataReady = Promise.resolve(); // mark as ready
  }

  /** No-op: data is loaded synchronously in constructor */
  async waitForData() {
    /* data/products.js is a synchronous <script>, no waiting needed */
  }

  // ---- Generic Request Handler ----
  async request(endpoint, options = {}) {
    if (this.useMockData) {
      return this._mockRequest(endpoint, options);
    }

    const url = `${this.config.BASE_URL}${endpoint}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.TIMEOUT);

    try {
      const response = await fetch(url, {
        headers: {
          ...this.config.HEADERS,
          ...this._getAuthHeaders(),
          ...(options.headers || {}),
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new ApiError(response.status, error.message || 'Request failed', error);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeout);
      if (error.name === 'AbortError') {
        throw new ApiError(408, 'Request timeout');
      }
      throw error;
    }
  }

  // ---- Mock Request Handler ----
  async _mockRequest(endpoint, options = {}) {
    // Ensure product data is loaded before responding
    await this.waitForData();
    // Simulate network delay
    await this._delay(150 + Math.random() * 200);

    const method = (options.method || 'GET').toUpperCase();
    const body = options.body ? JSON.parse(options.body) : null;

    // Helper: get featured/flash products from ID lists (JSON-driven)
    const featuredProducts = () => {
      if (DUMMY_DATA.featuredProductIds && DUMMY_DATA.featuredProductIds.length) {
        return DUMMY_DATA.products.filter(p => DUMMY_DATA.featuredProductIds.includes(p.id));
      }
      return DUMMY_DATA.products.filter(p => p.featured);
    };
    const flashProducts = () => {
      if (DUMMY_DATA.flashSaleProductIds && DUMMY_DATA.flashSaleProductIds.length) {
        return DUMMY_DATA.products.filter(p => DUMMY_DATA.flashSaleProductIds.includes(p.id));
      }
      return DUMMY_DATA.products.filter(p => p.flashSale);
    };

    // Route mock requests
    const routes = {
      'GET /products':           () => ({ data: DUMMY_DATA.products, total: DUMMY_DATA.products.length }),
      'GET /products/featured':  () => ({ data: featuredProducts() }),
      'GET /products/flash-sale':() => ({ data: flashProducts() }),
      'GET /categories':         () => ({ data: DUMMY_DATA.categories }),
      'GET /brands':             () => ({ data: DUMMY_DATA.brands }),
      'GET /brands/featured':    () => ({ data: DUMMY_DATA.brands.filter(b => b.featured) }),
      'GET /hero-slides':        () => ({ data: DUMMY_DATA.heroSlides }),
      'GET /promo-banners':      () => ({ data: DUMMY_DATA.promoBanners }),
      'GET /user/orders':        () => ({ data: DUMMY_DATA.orders }),
      'GET /user/profile':       () => ({ data: DUMMY_DATA.user }),
      'POST /auth/login':        () => ({ token: 'mock-jwt-token-123', user: DUMMY_DATA.user }),
      'POST /auth/register':     () => ({ message: 'Registration successful', user: { ...body, id: Date.now() } }),
      'POST /orders':            () => ({ order: { id: `NMT-${Date.now()}`, status: 'pending', ...body } }),
      'POST /newsletter/subscribe': () => ({ message: 'Subscribed successfully' }),
    };

    const key = `${method} ${endpoint.split('?')[0]}`;
    const handler = routes[key];
    if (handler) return handler();

    // Handle dynamic routes (e.g., /products/:id or /products/:slug)
    const productMatch = endpoint.match(/^\/products\/([^?]+)$/);
    if (productMatch && method === 'GET') {
      const idOrSlug = productMatch[1];
      const product = DUMMY_DATA.products.find(
        p => p.id === parseInt(idOrSlug) || p.slug === idOrSlug
      );
      if (product) return { data: product };
      throw new ApiError(404, 'Product not found');
    }

    // Filter by category, brand, or search query
    if (method === 'GET' && endpoint.startsWith('/products?')) {
      const params = new URLSearchParams(endpoint.split('?')[1]);
      let results = [...DUMMY_DATA.products];

      if (params.get('category')) {
        results = results.filter(p => p.category === params.get('category'));
      }
      if (params.get('brand')) {
        const b = params.get('brand').toLowerCase();
        results = results.filter(p => p.brand && p.brand.toLowerCase().includes(b));
      }
      if (params.get('q')) {
        const q = params.get('q').toLowerCase();
        results = results.filter(p =>
          p.name.toLowerCase().includes(q) ||
          (p.brand || '').toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q)
        );
      }
      if (params.get('sort')) {
        const sort = params.get('sort');
        if (sort === 'price_asc')  results.sort((a, b) => a.price - b.price);
        if (sort === 'price_desc') results.sort((a, b) => b.price - a.price);
        if (sort === 'rating')     results.sort((a, b) => b.rating - a.rating);
        if (sort === 'newest')     results.sort((a, b) => b.id - a.id);
      }
      const page  = parseInt(params.get('page')  || 1);
      const limit = parseInt(params.get('limit') || 20);
      const start = (page - 1) * limit;
      return { data: results.slice(start, start + limit), total: results.length, page, limit };
    }

    // Fallback
    console.warn(`[API Mock] No handler for: ${method} ${endpoint}`);
    return { data: null, message: 'Not implemented in mock' };
  }

  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  _getAuthHeaders() {
    const token = localStorage.getItem('ec_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // ============================================================
  // API METHODS
  // ============================================================

  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/products${query ? '?' + query : ''}`);
  }

  async getFeaturedProducts() {
    return this.request('/products/featured');
  }

  async getFlashSaleProducts() {
    return this.request('/products/flash-sale');
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async searchProducts(query, filters = {}) {
    const params = new URLSearchParams({ q: query, ...filters });
    if (this.useMockData) {
      await this.waitForData();
      await this._delay(100);
      const q = query.toLowerCase();
      const results = DUMMY_DATA.products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      );
      return { data: results };
    }
    return this.request(`/products/search?${params}`);
  }

  // Categories
  async getCategories() {
    return this.request('/categories');
  }

  // Brands
  async getBrands(featured = false) {
    return this.request(featured ? '/brands/featured' : '/brands');
  }

  // Auth
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout() {
    localStorage.removeItem('ec_token');
    localStorage.removeItem('ec_user');
    return { success: true };
  }

  // User
  async getUserProfile() {
    return this.request('/user/profile');
  }

  async getUserOrders() {
    return this.request('/user/orders');
  }

  // Orders
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async trackOrder(orderId) {
    if (this.useMockData) {
      await this._delay(200);
      const order = DUMMY_DATA.orders.find(o => o.id === orderId || o.tracking === orderId);
      if (order) {
        return {
          data: {
            ...order,
            timeline: [
              { status: 'Order Placed', time: '2024-12-18 10:30 AM', completed: true },
              { status: 'Payment Confirmed', time: '2024-12-18 10:35 AM', completed: true },
              { status: 'Processing', time: '2024-12-18 11:00 AM', completed: order.status !== 'pending' },
              { status: 'Shipped', time: '2024-12-19 09:00 AM', completed: ['shipped', 'delivered'].includes(order.status) },
              { status: 'Delivered', time: '2024-12-20 02:00 PM', completed: order.status === 'delivered' },
            ],
          },
        };
      }
      throw new ApiError(404, 'Order not found');
    }
    return this.request(`/orders/${orderId}/track`);
  }

  // Newsletter
  async subscribeNewsletter(email) {
    return this.request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }
}

// ============================================================
// API ERROR CLASS
// ============================================================
class ApiError extends Error {
  constructor(status, message, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// ============================================================
// EXPORT SINGLETON
// ============================================================
const api = new ApiService();

// Make it available globally
window.api = api;
window.DUMMY_DATA = DUMMY_DATA;
window.ApiError = ApiError;
