/**
 * Grand Hardware - Product Data Repository
 * Contains details for all 10 Aluminum Sections & Profiles and Hardware Range.
 */

const PRODUCTS_DATA = [
  // ----------------------------------------------------
  // 10 ALUMINUM SECTIONS / PROFILES
  // ----------------------------------------------------
  {
    id: "top-section",
    name: "Top Aluminum Section",
    category: "Aluminum Sections",
    isAluminumSection: true,
    shortDesc: "Premium upper guide rail and header profile designed for smooth sliding window and door track assemblies.",
    fullDesc: "The Top Aluminum Section is an essential upper track extrusion crafted for sliding window frames, door systems, and architectural partition assemblies. Engineered from high-strength architectural aluminium, it ensures smooth alignment and robust retention of sliding panels while resisting wear and weather exposure.",
    applications: [
      "Sliding Window Upper Tracks",
      "Door Frame Header Assemblies",
      "Office Partition Top Guides",
      "Cabinet & Display Case Sliding Tracks"
    ],
    features: [
      "Precision-extruded architectural aluminium profile",
      "Corrosion-resistant finish for long-lasting performance",
      "Designed for seamless integration with standard rollers and guide wheels",
      "Provides smooth, silent sliding operation"
    ],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/3.jpg.jpeg",
    profileType: "top"
  },
  {
    id: "bottom-section",
    name: "Bottom Aluminum Section",
    category: "Aluminum Sections",
    isAluminumSection: true,
    shortDesc: "Heavy-duty bottom track profile with integrated roller groove for sliding window and door sashes.",
    fullDesc: "The Bottom Aluminum Section forms the load-bearing lower track for sliding door and window systems. It is engineered with precision-formed internal grooves to accommodate heavy-duty roller wheels, ensuring effortless panel sliding and reliable drainage performance.",
    applications: [
      "Sliding Window Lower Tracks",
      "Balcony & Patio Sliding Door Tracks",
      "Commercial Entrance Sliding Systems",
      "Heavy Glass Partition Base Rails"
    ],
    features: [
      "High load-bearing structural integrity",
      "Precision roller track groove for low-friction operation",
      "Weather-resistant anodized/powder-coated metal surface",
      "Easy installation with standard structural fasteners"
    ],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/4.jpg.jpeg",
    profileType: "bottom"
  },
  {
    id: "a-section",
    name: "A Section",
    category: "Aluminum Sections",
    isAluminumSection: true,
    shortDesc: "Versatile A-style architectural profile for mullion joints, structural framing, and corner reinforcement.",
    fullDesc: "The A Section aluminum profile is specially engineered for structural framing, window mullion connections, and decorative joint covers. Its distinctive profile geometry provides high torsional rigidity while offering a clean, contemporary visual finish.",
    applications: [
      "Window & Door Frame Mullions",
      "Architectural Wall Partition Joint Caps",
      "Curtain Wall Framing Connections",
      "Custom Metal Fabrication & Enclosures"
    ],
    features: [
      "Distinctive A-shape geometry for enhanced structural strength",
      "Clean metallic finish suitable for modern interiors",
      "Lightweight yet robust extruded construction",
      "Compatible with standard aluminum corner keys and bracket fittings"
    ],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/1.jpg.jpeg",
    profileType: "asection"
  },
  {
    id: "runner",
    name: "Runner Aluminum Section",
    category: "Aluminum Sections",
    isAluminumSection: true,
    shortDesc: "Smooth dual-track guide runner extrusion for multi-panel sliding doors and heavy partition frames.",
    fullDesc: "The Runner Aluminum Section is designed to accommodate multi-track sliding panels in residential and commercial spaces. Featuring dual precision-formed guide channels, it delivers exceptional stability, preventing panel wobble and ensuring effortless sliding movement.",
    applications: [
      "Multi-panel Sliding Patio Doors",
      "Wardrobe & Cabinet Sliding Doors",
      "Commercial Glass Partition Systems",
      "Showroom Display Tracks"
    ],
    features: [
      "Dual-channel guide track extrusion",
      "Optimized geometry to reduce sliding friction and noise",
      "Resistant to bending, warping, and surface wear",
      "Available for bulk fabrication requirements"
    ],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/5.jpg.jpeg",
    profileType: "runner"
  },
  {
    id: "inter-lock",
    name: "Inter Lock Section",
    category: "Aluminum Sections",
    isAluminumSection: true,
    shortDesc: "Interlocking vertical sash profile providing weather sealing, dust protection, and structural sash connection.",
    fullDesc: "The Inter Lock Section is designed for the meeting stiles of sliding windows and doors. When panels close, opposing Inter Lock profiles mesh together seamlessly to form a tight seal against wind, dust, rainwater, and noise intrusion.",
    applications: [
      "Sliding Window Meeting Stiles",
      "Sliding Door Interlocking Sash Edges",
      "Acoustic Glass Partition Seals",
      "Weather-tight External Glazing"
    ],
    features: [
      "Precision interlocking lip profile",
      "Accommodates brush seals and rubber weather-stripping gaskets",
      "Enhances structural stability when windows/doors are locked",
      "Durable extruded aluminium composition"
    ],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/2.jpg.jpeg",
    profileType: "interlock"
  },
  {
    id: "t-clip",
    name: "T-Clip Section",
    category: "Aluminum Sections",
    isAluminumSection: true,
    shortDesc: "T-shaped retention clip extrusion for glass glazing, trim fastening, and panel securing.",
    fullDesc: "The T-Clip Section is a high-utility T-profile designed for glass glazing retainers, panel mounting, and architectural trim fixings. Its T-stem enables secure snap-in or screw-fixed installation across aluminum window and door frames.",
    applications: [
      "Glass Panel Glazing Clips",
      "Ceiling Tile & Panel Framing",
      "Decorative Architectural Trim Strips",
      "Structural Frame Panel Retention"
    ],
    features: [
      "Precision T-bar geometry for positive clip retention",
      "Easy cut-to-length installation",
      "Corrosion-proof aluminum alloy construction",
      "Clean finished appearance"
    ],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/7.jpg.jpeg",
    profileType: "tclip"
  },
  {
    id: "angle",
    name: "Aluminum Angle Section",
    category: "Aluminum Sections",
    isAluminumSection: true,
    shortDesc: "Standard L-shaped structural angle section for frame corner joints, brackets, and general metalwork.",
    fullDesc: "The Aluminum Angle Section is a core structural component in aluminum fabrication. Featuring precise 90-degree L-shaped geometry, it is widely utilized for frame corner reinforcements, mounting brackets, edge protection, and custom metal structural frameworks.",
    applications: [
      "Window & Door Frame Corner Brackets",
      "Structural Framework Reinforcement",
      "Shelf Supports & Equipment Mounting",
      "Architectural Edge Trim & Covers"
    ],
    features: [
      "Rigid 90-degree extruded L-profile",
      "Excellent strength-to-weight ratio",
      "Easy to drill, cut, weld, and fasten",
      "Suitable for indoor and outdoor structural applications"
    ],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/9.jpg.jpeg",
    profileType: "angle"
  },
  {
    id: "square-tube",
    name: "Aluminum Square Tube",
    category: "Aluminum Sections",
    isAluminumSection: true,
    shortDesc: "Hollow square extrusion section for robust structural posts, partition framing, and metal structures.",
    fullDesc: "The Aluminum Square Tube is a hollow box-section extrusion offering exceptional bending stiffness and torsional resistance. Ideal for load-bearing posts, architectural partition grids, modular furniture frames, and commercial display structures.",
    applications: [
      "Structural Support Posts & Columns",
      "Office Partition Frame Grids",
      "Racks, Furniture & Workbench Frames",
      "Railing & Balustrade Enclosures"
    ],
    features: [
      "Uniform wall thickness for reliable strength",
      "Hollow box section for concealed wiring or internal stiffeners",
      "Sleek metallic visual finish",
      "High dimensional accuracy"
    ],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/8.jpg.jpeg",
    profileType: "squaretube"
  },
  {
    id: "muslim",
    name: "Muslim Section",
    category: "Aluminum Sections",
    isAluminumSection: true,
    shortDesc: "Specialized aluminum partition section profile extensively used in commercial office glass partitions.",
    fullDesc: "The Muslim Section is a popular architectural section widely specified across India for commercial glass partitions, aluminum door mullions, and office cabin frames. Designed with specialized clip slots, it allows rapid insertion of glass panes and aluminum composite panels.",
    applications: [
      "Office Cabin Glass Partitions",
      "Commercial Door Frame Mullions",
      "Aluminum Composite Panel (ACP) Framing",
      "Interior Shopfront Divisions"
    ],
    features: [
      "Industry-standard partition profile geometry",
      "Designed for quick snap-fitting glass bead channels",
      "High structural rigidity for tall partition heights",
      "Compatible with standard door hinges and hardware"
    ],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/3.jpg.jpeg",
    profileType: "muslim"
  },
  {
    id: "euro-section",
    name: "EURO Section",
    category: "Aluminum Sections",
    isAluminumSection: true,
    shortDesc: "Premium European groove window profile system for modern acoustic and thermal window frames.",
    fullDesc: "The EURO Section represents advanced window and door profile technology featuring standardized Euro-groove hardware slots. Designed for high-performance architectural projects requiring superior sealing, multi-point locking hardware, and refined aesthetic lines.",
    applications: [
      "Casement & Tilt-and-Turn Windows",
      "High-End Residential Glazing",
      "Commercial Curtain Walls",
      "Acoustic Insulated Door Systems"
    ],
    features: [
      "Standard Euro-groove channel for multi-point lock compatibility",
      "Optimized multi-chamber thermal performance",
      "Superior acoustic insulation capabilities",
      "Sleek architectural design for luxury projects"
    ],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/6.jpg.jpeg",
    profileType: "euro"
  },

  // ----------------------------------------------------
  // ADDITIONAL CATALOG RANGE (PRESERVED & EXPANDED)
  // ----------------------------------------------------
  {
    id: "window-profiles",
    name: "Aluminium Window Profiles",
    category: "Door & Window Profiles",
    isAluminumSection: false,
    shortDesc: "Complete range of window section profiles for casement, sliding, and fixed glass window frames.",
    fullDesc: "Our Aluminium Window Profiles provide durable, weather-resistant structural solutions for residential buildings, office complexes, and industrial sites.",
    applications: ["Residential Window Frames", "Office Glass Windows", "Fixed Skylights"],
    features: ["Weather sealed", "Low maintenance", "High strength"],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/1.jpg.jpeg",
    profileType: "window"
  },
  {
    id: "door-window-profiles",
    name: "Aluminium Door & Window Profiles",
    category: "Door & Window Profiles",
    isAluminumSection: false,
    shortDesc: "Integrated profile systems for swing doors, sliding glass entrances, and architectural frames.",
    fullDesc: "High-grade aluminium door and window frame profiles built to handle daily commercial traffic and withstand elemental exposure.",
    applications: ["Commercial Entrances", "Balcony Doors", "Shopfront Frames"],
    features: ["Heavy-duty wall thickness", "Anodized surface finish", "Smooth hinge mounting"],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/2.jpg.jpeg",
    profileType: "door"
  },
  {
    id: "sliding-profiles",
    name: "Aluminium Sliding Profiles",
    category: "Door & Window Profiles",
    isAluminumSection: false,
    shortDesc: "2-track and 3-track sliding window systems with integrated mosquito mesh tracks.",
    fullDesc: "Versatile sliding profile kits engineered for modern balcony enclosures, patio doors, and office partitions.",
    applications: ["Balcony Enclosures", "Patio Sliding Doors", "Residential Windows"],
    features: ["Integrated mesh track", "Drainage weep holes", "Smooth glide track design"],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/5.jpg.jpeg",
    profileType: "runner"
  },
  {
    id: "hardware-fittings",
    name: "Aluminium Hardware Fittings",
    category: "Hardware Fittings",
    isAluminumSection: false,
    shortDesc: "Comprehensive collection of window handles, door hinges, sliding rollers, and friction stays.",
    fullDesc: "Premium hardware accessories and fittings designed specifically for seamless integration with aluminum doors, windows, and partitions.",
    applications: ["Door & Window Assembly", "Sliding Door Roller Repair", "Cabinet Fitting"],
    features: ["Precision mechanical movement", "Corrosion resistant coating", "Ergonomic designs"],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium & Stainless Steel",
    image: "product image box/6.jpg.jpeg",
    profileType: "hardware"
  },
  {
    id: "industrial-profiles",
    name: "Industrial Aluminium Profiles",
    category: "Aluminum Sections",
    isAluminumSection: false,
    shortDesc: "Heavy-duty T-slot and structural aluminum extrusions for machine frames and automation rigs.",
    fullDesc: "Modular structural aluminium profiles specified for industrial automation, conveyor frames, machine guards, and custom fabrication rigs.",
    applications: ["Machine Enclosures", "Conveyor Systems", "Workstation Assemblies"],
    features: ["Modular T-slot mounting", "High structural rigidity", "Standard T-nut compatibility"],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/7.jpg.jpeg",
    profileType: "squaretube"
  },
  {
    id: "aluminium-channels",
    name: "Aluminium Channels",
    category: "Aluminum Sections",
    isAluminumSection: false,
    shortDesc: "U-channel extrusions for edge protection, glass framing, and structural rail channels.",
    fullDesc: "Standard and custom U-channel aluminium sections suitable for perimeter framing, glass capping, and structural channel support.",
    applications: ["Glass Edge Protection", "Partition Base Channels", "Structural U-Rails"],
    features: ["Uniform channel dimensions", "Clean metallic surface", "Easy handling"],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium",
    image: "product image box/8.jpg.jpeg",
    profileType: "top"
  },
  {
    id: "kitchen-fittings",
    name: "Kitchen Storage Fittings",
    category: "Hardware Fittings",
    isAluminumSection: false,
    shortDesc: "Modular aluminum and stainless steel pull-out baskets, cabinet profiles, and hardware accessories.",
    fullDesc: "Modern modular kitchen accessories including profile handles, carcass edging, and pull-out storage solutions.",
    applications: ["Modular Kitchen Cabinets", "Drawer Profile Handles", "Pantry Storage Units"],
    features: ["Rust-proof construction", "Sleek modern aesthetics", "High load capacity"],
    specs: "Available specifications can be confirmed with our sales team.",
    material: "Aluminium & Steel",
    image: "product image box/6145209314604421810.jpg",
    profileType: "hardware"
  }
];

// Helper functions for easy data access
function getAllProducts() {
  return PRODUCTS_DATA;
}

function getProductById(id) {
  return PRODUCTS_DATA.find(p => p.id === id) || null;
}

function getAluminumSections() {
  return PRODUCTS_DATA.filter(p => p.isAluminumSection);
}

function getRelatedProducts(currentId, limit = 4) {
  const current = getProductById(currentId);
  if (!current) return PRODUCTS_DATA.slice(0, limit);
  return PRODUCTS_DATA
    .filter(p => p.id !== currentId && (p.category === current.category || p.isAluminumSection))
    .slice(0, limit);
}
