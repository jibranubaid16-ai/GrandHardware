/**
 * Grand Hardware - Product Detail Page & 3D Viewer Script
 * Handles dynamic product data loading, Three.js 3D extrusion rendering, interactive controls & WhatsApp pre-filled enquiries.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Parse URL query parameter ?id=...
  const urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get('id');

  // Fallback to top-section if no valid product ID provided
  let product = getProductById(productId);
  if (!product) {
    product = getProductById('top-section');
    productId = 'top-section';
  }

  // ----------------------------------------------------
  // 1. POPULATE PRODUCT METADATA & UI FIELDS
  // ----------------------------------------------------
  document.title = `Grand Hardware | ${product.name}`;
  
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = `Grand Hardware | ${product.name}`;

  const breadcrumbCategory = document.getElementById('breadcrumbCategory');
  const breadcrumbProductName = document.getElementById('breadcrumbProductName');
  if (breadcrumbCategory) breadcrumbCategory.textContent = product.category;
  if (breadcrumbProductName) breadcrumbProductName.textContent = product.name;

  const productCategoryBadge = document.getElementById('productCategoryBadge');
  const productTitle = document.getElementById('productTitle');
  const productShortDesc = document.getElementById('productShortDesc');
  const specMaterial = document.getElementById('specMaterial');
  const sideCategory = document.getElementById('sideCategory');
  const sideSpecs = document.getElementById('sideSpecs');

  if (productCategoryBadge) productCategoryBadge.textContent = product.category;
  if (productTitle) productTitle.textContent = product.name;
  if (productShortDesc) productShortDesc.textContent = product.shortDesc;
  if (specMaterial) specMaterial.textContent = product.material || 'Aluminium';
  if (sideCategory) sideCategory.textContent = product.category;
  if (sideSpecs) sideSpecs.textContent = product.specs || "Available specifications can be confirmed with our sales team.";

  const productFullDesc = document.getElementById('productFullDesc');
  if (productFullDesc) productFullDesc.textContent = product.fullDesc;

  // Applications list
  const applicationsList = document.getElementById('applicationsList');
  if (applicationsList && product.applications) {
    applicationsList.innerHTML = product.applications
      .map(app => `<li><span class="check-icon">✓</span> ${app}</li>`)
      .join('');
  }

  // Features list
  const featuresList = document.getElementById('featuresList');
  if (featuresList && product.features) {
    featuresList.innerHTML = product.features
      .map(feat => `<li><span class="check-icon">✓</span> ${feat}</li>`)
      .join('');
  }

  // ----------------------------------------------------
  // 2. WHATSAPP & QUOTE ACTION LINKS
  // ----------------------------------------------------
  const detailWhatsappLink = document.getElementById('detailWhatsappLink');
  if (detailWhatsappLink) {
    const waText = `Hello Grand Hardware, I am interested in the ${product.name}. Please share the details and price.`;
    detailWhatsappLink.href = `https://wa.me/8240522314?text=${encodeURIComponent(waText)}`;
  }

  const detailQuoteBtn = document.getElementById('detailQuoteBtn');
  const sideQuoteBtn = document.getElementById('sideQuoteBtn');
  const quoteProductName = document.getElementById('quoteProductName');

  if (quoteProductName) quoteProductName.value = product.name;

  if (detailQuoteBtn) {
    detailQuoteBtn.addEventListener('click', () => {
      if (window.openQuoteModal) window.openQuoteModal(product.name);
    });
  }

  if (sideQuoteBtn) {
    sideQuoteBtn.addEventListener('click', () => {
      if (window.openQuoteModal) window.openQuoteModal(product.name);
    });
  }

  // ----------------------------------------------------
  // 3. RECENTLY VIEWED STORAGE
  // ----------------------------------------------------
  try {
    let viewed = JSON.parse(localStorage.getItem('gh_recently_viewed') || '[]');
    viewed = viewed.filter(id => id !== productId);
    viewed.unshift(productId);
    localStorage.setItem('gh_recently_viewed', JSON.stringify(viewed.slice(0, 8)));
  } catch (err) {
    console.warn('LocalStorage error:', err);
  }

  // ----------------------------------------------------
  // 4. RENDER RELATED PRODUCTS
  // ----------------------------------------------------
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid) {
    const relatedList = getRelatedProducts(productId, 4);
    relatedGrid.innerHTML = relatedList.map(rel => `
      <article class="product-card catalog-card ${rel.isAluminumSection ? 'metallic-card' : ''}">
        <div class="product-image">
          ${rel.isAluminumSection ? '<span class="metallic-badge">Aluminum Profile</span>' : ''}
          <img src="${encodeURI(rel.image)}" alt="${rel.name}" loading="lazy" decoding="async" onerror="this.src='product image box/3.jpg.jpeg'">
        </div>
        <div class="product-card-body">
          <span class="card-category">${rel.category}</span>
          <h3>${rel.name}</h3>
          <p class="card-short-desc">${rel.shortDesc}</p>
          <div class="card-footer-actions">
            <a href="product-detail.html?id=${rel.id}" class="button card-btn">View Details <span>→</span></a>
          </div>
        </div>
      </article>
    `).join('');
  }

  // ----------------------------------------------------
  // 5. THREE.JS 3D PRODUCT SHOWCASE VIEWER
  // ----------------------------------------------------
  const canvas = document.getElementById('threeCanvas');
  const fallbackWrap = document.getElementById('fallbackImageWrap');
  const fallbackImg = document.getElementById('fallbackProductImg');
  const autoRotateBtn = document.getElementById('autoRotateBtn');
  const resetCameraBtn = document.getElementById('resetCameraBtn');
  const togglePhotoBtn = document.getElementById('togglePhotoBtn');

  if (fallbackImg) fallbackImg.src = product.image;

  // Check if Three.js is loaded
  if (typeof THREE === 'undefined' || !canvas) {
    if (canvas) canvas.style.display = 'none';
    if (fallbackWrap) fallbackWrap.style.display = 'block';
    return;
  }

  let scene, camera, renderer, meshGroup;
  let isAutoRotate = true;
  let isPhotoView = false;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  function init3DViewer() {
    const container = canvas.parentElement;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 380;

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0f172a, 55, 110);

    // Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 10, 55);

    // Renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      renderer.setClearColor(0x0f172a, 1);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
    } catch (e) {
      console.warn('WebGL not supported, falling back to image mode:', e);
      canvas.style.display = 'none';
      if (fallbackWrap) fallbackWrap.style.display = 'block';
      return;
    }

    // Lighting setup for realistic metallic shine
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(40, 50, 40);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x90b0d0, 1.0);
    dirLight2.position.set(-30, -20, -30);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xff8833, 0.8, 100);
    pointLight.position.set(0, 30, 20);
    scene.add(pointLight);

    // Create 2D Profile Shape based on section profileType
    const shape = createProfileShape(product.profileType || 'top');
    
    // Extrude geometry to create 3D profile section
    const extrudeSettings = {
      steps: 1,
      depth: 35,
      bevelEnabled: true,
      bevelThickness: 0.4,
      bevelSize: 0.4,
      bevelOffset: 0,
      bevelSegments: 3
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center(); // Center profile geometry
    geometry.computeVertexNormals();

    // Realistic Silver Metallic Material
    const material = new THREE.MeshStandardMaterial({
      color: 0xc8d4e0,
      metalness: 0.92,
      roughness: 0.22,
      wireframe: false
    });

    // Mesh Group for rotation
    meshGroup = new THREE.Group();
    const mesh = new THREE.Mesh(geometry, material);
    meshGroup.add(mesh);

    // Initial slight angle for elegant 3D presentation
    meshGroup.rotation.x = 0.35;
    meshGroup.rotation.y = -0.55;

    scene.add(meshGroup);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(150, 150),
      new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.15, roughness: 0.9 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -15;
    scene.add(floor);

    // Mouse & Touch Controls
    setupViewerInteractions(container);

    // Animation Loop
    animate();
  }

  // Create procedural 2D Profile Shapes for aluminum extrusions
  function createProfileShape(type) {
    const s = new THREE.Shape();

    switch (type) {
      case 'squaretube':
        // Square Box Profile with inner hole
        s.moveTo(-8, -8);
        s.lineTo(8, -8);
        s.lineTo(8, 8);
        s.lineTo(-8, 8);
        s.closePath();

        const hole = new THREE.Path();
        hole.moveTo(-6, -6);
        hole.lineTo(6, -6);
        hole.lineTo(6, 6);
        hole.lineTo(-6, 6);
        hole.closePath();
        s.holes.push(hole);
        break;

      case 'angle':
        // L-Angle Profile
        s.moveTo(-8, -8);
        s.lineTo(8, -8);
        s.lineTo(8, -5);
        s.lineTo(-5, -5);
        s.lineTo(-5, 8);
        s.lineTo(-8, 8);
        s.closePath();
        break;

      case 'tclip':
        // T-Clip Profile
        s.moveTo(-9, 5);
        s.lineTo(9, 5);
        s.lineTo(9, 7);
        s.lineTo(1.5, 7);
        s.lineTo(1.5, -8);
        s.lineTo(-1.5, -8);
        s.lineTo(-1.5, 7);
        s.lineTo(-9, 7);
        s.closePath();
        break;

      case 'bottom':
        // Bottom Rail Section with roller groove
        s.moveTo(-10, -5);
        s.lineTo(10, -5);
        s.lineTo(10, 5);
        s.lineTo(7, 5);
        s.lineTo(7, -2);
        s.lineTo(3, -2);
        s.lineTo(3, 5);
        s.lineTo(-3, 5);
        s.lineTo(-3, -2);
        s.lineTo(-7, -2);
        s.lineTo(-7, 5);
        s.lineTo(-10, 5);
        s.closePath();
        break;

      case 'runner':
        // Dual Track Runner Profile
        s.moveTo(-12, -4);
        s.lineTo(12, -4);
        s.lineTo(12, 6);
        s.lineTo(9, 6);
        s.lineTo(9, -1);
        s.lineTo(4, -1);
        s.lineTo(4, 6);
        s.lineTo(1, 6);
        s.lineTo(1, -1);
        s.lineTo(-4, -1);
        s.lineTo(-4, 6);
        s.lineTo(-9, 6);
        s.lineTo(-9, -1);
        s.lineTo(-12, -1);
        s.closePath();
        break;

      case 'interlock':
        // Interlock hooked profile
        s.moveTo(-6, -8);
        s.lineTo(4, -8);
        s.lineTo(4, -5);
        s.lineTo(-3, -5);
        s.lineTo(-3, 5);
        s.lineTo(7, 5);
        s.lineTo(7, 8);
        s.lineTo(-6, 8);
        s.closePath();
        break;

      case 'asection':
        // A-Section Mullion Profile
        s.moveTo(-7, -7);
        s.lineTo(7, -7);
        s.lineTo(4, 7);
        s.lineTo(1.5, 7);
        s.lineTo(0, -2);
        s.lineTo(-1.5, 7);
        s.lineTo(-4, 7);
        s.closePath();
        break;

      case 'euro':
        // EURO Section Profile
        s.moveTo(-9, -9);
        s.lineTo(9, -9);
        s.lineTo(9, -6);
        s.lineTo(3, -6);
        s.lineTo(3, 6);
        s.lineTo(9, 6);
        s.lineTo(9, 9);
        s.lineTo(-9, 9);
        s.lineTo(-9, 6);
        s.lineTo(-3, 6);
        s.lineTo(-3, -6);
        s.lineTo(-9, -6);
        s.closePath();
        break;

      case 'muslim':
      case 'top':
      default:
        // Top U-Channel Section Profile
        s.moveTo(-9, -6);
        s.lineTo(9, -6);
        s.lineTo(9, 6);
        s.lineTo(6, 6);
        s.lineTo(6, -3);
        s.lineTo(-6, -3);
        s.lineTo(-6, 6);
        s.lineTo(-9, 6);
        s.closePath();
        break;
    }

    return s;
  }

  // Interactive Orbit / Drag & Pinch Zoom handling
  function setupViewerInteractions(container) {
    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging || !meshGroup) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      meshGroup.rotation.y += deltaX * 0.01;
      meshGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      if (!camera) return;
      camera.position.z += e.deltaY * 0.04;
      camera.position.z = Math.max(25, Math.min(120, camera.position.z));
    };

    // Touch events for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || !meshGroup || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      meshGroup.rotation.y += deltaX * 0.012;
      meshGroup.rotation.x += deltaY * 0.012;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // Responsive Canvas Resize
    window.addEventListener('resize', () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
    });
  }

  // Animation render loop
  function animate() {
    requestAnimationFrame(animate);

    if (meshGroup && isAutoRotate && !isDragging) {
      meshGroup.rotation.y += 0.008;
    }

    if (!isPhotoView && renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  // Controls Toolbar Event Handlers
  if (autoRotateBtn) {
    autoRotateBtn.addEventListener('click', () => {
      isAutoRotate = !isAutoRotate;
      autoRotateBtn.classList.toggle('active', isAutoRotate);
      autoRotateBtn.querySelector('span').textContent = isAutoRotate ? 'Auto Rotate' : 'Paused';
    });
  }

  if (resetCameraBtn) {
    resetCameraBtn.addEventListener('click', () => {
      if (camera && meshGroup) {
        camera.position.set(0, 10, 55);
        meshGroup.rotation.set(0.35, -0.55, 0);
      }
    });
  }

  if (togglePhotoBtn) {
    togglePhotoBtn.addEventListener('click', () => {
      isPhotoView = !isPhotoView;
      if (isPhotoView) {
        canvas.style.display = 'none';
        if (fallbackWrap) fallbackWrap.style.display = 'block';
        togglePhotoBtn.querySelector('span').textContent = '3D Mode';
      } else {
        canvas.style.display = 'block';
        if (fallbackWrap) fallbackWrap.style.display = 'none';
        togglePhotoBtn.querySelector('span').textContent = 'Photo Mode';
      }
    });
  }

  // Initialize 3D Engine
  init3DViewer();
});
