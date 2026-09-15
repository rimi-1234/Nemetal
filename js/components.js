/**
 * NEMATEL — New Materials & Technology Ltd.
 * Shared HTML Components
 * ============================
 * Call renderSharedComponents(activePage) in each page.
 */

// ============================================================
// CATEGORY DATA (shared for mega menu)
// ============================================================
const MEGA_CATS = [
  { slug: 'construction-chemical', name: 'Construction Chemical', emoji: '🧪', count: 145,
    subs: ['Waterproofing', 'Bonding Agent', 'Sealant', 'Tile Adhesive', 'Cement Additive'] },
  { slug: 'cement-aggregate', name: 'Cement & Aggregate', emoji: '🏗️', count: 89,
    subs: ['OPC Cement', 'PPC Cement', 'White Cement', 'Sand', 'Gravel'] },
  { slug: 'tmt-steel-bar', name: 'TMT Steel Bar (Rod)', emoji: '🔩', count: 67,
    subs: ['10mm', '12mm', '16mm', '20mm', '25mm', 'GI Sheet', 'MS Flat Bar'] },
  { slug: 'bricks-blocks', name: 'Bricks & Blocks', emoji: '🧱', count: 112,
    subs: ['Ceramic Brick', 'Concrete Block', 'Hollow Block', 'Paving Brick', 'Fire Brick'] },
  { slug: 'doors', name: 'Doors', emoji: '🚪', count: 78,
    subs: ['Teak Wood Door', 'Steel Door', 'Glass Door', 'Flush Door', 'Panel Door'] },
  { slug: 'door-fittings', name: 'Door Fittings', emoji: '🔑', count: 234,
    subs: ['Door Lock', 'Door Hinge', 'Door Handle', 'Door Closer', 'Tower Bolt'] },
  { slug: 'electric-materials', name: 'Electric Materials', emoji: '⚡', count: 389,
    subs: ['PVC Conduit', 'Wire & Cable', 'Switch & Socket', 'LED Light', 'Circuit Breaker'] },
  { slug: 'pipe-fitting', name: 'Pipe & Fitting', emoji: '🔧', count: 156,
    subs: ['PVC Pipe', 'UPVC Pipe', 'GI Pipe', 'Water Tank', 'Pipe Fitting', 'Valve'] },
  { slug: 'sanitary-ware', name: 'Sanitary Ware', emoji: '🚿', count: 203,
    subs: ['Commode', 'Wash Basin', 'Shower Head', 'Bathtub', 'Faucet', 'Tap'] },
  { slug: 'paint-coating', name: 'Paint & Coating', emoji: '🎨', count: 167,
    subs: ['Exterior Paint', 'Interior Paint', 'Enamel Paint', 'Primer', 'Wood Polish'] },
  { slug: 'tiles-flooring', name: 'Tiles & Flooring', emoji: '🔲', count: 298,
    subs: ['Floor Tile', 'Wall Tile', 'Parking Tile', 'Mosaic', 'Granite', 'Marble'] },
  { slug: 'safety-equipment', name: 'Safety Equipment', emoji: '⛑️', count: 94,
    subs: ['Helmet', 'Safety Gloves', 'Safety Boot', 'Safety Vest', 'Fall Protection'] },
];

// ============================================================
// HEADER HTML
// ============================================================
function getHeaderHTML(activePage = '') {
  const nav = (page, label, icon = '') => {
    const cls = activePage === page ? 'active' : '';
    return `<li><a href="${page === 'home' ? 'index.html' : page + '.html'}" class="${cls}">${icon ? `<i class="${icon}"></i> ` : ''}${label}</a></li>`;
  };

  return `
    <!-- TOP BAR -->
    <div class="top-bar">
      <div class="container-xl">
        <div class="d-flex align-items-center justify-content-between gap-3">
          <div class="d-flex align-items-center gap-3" style="min-width:0;overflow:hidden;">
            <span class="top-bar-marquee flex-shrink-0"><i class="bi bi-lightning-fill me-1"></i> FLASH SALE</span>
            <div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:0.85;">
              🎉 Free Shipping on orders above ৳5,000 &nbsp;|&nbsp; 📦 Fast Delivery across Bangladesh
            </div>
          </div>
          <div class="d-flex align-items-center gap-2 flex-shrink-0">
            <a href="tel:01955008864" style="color:rgba(255,255,255,0.85);font-size:12px;text-decoration:none;">
              <i class="bi bi-telephone-fill me-1"></i>01955-008864
            </a>
            <div class="divider"></div>
            <a href="become-seller.html" style="color:rgba(255,255,255,0.85);font-size:12px;text-decoration:none;">
              <i class="bi bi-shop me-1"></i>Sell on Nematel
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- STICKY HEADER WRAPPER -->
    <div class="sticky-header-wrapper" id="sticky-wrap">

    <!-- MAIN HEADER -->
    <header class="main-header">
      <div class="container-xl">
        <div class="header-inner">
          <button id="mobile-menu-btn" class="d-lg-none" onclick="openMobileMenu()"
            style="background:none;border:none;padding:6px;cursor:pointer;color:var(--gray-700);flex-shrink:0;">
            <i class="bi bi-list" style="font-size:26px;"></i>
          </button>

          <!-- Nematel Logo -->
          <a href="index.html" class="header-logo text-decoration-none flex-shrink-0">
            <img src="assets/logo.svg" alt="Nematel" style="height:46px;max-width:190px;"
              onerror="this.outerHTML='<div style=\\'display:flex;align-items:center;gap:8px;\\'><div class=\\'logo-icon\\'>N</div><div class=\\'logo-text\\'><span class=\\'brand-name\\'>Nematel</span><span class=\\'brand-tagline\\'>New Materials &amp; Technology</span></div></div>'">
          </a>

          <!-- Centered Search (no category dropdown) -->
          <div class="header-search d-none d-lg-block" style="flex:1;max-width:580px;margin:0 auto;">
            <form id="search-form">
              <div class="search-container" style="position:relative;border-radius:50px;">
                <input type="text" id="main-search" class="search-input" placeholder="Search for building materials, brands, categories..." style="padding-left:20px;">
                <button type="submit" class="search-btn" style="border-radius:0 50px 50px 0;">
                  <i class="bi bi-search"></i>
                </button>
                <div id="search-dropdown" class="search-dropdown"></div>
              </div>
            </form>
          </div>

          <!-- Header Actions -->
          <div class="header-actions" style="flex-shrink:0;gap:4px;">
            <button id="mobile-search-btn" class="header-action-btn d-lg-none" onclick="toggleMobileSearch()" style="min-width:44px;">
              <i class="bi bi-search btn-icon"></i>
            </button>

            <!-- Notification Bell -->
            <div class="header-action-btn notif-pulse" id="notif-btn" onclick="toggleNotifications()" style="cursor:pointer;position:relative;">
              <i class="bi bi-bell btn-icon"></i>
              <span class="btn-label d-none d-sm-block">Alerts</span>
              <span class="badge-count" style="background:var(--danger);">3</span>
            </div>

            <!-- Wishlist -->
            <a href="wishlist.html" class="header-action-btn">
              <i class="bi bi-heart btn-icon"></i>
              <span class="btn-label d-none d-sm-block">Wishlist</span>
              <span class="badge-count d-none" data-wishlist-count>0</span>
            </a>

            <!-- Compare -->
            <a href="compare.html" class="header-action-btn d-none d-md-flex">
              <i class="bi bi-arrow-left-right btn-icon"></i>
              <span class="btn-label d-none d-sm-block">Compare</span>
            </a>

            <!-- Cart -->
            <button class="header-action-btn" onclick="openCartDrawer()">
              <i class="bi bi-cart3 btn-icon"></i>
              <span class="btn-label d-none d-sm-block">Cart</span>
              <span class="badge-count d-none cart-count">0</span>
            </button>

            <!-- Account -->
            <a href="dashboard.html" class="header-action-btn d-none d-md-flex" data-auth="user" style="display:none!important;">
              <i class="bi bi-person-fill btn-icon"></i>
              <span class="btn-label d-none d-sm-block" data-user-name>Account</span>
            </a>
            <a href="auth.html" class="header-action-btn d-none d-md-flex" data-auth="guest">
              <i class="bi bi-person btn-icon"></i>
              <span class="btn-label d-none d-sm-block">Login</span>
            </a>
          </div>
        </div>

        <!-- Mobile Search Bar -->
        <div id="mobile-search-bar" style="display:none;padding-bottom:10px;">
          <form onsubmit="event.preventDefault();window.location.href='product-listing.html?search='+encodeURIComponent(this.querySelector('input').value)">
            <div class="search-container" style="border-radius:50px;">
              <input type="text" class="search-input" placeholder="Search products..." style="padding-left:20px;">
              <button class="search-btn" style="border-radius:0 50px 50px 0;"><i class="bi bi-search"></i></button>
            </div>
          </form>
        </div>
      </div>
    </header>

    <!-- NAV BAR -->
    <nav class="main-nav d-none d-lg-block" id="main-nav">
      <div class="container-xl" style="position:relative;">
        <div class="nav-inner" style="display:flex;align-items:stretch;position:relative;">

          <!-- Compact Logo (shows when header collapses) -->
          <div class="compact-nav-logo">
            <a href="index.html" style="display:flex;align-items:center;padding:0 4px;">
              <img src="assets/logo.svg" alt="Nematel" style="height:30px;filter:brightness(0) invert(1);" onerror="this.outerHTML='<span style=\\'color:white;font-weight:900;font-size:14px;\\'>NEMATEL</span>'">
            </a>
          </div>

          <!-- All Categories Button -->
          <button class="nav-categories-btn" id="cat-btn" aria-expanded="false">
            <i class="bi bi-grid-3x3-gap-fill me-1"></i>
            All Categories
            <i class="bi bi-chevron-down" id="cat-chevron" style="font-size:11px;margin-left:4px;transition:transform 0.3s;"></i>
          </button>

          <!-- Nav Links -->
          <ul class="nav-links">
            <li><a href="index.html" class="${activePage === 'home' ? 'active' : ''}">Home</a></li>
            <li><a href="flash-sale.html" class="flash-sale-link ${activePage === 'flash-sale' ? 'active' : ''}"><i class="bi bi-lightning-fill"></i> Flash Sale</a></li>
            <li><a href="brands.html" class="${activePage === 'brands' ? 'active' : ''}">All Brands</a></li>
            <li><a href="product-listing.html" class="${activePage === 'products' ? 'active' : ''}">Products</a></li>
            <li><a href="compare.html" class="${activePage === 'compare' ? 'active' : ''}">Compare</a></li>
            <li><a href="about.html" class="${activePage === 'about' ? 'active' : ''}">About Us</a></li>
            <li><a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
          </ul>

          <!-- Compact Search (shows when header collapses) -->
          <div class="compact-nav-search">
            <form class="compact-nav-search-inner" onsubmit="event.preventDefault();window.location.href='product-listing.html?search='+encodeURIComponent(this.querySelector('input').value)">
              <i class="bi bi-search" style="color:rgba(255,255,255,0.5);font-size:13px;"></i>
              <input type="text" placeholder="Search products...">
              <button type="submit"><i class="bi bi-search"></i></button>
            </form>
          </div>

          <!-- Right -->
          <div class="nav-right" style="display:flex;align-items:center;gap:4px;margin-left:auto;">
            <a href="become-seller.html" style="color:rgba(255,255,255,0.8);font-size:13px;display:flex;align-items:center;gap:5px;text-decoration:none;padding:6px 12px;border-radius:6px;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background=''">
              <i class="bi bi-shop-window"></i> Sell
            </a>
            <!-- Compact Cart -->
            <button class="compact-nav-cart" onclick="openCartDrawer()" title="Cart">
              <i class="bi bi-cart3"></i>
              <span class="cart-count">0</span>
            </button>
          </div>

        </div>
      </div>

      <!-- MEGA MENU FLYOUT -->
      <div id="mega-panel" class="mega-panel">
        <div class="container-xl p-0">
          <div class="mega-panel-inner">
            <div class="mega-cat-sidebar" id="mega-cat-sidebar"></div>
            <div class="mega-cat-content" id="mega-cat-content">
              <div style="display:flex;align-items:center;justify-content:center;height:100%;min-height:200px;color:var(--gray-400);">
                <div style="text-align:center;">
                  <i class="bi bi-grid-3x3-gap" style="font-size:48px;opacity:0.3;"></i>
                  <p style="margin-top:8px;font-size:14px;">Hover a category to explore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    </div><!-- end .sticky-header-wrapper -->
  `;
}

// ============================================================
// FOOTER HTML
// ============================================================
function getFooterHTML() {
  return `
    <!-- NEWSLETTER -->
    <section class="newsletter-section">
      <div class="container-xl">
        <div class="newsletter-content reveal">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get exclusive deals, new arrivals and construction tips delivered to your inbox</p>
          <form class="newsletter-form" id="newsletter-form" onsubmit="return false;">
            <input type="email" placeholder="Enter your email address..." required>
            <button type="submit">Subscribe <i class="bi bi-arrow-right ms-1"></i></button>
          </form>
          <p style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:12px;margin-bottom:0;">🔒 We respect your privacy. No spam, ever.</p>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="main-footer">
      <div class="container-xl">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="logo-wrap">
              <img src="assets/logo.svg" alt="Nematel" style="height:42px;filter:brightness(0) invert(1);" onerror="this.outerHTML='<div style=\\'display:flex;align-items:center;gap:8px;\\'><div class=\\'logo-icon\\'>N</div><span class=\\'brand-name\\' style=\\'color:white;\\'>NEMATEL</span></div>'">
            </div>
            <p style="margin-top:12px;">New Materials &amp; Technology Ltd. — Your one-stop destination for premium construction materials with nationwide delivery across Bangladesh.</p>
            <ul class="footer-contact-info">
              <li><i class="bi bi-geo-alt-fill"></i> Khan Tower, 4th Floor, 141, Senpara Parbata, Rokeya Shoroni Road, Mirpur-10, Dhaka-1216</li>
              <li><i class="bi bi-telephone-fill"></i> <a href="tel:01955008864" style="color:rgba(255,255,255,0.8);">01955-008864</a></li>
              <li><i class="bi bi-envelope-fill"></i> <a href="mailto:info@nematel.com" style="color:rgba(255,255,255,0.8);">info@nematel.com</a></li>
            </ul>
            <div class="social-links mt-3">
              <a href="#" class="social-btn"><i class="bi bi-facebook"></i></a>
              <a href="#" class="social-btn"><i class="bi bi-instagram"></i></a>
              <a href="#" class="social-btn"><i class="bi bi-youtube"></i></a>
              <a href="#" class="social-btn"><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>
          <div class="footer-col">
            <h5>My Account</h5>
            <ul class="footer-links">
              <li><a href="auth.html">Login</a></li>
              <li><a href="dashboard.html">Dashboard</a></li>
              <li><a href="order-history.html">Order History</a></li>
              <li><a href="wishlist.html">My Wishlist</a></li>
              <li><a href="compare.html">Compare Products</a></li>
              <li><a href="track-order.html">Track Order</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Information</h5>
            <ul class="footer-links">
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="terms.html">Terms &amp; Conditions</a></li>
              <li><a href="privacy.html">Privacy Policy</a></li>
              <li><a href="return-policy.html">Return Policy</a></li>
              <li><a href="support-policy.html">Support Policy</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Seller Zone</h5>
            <ul class="footer-links">
              <li><a href="become-seller.html">Become a Seller</a></li>
              <li><a href="#">Seller Dashboard</a></li>
            </ul>
            <h5 style="margin-top:20px;">Download App</h5>
            <div class="app-badges">
              <div class="app-badge" style="cursor:pointer;">
                <i class="bi bi-google-play"></i>
                <div class="app-text"><small>Get it on</small><span>Google Play</span></div>
              </div>
              <div class="app-badge" style="cursor:pointer;">
                <i class="bi bi-apple"></i>
                <div class="app-text"><small>Download on the</small><span>App Store</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Copyright &copy; 2024 <span>Nematel — New Materials &amp; Technology Ltd.</span> All rights reserved.</p>
          <div class="payment-methods">
            <span>Payment:</span>
            <div class="payment-icon" style="background:#e6007a;color:white;">bKash</div>
            <div class="payment-icon" style="background:#f90;color:#333;">Nagad</div>
            <div class="payment-icon" style="background:#00a4b4;color:white;">Rocket</div>
            <div class="payment-icon"><i class="bi bi-credit-card-fill text-primary"></i> Card</div>
            <div class="payment-icon">COD</div>
          </div>
        </div>
      </div>
    </footer>

    <!-- MOBILE BOTTOM NAV -->
    <nav class="mobile-bottom-nav">
      <div class="nav-items">
        <a href="index.html" class="nav-item"><i class="bi bi-house-fill"></i><span>Home</span></a>
        <a href="categories.html" class="nav-item"><i class="bi bi-grid-fill"></i><span>Categories</span></a>
        <button class="nav-item center-btn" onclick="openCartDrawer()" style="border:none;cursor:pointer;position:relative;">
          <i class="bi bi-cart3"></i>
          <span class="badge-count d-none cart-count" style="top:-4px;right:4px;"></span>
        </button>
        <a href="wishlist.html" class="nav-item" style="position:relative;"><i class="bi bi-heart"></i><span>Wishlist</span><span class="badge-count d-none" data-wishlist-count style="top:-2px;right:0;"></span></a>
        <a href="dashboard.html" class="nav-item"><i class="bi bi-person"></i><span>Account</span></a>
      </div>
    </nav>

    <!-- BACK TO TOP -->
    <button id="back-to-top" class="back-to-top"><i class="bi bi-chevron-up"></i></button>
  `;
}

// ============================================================
// MOBILE MENU HTML
// ============================================================
function getMobileMenuHTML(activePage = '') {
  return `
    <div id="mobile-menu-overlay" class="mobile-menu-overlay" onclick="closeMobileMenu()"></div>
    <nav id="mobile-menu" class="mobile-menu">
      <div style="background:var(--secondary);padding:18px 16px;display:flex;align-items:center;justify-content:space-between;">
        <img src="assets/logo.svg" alt="Nematel" style="height:36px;filter:brightness(0) invert(1);" onerror="this.outerHTML='<span style=\\'color:white;font-weight:900;font-size:17px;\\'>NEMATEL</span>'">
        <button id="close-mobile-menu" onclick="closeMobileMenu()" style="background:rgba(255,255,255,0.1);border:none;color:white;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div style="padding:12px 16px;border-bottom:1px solid var(--gray-200);">
        <form onsubmit="event.preventDefault();window.location.href='product-listing.html?search='+encodeURIComponent(this.querySelector('input').value)" style="display:flex;gap:8px;background:var(--gray-100);border-radius:8px;padding:8px 12px;">
          <i class="bi bi-search" style="color:var(--gray-500);"></i>
          <input type="text" placeholder="Search products..." style="border:none;background:none;outline:none;font-size:14px;flex:1;">
        </form>
      </div>
      <nav style="padding:8px 0;">
        ${[
          ['index.html','home','Home','bi-house-fill'],
          ['flash-sale.html','flash-sale','Flash Sale','bi-lightning-fill'],
          ['categories.html','categories','All Categories','bi-grid-fill'],
          ['brands.html','brands','All Brands','bi-award-fill'],
          ['compare.html','compare','Compare','bi-arrow-left-right'],
          ['about.html','about','About Us','bi-info-circle-fill'],
          ['contact.html','contact','Contact','bi-telephone-fill'],
        ].map(([href, page, label, icon]) => `
          <a href="${href}" style="display:flex;align-items:center;gap:12px;padding:13px 20px;color:${activePage===page?'var(--primary)':'var(--gray-700)'};font-size:14px;font-weight:${activePage===page?'700':'500'};text-decoration:none;border-left:3px solid ${activePage===page?'var(--primary)':'transparent'};background:${activePage===page?'var(--primary-bg)':'transparent'};transition:all 0.2s;">
            <i class="bi ${icon}" style="width:20px;color:${activePage===page?'var(--primary)':'var(--gray-400)'};"></i> ${label}
          </a>
        `).join('')}
        <div style="height:1px;background:var(--gray-200);margin:8px 0;"></div>
        <a href="auth.html" style="display:flex;align-items:center;gap:12px;padding:13px 20px;color:var(--gray-700);font-size:14px;font-weight:500;text-decoration:none;border-left:3px solid transparent;">
          <i class="bi bi-person-fill" style="width:20px;color:var(--gray-400);"></i> Login / Register
        </a>
        <a href="become-seller.html" style="display:flex;align-items:center;gap:12px;padding:13px 20px;color:var(--primary);font-size:14px;font-weight:600;text-decoration:none;border-left:3px solid transparent;">
          <i class="bi bi-shop" style="width:20px;"></i> Become a Seller
        </a>
      </nav>
    </nav>
  `;
}

// ============================================================
// CART DRAWER HTML
// ============================================================
function getCartDrawerHTML() {
  return `
    <div id="cart-drawer-overlay" class="cart-drawer-overlay" onclick="closeCartDrawer()"></div>
    <div id="cart-drawer" class="cart-drawer">
      <div class="cart-drawer-header">
        <h5><i class="bi bi-cart3" style="color:var(--primary);"></i> Shopping Cart</h5>
        <button id="close-cart-drawer" onclick="closeCartDrawer()" style="background:var(--gray-100);border:none;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;color:var(--gray-700);">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="cart-drawer-body" id="cart-drawer-body"></div>
      <div class="cart-drawer-footer" id="cart-drawer-footer" style="display:none;">
        <div style="margin-bottom:10px;">
          <div style="height:4px;background:var(--gray-100);border-radius:4px;overflow:hidden;margin-bottom:6px;">
            <div class="progress-fill" id="drawer-ship-progress" style="width:0%;background:linear-gradient(90deg,var(--primary),var(--accent));transition:width 0.5s ease;"></div>
          </div>
          <div style="font-size:11px;color:var(--gray-500);" id="drawer-ship-msg">Add more for FREE shipping</div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <span style="font-size:12px;color:var(--gray-500);" id="cart-drawer-count">0 items</span>
            <div style="font-size:11px;color:var(--success);" id="drawer-savings"></div>
          </div>
          <div>
            <div style="font-size:11px;color:var(--gray-400);text-align:right;">Total</div>
            <span style="font-size:20px;font-weight:900;color:var(--primary);" id="cart-drawer-total">৳0</span>
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <a href="cart.html" class="btn-outline-primary-custom" style="flex:1;font-size:13px;padding:10px 12px;justify-content:center;">
            <i class="bi bi-cart me-1"></i>View Cart
          </a>
          <a href="checkout.html" class="btn-primary-custom" style="flex:1;font-size:13px;padding:10px 12px;justify-content:center;">
            <i class="bi bi-lock-fill me-1"></i>Checkout
          </a>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// NOTIFICATION PANEL HTML
// ============================================================
function getNotificationPanelHTML() {
  return `
    <div id="notif-overlay" style="position:fixed;inset:0;z-index:1035;display:none;" onclick="closeNotifications()"></div>
    <div id="notification-panel" class="notification-panel" style="position:fixed;top:72px;right:16px;">
      <div class="notification-header">
        <h6><i class="bi bi-bell-fill" style="color:var(--primary);"></i> Notifications <span class="badge-count" style="background:var(--danger);position:static;display:inline-flex;">3</span></h6>
        <button onclick="markAllRead()">Mark all read</button>
      </div>
      <div id="notif-list">
        <div class="notification-item unread">
          <div class="notification-dot" style="background:var(--primary-bg);color:var(--primary);">🛒</div>
          <div class="notif-text">
            <div class="notif-title">Flash Sale Started!</div>
            <div class="notif-msg">Up to 40% off on construction materials. Hurry!</div>
          </div>
          <span class="notif-time">2m</span>
        </div>
        <div class="notification-item unread">
          <div class="notification-dot" style="background:#d1ecf1;color:#0891b2;">📦</div>
          <div class="notif-text">
            <div class="notif-title">Order Dispatched</div>
            <div class="notif-msg">Your order EC-2024-002 has been shipped.</div>
          </div>
          <span class="notif-time">1h</span>
        </div>
        <div class="notification-item unread">
          <div class="notification-dot" style="background:#d4edda;color:#27ae60;">✅</div>
          <div class="notif-text">
            <div class="notif-title">Order Delivered</div>
            <div class="notif-msg">EC-2024-001 delivered successfully!</div>
          </div>
          <span class="notif-time">2d</span>
        </div>
        <div class="notification-item">
          <div class="notification-dot" style="background:#fff3cd;color:#f39c12;">🎁</div>
          <div class="notif-text">
            <div class="notif-title">Special Offer</div>
            <div class="notif-msg">Use code SAVE10 for 10% off your next order.</div>
          </div>
          <span class="notif-time">5d</span>
        </div>
      </div>
      <a href="#" style="display:block;text-align:center;padding:12px;font-size:13px;font-weight:600;color:var(--primary);border-top:1px solid var(--gray-100);text-decoration:none;">View All Notifications</a>
    </div>
  `;
}

// ============================================================
// RENDER ALL COMPONENTS INTO PLACEHOLDERS
// ============================================================
function renderSharedComponents(activePage = '') {
  // Inject page-loader at the very top of body (if not already present)
  if (!document.getElementById('page-loader')) {
    document.body.insertAdjacentHTML('afterbegin', `
      <div id="page-loader" class="page-loader">
        <div style="display:flex;flex-direction:column;align-items:center;gap:16px;">
          <img src="assets/logo.svg" alt="Nematel" style="height:52px;"
            onerror="this.outerHTML='<span style=\\'font-weight:900;font-size:22px;color:#e84610;\\'>NEMATEL</span>'">
          <div class="loader-ring"></div>
        </div>
      </div>`);
  }

  // Header (includes top bar + sticky wrapper + header + nav)
  const headerPH = document.getElementById('header-placeholder');
  if (headerPH) headerPH.innerHTML = getHeaderHTML(activePage);

  // Mobile Menu
  const mobPH = document.getElementById('mobile-menu-placeholder');
  if (mobPH) mobPH.innerHTML = getMobileMenuHTML(activePage);

  // Cart Drawer
  const cartPH = document.getElementById('cart-drawer-placeholder');
  if (cartPH) cartPH.innerHTML = getCartDrawerHTML();

  // Notification Panel (inject before closing body)
  document.body.insertAdjacentHTML('beforeend', getNotificationPanelHTML());

  // Footer
  const footerPH = document.getElementById('footer-placeholder');
  if (footerPH) footerPH.innerHTML = getFooterHTML();

  // Init after DOM update
  setTimeout(initSharedJS, 0);
}

// ============================================================
// SHARED JS (runs after components are injected)
// ============================================================
function initSharedJS() {
  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn && !mobileBtn.onclick) {
    mobileBtn.onclick = () => openMobileMenu();
  }

  // Cart drawer open button (data-open-cart)
  document.querySelectorAll('[data-open-cart]').forEach(btn => {
    btn.onclick = () => openCartDrawer();
  });

  // Cart manager update
  if (window.cartManager) window.cartManager.updateUI();
  if (window.wishlistManager) window.wishlistManager.updateUI();

  // Init mega menu
  initComponentsMegaMenu();

  // Init sticky header scroll
  initStickyHeaderScroll();
}

// ============================================================
// MOBILE MENU FUNCTIONS (global)
// ============================================================
window.openMobileMenu = function() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  if (menu) menu.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeMobileMenu = function() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  if (menu) menu.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
};

// ============================================================
// CART DRAWER FUNCTIONS (global)
// ============================================================
window.openCartDrawer = function() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (window.cartManager) window.cartManager._updateCartDrawer();
};

window.closeCartDrawer = function() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
};

// ============================================================
// NOTIFICATION FUNCTIONS (global)
// ============================================================
window.toggleNotifications = function() {
  const panel = document.getElementById('notification-panel');
  const overlay = document.getElementById('notif-overlay');
  if (!panel) return;
  const isOpen = panel.classList.contains('open');
  if (isOpen) {
    closeNotifications();
  } else {
    panel.classList.add('open');
    if (overlay) overlay.style.display = 'block';
  }
};

window.closeNotifications = function() {
  const panel = document.getElementById('notification-panel');
  const overlay = document.getElementById('notif-overlay');
  if (panel) panel.classList.remove('open');
  if (overlay) overlay.style.display = 'none';
};

window.markAllRead = function() {
  document.querySelectorAll('.notification-item.unread').forEach(el => el.classList.remove('unread'));
  const badge = document.querySelector('#notif-btn .badge-count');
  if (badge) { badge.textContent = '0'; badge.style.display = 'none'; }
  window.showToast && window.showToast('All notifications marked as read', 'success');
};

// ============================================================
// MOBILE SEARCH
// ============================================================
window.toggleMobileSearch = function() {
  const bar = document.getElementById('mobile-search-bar');
  if (!bar) return;
  const isHidden = bar.style.display === 'none' || bar.style.display === '';
  bar.style.display = isHidden ? 'block' : 'none';
  if (isHidden) bar.querySelector('input')?.focus();
};

// ============================================================
// MEGA MENU (for components-injected nav)
// ============================================================
function initComponentsMegaMenu() {
  let activeSlug = null;
  let panelOpen = false;
  let closeTimer = null;

  // Build sidebar
  const sidebar = document.getElementById('mega-cat-sidebar');
  if (!sidebar) return;
  sidebar.innerHTML = MEGA_CATS.map(cat => `
    <div class="mega-cat-item" data-cat="${cat.slug}" data-name="${cat.name}"
      onmouseenter="window._loadMegaContent && window._loadMegaContent('${cat.slug}')"
      onclick="window.location.href='product-listing.html?category=${cat.slug}'">
      <span class="cat-emoji">${cat.emoji}</span>
      <div class="cat-label">${cat.name}</div>
      <span class="cat-count">${cat.count}</span>
      <i class="bi bi-chevron-right cat-arrow-right"></i>
    </div>
  `).join('');

  window._loadMegaContent = function(slug) {
    if (activeSlug === slug) return;
    activeSlug = slug;
    const cat = MEGA_CATS.find(c => c.slug === slug);
    if (!cat) return;

    document.querySelectorAll('.mega-cat-item').forEach(el => {
      el.classList.toggle('active', el.dataset.cat === slug);
    });

    const products = (window.DUMMY_DATA?.products || [])
      .filter(p => p.category === slug).slice(0, 4);

    const content = document.getElementById('mega-cat-content');
    if (!content) return;

    const cfg = (window.CAT_PLACEHOLDER && window.CAT_PLACEHOLDER[slug]) || { bg:'#f8f9fa', accent:'#6c757d', icon: cat.emoji };

    content.innerHTML = `
      <div class="mega-content-header">
        <h4>${cat.emoji} ${cat.name}</h4>
        <a href="product-listing.html?category=${slug}" class="view-all-link">
          View All ${cat.count} Products <i class="bi bi-arrow-right"></i>
        </a>
      </div>
      <div class="mega-subcats">
        ${cat.subs.map(s => `<a href="product-listing.html?category=${slug}&sub=${encodeURIComponent(s)}" class="mega-subcat-pill">${s}</a>`).join('')}
      </div>
      ${products.length ? `
        <div class="mega-products-label">⚡ Featured Products</div>
        <div class="mega-products-grid">
          ${products.map(p => `
            <a href="product-detail.html?id=${p.id}" class="mega-product-card">
              <div class="mega-product-img" style="background:${cfg.bg};overflow:hidden;">
                ${p.images && p.images[0]
                  ? `<img src="${p.images[0]}" alt="${(p.name||'').replace(/"/g,'&quot;')}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentNode.textContent='${cfg.icon || cat.emoji}';">`
                  : (cfg.icon || cat.emoji)}
              </div>
              <div class="mega-product-info">
                <div class="mega-product-name">${p.name}</div>
                <div class="mega-product-price">৳${p.price.toLocaleString()}</div>
              </div>
            </a>
          `).join('')}
        </div>
      ` : `<div style="text-align:center;padding:30px;color:var(--gray-400);">Browse all ${cat.name} products</div>`}
    `;
  };

  function openPanel() {
    clearTimeout(closeTimer);
    if (!panelOpen) {
      document.getElementById('mega-panel')?.classList.add('open');
      const chevron = document.getElementById('cat-chevron');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
      panelOpen = true;
      if (!activeSlug && MEGA_CATS.length) window._loadMegaContent(MEGA_CATS[0].slug);
    }
  }

  function scheduleClose() {
    closeTimer = setTimeout(() => {
      document.getElementById('mega-panel')?.classList.remove('open');
      const chevron = document.getElementById('cat-chevron');
      if (chevron) chevron.style.transform = '';
      panelOpen = false;
      activeSlug = null;
    }, 200);
  }

  const btn = document.getElementById('cat-btn');
  const panel = document.getElementById('mega-panel');
  if (!btn || !panel) return;

  btn.addEventListener('mouseenter', openPanel);
  btn.addEventListener('mouseleave', scheduleClose);
  btn.addEventListener('click', () => panelOpen ? scheduleClose() : openPanel());
  panel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
  panel.addEventListener('mouseleave', scheduleClose);

  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !panel.contains(e.target)) scheduleClose();
  });
}

// ============================================================
// STICKY HEADER SCROLL (for components-injected header)
// ============================================================
function initStickyHeaderScroll() {
  let ticking = false;
  const COMPACT = 90;
  const MINIMAL = 300;

  function onScroll() {
    const y = window.scrollY;
    if (y > MINIMAL) {
      document.body.classList.add('header-minimal', 'header-compact');
    } else if (y > COMPACT) {
      document.body.classList.add('header-compact');
      document.body.classList.remove('header-minimal');
    } else {
      document.body.classList.remove('header-compact', 'header-minimal');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
}
