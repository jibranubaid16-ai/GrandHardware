/**
 * Grand Hardware - Products Page Script
 * Manages product grid rendering, search, category filtering, recently viewed, and quote modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('productGrid');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const emptyState = document.getElementById('emptyState');
  const resetSearchBtn = document.getElementById('resetSearchBtn');
  const catalogResultsCount = document.getElementById('catalogResultsCount');
  const catalogCategoryTitle = document.getElementById('catalogCategoryTitle');
  const openQuoteModalBtn = document.getElementById('openQuoteModalBtn');

  let currentCategory = 'all';
  let searchQuery = '';

  // Render Product Card HTML
  function createProductCard(product) {
    const isSection = product.isAluminumSection;
    return `
      <article class="product-card catalog-card ${isSection ? 'metallic-card' : ''}">
        <div class="product-image">
          ${isSection ? '<span class="metallic-badge">Aluminum Profile</span>' : ''}
          <img src="${encodeURI(product.image)}" alt="${product.name}" loading="lazy" decoding="async" onerror="this.src='product image box/3.jpg.jpeg'">
        </div>
        <div class="product-card-body">
          <span class="card-category">${product.category}</span>
          <h3>${product.name}</h3>
          <p class="card-short-desc">${product.shortDesc}</p>
          <div class="card-footer-actions">
            <a href="product-detail.html?id=${product.id}" class="button card-btn">View Details <span>→</span></a>
          </div>
        </div>
      </article>
    `;
  }

  // Filter & Render Function
  function filterAndRender() {
    const allProducts = getAllProducts();
    const filtered = allProducts.filter(p => {
      const matchesCategory = (currentCategory === 'all') || (p.category.toLowerCase() === currentCategory.toLowerCase());
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        p.name.toLowerCase().includes(query) || 
        p.shortDesc.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.applications && p.applications.some(a => a.toLowerCase().includes(query)));
      
      return matchesCategory && matchesSearch;
    });

    // Update UI Titles and Counters
    if (catalogCategoryTitle) {
      if (currentCategory === 'all') catalogCategoryTitle.textContent = 'All Aluminum & Hardware Products';
      else catalogCategoryTitle.textContent = `${currentCategory} Range`;
    }

    if (catalogResultsCount) {
      catalogResultsCount.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
    }

    // Render Grid or Empty State
    if (filtered.length === 0) {
      productGrid.style.display = 'none';
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
      productGrid.style.display = 'grid';
      productGrid.innerHTML = filtered.map(createProductCard).join('');
    }
  }

  // Event Listeners for Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
      }
      filterAndRender();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      filterAndRender();
    });
  }

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      currentCategory = 'all';
      filterTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === 'all');
      });
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      filterAndRender();
    });
  }

  // Category Tabs Event Listeners
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentCategory = tab.dataset.category;
      filterAndRender();
    });
  });

  // Recently Viewed Products
  function renderRecentlyViewed() {
    const recentlyViewedWrap = document.getElementById('recentlyViewedWrap');
    const recentlyViewedGrid = document.getElementById('recentlyViewedGrid');
    if (!recentlyViewedWrap || !recentlyViewedGrid) return;

    try {
      const viewedIds = JSON.parse(localStorage.getItem('gh_recently_viewed') || '[]');
      if (viewedIds.length > 0) {
        const viewedProducts = viewedIds
          .map(id => getProductById(id))
          .filter(Boolean)
          .slice(0, 4);

        if (viewedProducts.length > 0) {
          recentlyViewedGrid.innerHTML = viewedProducts.map(createProductCard).join('');
          recentlyViewedWrap.style.display = 'block';
        }
      }
    } catch (err) {
      console.warn('Could not read recently viewed products:', err);
    }
  }

  // Quote Modal Triggers
  if (openQuoteModalBtn) {
    openQuoteModalBtn.addEventListener('click', () => {
      if (window.openQuoteModal) window.openQuoteModal('Aluminum Sections & Profiles');
    });
  }

  // Initial Execution
  filterAndRender();
  renderRecentlyViewed();
});
