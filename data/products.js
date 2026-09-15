/**
 * Nematel — Product Data
 * ─────────────────────────────────────────────────────────────
 * Source: https://www.easycon.com.bd/ (category-wise scraped)
 * Images: Local copies in assets/images/products/ (downloaded from easycon.com.bd)
 *
 * HOW THIS WORKS:
 *  This file is loaded via <script src="data/products.js"> in every HTML page.
 *  It sets window.PRODUCT_DATA which api.js reads synchronously.
 *  This approach works with file://, http://, and https:// equally.
 *
 * TO SWITCH TO REAL API:
 *  Set ApiService.useMockData = false and update API_CONFIG.BASE_URL.
 *
 * TO REFRESH IMAGES:
 *  python scrape_category_images.py
 */

window.PRODUCT_DATA = {

  // ════════════════════════════════════════════════
  // CATEGORIES
  // ════════════════════════════════════════════════
  categories: [
    { id:1,  name:"Construction Chemical", slug:"construction-chemical", icon:"🧪", count:145, color:"#e84610", image: "assets/images/products/19aRAzgHrTkcwMLtSMmBrEfTPfgMWer7pNXRus3A.jpg",    description:"Waterproofing compounds, bonding agents, tile adhesives, sealants, admixtures & more" },
    { id:2,  name:"Cement & Aggregate",    slug:"cement-aggregate",      icon:"🏗️", count:89,  color:"#059669", image: "assets/images/products/J2TBDliSss2D6LNSAZCcBDpVQoy9cw69Q3TD6rKI.webp",  description:"OPC cement, PPC cement, white cement, sand, gravel & aggregates" },
    { id:3,  name:"TMT Steel Bar (Rod)",   slug:"tmt-steel-bar",         icon:"🔩", count:67,  color:"#0369a1", image: "assets/images/products/HEqckGvkBIgfTjhnxNqT6KUdSC2i5lYur9qoGYer.png",   description:"Grade 40 & 60 TMT steel bars/rods from top manufacturers" },
    { id:4,  name:"Bricks & Blocks",       slug:"bricks-blocks",         icon:"🧱", count:112, color:"#b45309", image: "assets/images/products/c9NCpjpVUW4boja915G6h26ILuTFabgbOCGc61X6.png",   description:"Ceramic bricks, AAC blocks, concrete blocks, paving bricks, roof tiles" },
    { id:5,  name:"Doors",                 slug:"doors",                 icon:"🚪", count:78,  color:"#7c3aed", image: "assets/images/products/injcZbMioRv81SGx6IUM6drTaZylSBwUqtiafgbo.jpg",    description:"PVC doors, UPVC doors, WPC doors, glass doors, teak wood doors" },
    { id:6,  name:"Door Fittings",         slug:"door-fittings",         icon:"🔑", count:234, color:"#c2410c", image: "assets/images/products/Vbi1dJV6ttmqwJMm2qHAFUnpPo51zujy6sHrzwcE.jpg",    description:"Door locks, digital locks, hinges, handles, closers, tower bolts" },
    { id:7,  name:"Electric Materials",    slug:"electric-materials",    icon:"⚡", count:389, color:"#ca8a04", image: "assets/images/products/t4p0hFcu6xuRgfJbdsOZLxS6OnQQad2kKGnZ9vev.jpg",   description:"PVC conduit, wires & cables, switches, sockets, LED lights, circuit breakers" },
    { id:8,  name:"Pipe & Fitting",        slug:"pipe-fitting",          icon:"🔧", count:156, color:"#0d9488", image: "assets/images/products/V9B13tnlCX8oIQYWa10OY7WZfJn1WqB4KLx7dSrb.jpg",    description:"PVC pipes, uPVC pipes, GI pipes, water tanks, pipe fittings, valves" },
    { id:9,  name:"Sanitary Ware",         slug:"sanitary-ware",         icon:"🚿", count:203, color:"#1d4ed8", image: "assets/images/products/nYcc0FVTKPWUbI27T2CgYedNYHFlst6iDIPGhQtO.png",description:"Commodes, wash basins, shower heads, bathtubs, faucets, taps" },
    { id:10, name:"Paint & Coating",       slug:"paint-coating",         icon:"🎨", count:167, color:"#a21caf", image: "assets/images/banner3.jpg",   description:"Exterior paint, interior paint, enamel paint, primer, wood polish" },
    { id:11, name:"Tiles & Flooring",      slug:"tiles-flooring",        icon:"🔲", count:298, color:"#15803d", image: "assets/images/products/HOWqPdeEfKvhJjhu6nKeCPLT8FL0QynbZLL2qZgX.jpg",    description:"Floor tiles, wall tiles, parking tiles, mosaic, granite, marble" },
    { id:12, name:"Safety Equipment",      slug:"safety-equipment",      icon:"⛑️", count:94,  color:"#be123c", image: "assets/images/banner4.jpg",  description:"Helmets, safety gloves, boots, vests, fall protection equipment" }
  ],

  // ════════════════════════════════════════════════
  // BRANDS
  // ════════════════════════════════════════════════
  brands: [
    { id:1,  name:"Sika Bangladesh",       slug:"sika",           featured:true,  logo: "assets/images/products/I7rD85I4RHLh6Ki6ICWE7po0ZeD2EMP5WBUOcBaz.webp" },
    { id:2,  name:"Dr. Fixit",             slug:"dr-fixit",       featured:true,  logo: "assets/images/products/ytC5Pxvo04I9YbJjZQOw1cZ7KmApU1pbgF2e7qSb.png" },
    { id:3,  name:"Fresh Cement",          slug:"fresh",          featured:true,  logo: "assets/images/products/IXZKRSh9zdPi6CFNnJJS1cDn3wKZaw8oOqDfdI5c.jpg" },
    { id:4,  name:"INSEE Cement",          slug:"insee",          featured:true,  logo: "assets/images/products/BlUW7c4qU2KAcm597Vo383VCSUYbAlLgJOMdjMop.jpg" },
    { id:5,  name:"Bashundhara",           slug:"bashundhara",    featured:true,  logo: "assets/images/products/prOWAbILV3O5GHMUTfH4xjYByR8WqIOYr1IfjFr5.jpg" },
    { id:6,  name:"Holcim",               slug:"holcim",          featured:true,  logo: "assets/images/products/J2TBDliSss2D6LNSAZCcBDpVQoy9cw69Q3TD6rKI.webp" },
    { id:7,  name:"Seven Rings Cement",    slug:"seven-rings",    featured:false, logo: "assets/images/products/d3YMylk3tw7FCkaLCBsV4hqkui3WLMb5SQKdy9nN.jpg" },
    { id:8,  name:"BSRM",                 slug:"bsrm",            featured:true,  logo: "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg" },
    { id:9,  name:"CSRM",                 slug:"csrm",            featured:true,  logo: "assets/images/products/oZGPAMQJILr80ByWNz0q2ahYAnsnFx78WURhdsIe.webp" },
    { id:10, name:"GPH Ispat",            slug:"gph-ispat",       featured:true,  logo: "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png" },
    { id:11, name:"Anwar Ispat",          slug:"anwar-ispat",     featured:false, logo: "assets/images/products/FeQK2acJSgD1D5eNLQWu2gy1vsRLFamcZmaeWWos.webp" },
    { id:12, name:"Eco Ceramics",         slug:"eco-ceramics",    featured:true,  logo: "assets/images/products/mipWNFwM0PT1NwZ2LvqvGot3kOb2F9DOyYvgV09L.png" },
    { id:13, name:"Mirpur Ceramics",      slug:"mirpur-ceramics", featured:true,  logo: "assets/images/products/ERSS1Wq095jVTeXRXliGH5hVzIHTFXS5PcEaJy7A.jpg" },
    { id:14, name:"Mostafa Door",         slug:"mostafa-door",    featured:true,  logo: "assets/images/products/PMHf8Bvin2T9pIWXgpBz2QowOe5qiza0TnLpcy3n.jpg" },
    { id:15, name:"AG (Anwar Galvanizing)",slug:"ag",             featured:true,  logo: "assets/images/products/nKnH7TyVxpeooyqOYP7ZilXet5ZvCzY6PKaAc8sU.jpg" },
    { id:16, name:"BRB",                  slug:"brb",             featured:true,  logo: "assets/images/products/t4p0hFcu6xuRgfJbdsOZLxS6OnQQad2kKGnZ9vev.jpg" },
    { id:17, name:"Asia Paint",           slug:"asia-paint",      featured:true,  logo: "assets/images/products/FJomzIBmrDOwtsgWEbBoT3X8JjapejblRFaZyPvG.jpg" },
    { id:18, name:"Berger Paints",        slug:"berger-paints",   featured:true,  logo: "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg" },
    { id:19, name:"Walton",              slug:"walton",            featured:true,  logo: "assets/images/products/nYcc0FVTKPWUbI27T2CgYedNYHFlst6iDIPGhQtO.png" },
    { id:20, name:"RFL",                 slug:"rfl",               featured:true,  logo: "assets/images/products/nYcc0FVTKPWUbI27T2CgYedNYHFlst6iDIPGhQtO.png" },
    { id:21, name:"UBC",                 slug:"ubc",               featured:false, logo: "assets/images/products/HOWqPdeEfKvhJjhu6nKeCPLT8FL0QynbZLL2qZgX.jpg" },
    { id:22, name:"Next (AAC Block)",    slug:"next",              featured:false, logo: "assets/images/products/gNE9xIfeRx35M2WMm8RKXufeaecpcfolBrMthRdn.jpg" }
  ],

  // ════════════════════════════════════════════════
  // PRODUCTS  (58 real Easycon.com.bd products)
  // ════════════════════════════════════════════════
  products: [

    /* ─────────── CONSTRUCTION CHEMICAL ─────────── */
    {
      id:1, name:"Dr. Fixit Pidiproof LW+ Waterproofing Compound",
      slug:"dr-fixit-pidiproof-lw-plus", category:"construction-chemical",
      brand:"Dr. Fixit", price:5200, originalPrice:5500, unit:"30 Litre",
      stock:85, rating:4.5, reviewCount:38, badge:"featured",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/ytC5Pxvo04I9YbJjZQOw1cZ7KmApU1pbgF2e7qSb.png", "assets/images/products/3CcSTGKIS997EyiF4gDMbI0rOHQetoGX17qhwGcd.png", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png"],
      description:"Dr. Fixit Pidiproof LW+ is a specially formulated integral liquid waterproofing compound. Composed of surface active plasticising agents, polymers & additives. Waterproofs concrete, prevents segregation. Dosage: 200 ml per 50 kg cement bag.",
      specifications:{ Packing:"30 Litre", Application:"Concrete & Mortar Waterproofing", Dosage:"200 ml/50 kg cement", Brand:"Dr. Fixit (Pidilite)" }
    },
    {
      id:2, name:"SikaCim® Pink Waterproofing Admixture (20 kg)",
      slug:"sika-cim-pink-20kg", category:"construction-chemical",
      brand:"Sika Bangladesh", price:5400, originalPrice:5600, unit:"20 Kg",
      stock:200, rating:4.3, reviewCount:22, badge:"new",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/19aRAzgHrTkcwMLtSMmBrEfTPfgMWer7pNXRus3A.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"SikaCim® Pink is a ready-to-use liquid waterproofing admixture for cement, mortar, and concrete. Pink colour indicator ensures accurate dosage. Reduces permeability and minimises cracks. Price: ৳270/kg.",
      specifications:{ Form:"Liquid", Color:"Pink", Packing:"20 Kg", "Price per Kg":"৳270", Applications:"Roof slabs, bathrooms, water tanks, foundations", Brand:"Sika Bangladesh" }
    },
    {
      id:3, name:"Sika Cim Waterproofing Compound",
      slug:"sika-cim", category:"construction-chemical",
      brand:"Sika Bangladesh", price:5000, originalPrice:5200, unit:"20 Kg Bucket",
      stock:120, rating:4.2, reviewCount:15, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/I7rD85I4RHLh6Ki6ICWE7po0ZeD2EMP5WBUOcBaz.webp", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png", "assets/images/products/B8IzSfLYbxZDOGrmzO6m2F56pfEb7BLSL0MEjPvo.webp"],
      description:"Sika Cim is a waterproofing admixture for concrete and mortar. Estimate Shipping Time: 5 Days.",
      specifications:{ Packing:"20 Kg Bucket", Type:"Waterproofing Admixture", Brand:"Sika Bangladesh" }
    },
    {
      id:4, name:"Dr. Fixit Pidifin 2K Waterproof Coating (15 kg)",
      slug:"dr-fixit-pidifin-2k-15kg", category:"construction-chemical",
      brand:"Dr. Fixit", price:3650, originalPrice:3900, unit:"15 Kg",
      stock:60, rating:4.4, reviewCount:27, badge:"sale",
      featured:false, flashSale:true, inStock:true,
      images:["assets/images/products/PZuEnM6lFQwfHoCpmylFYl78gq2grXTwHRxn3UEj.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png", "assets/images/products/B8IzSfLYbxZDOGrmzO6m2F56pfEb7BLSL0MEjPvo.webp"],
      description:"Dr. Fixit Pidifin 2K — acrylic cementitious, polymer modified elastomeric waterproofing coating. Elasticity up to 80%. Non-toxic, low VOC. For water tanks, basements, roof slabs.",
      specifications:{ Type:"Two-Component Waterproof Coating", Packing:"15 Kg", Elasticity:"Up to 80%", Brand:"Dr. Fixit (Pidilite)" }
    },
    {
      id:5, name:"SikaCeram-50 Tilofix Tile Adhesive (30 kg)",
      slug:"sika-tilofix-30kg", category:"construction-chemical",
      brand:"Sika Bangladesh", price:2700, originalPrice:2750, unit:"30 Kg Bag",
      stock:150, rating:4.1, reviewCount:19, badge:null,
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/PZuEnM6lFQwfHoCpmylFYl78gq2grXTwHRxn3UEj.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png", "assets/images/products/B8IzSfLYbxZDOGrmzO6m2F56pfEb7BLSL0MEjPvo.webp"],
      description:"SikaCeram-50 Tilofix — polymer modified cementitious tile adhesive. Type-1 C1T. Coverage 75–82 sqft per 30kg bag at 3mm thickness. Indoor use only. Just add water.",
      specifications:{ Type:"Tile Adhesive (C1T)", Packing:"30 Kg Bag", Coverage:"75–82 sqft/bag", Brand:"Sika Bangladesh" }
    },
    {
      id:6, name:"SikaGrout-214 BD Non-Shrink Grout (30 kg)",
      slug:"sikagrout-214-bd", category:"construction-chemical",
      brand:"Sika Bangladesh", price:1180, originalPrice:1200, unit:"30 Kg Bag",
      stock:75, rating:4.6, reviewCount:12, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/PZuEnM6lFQwfHoCpmylFYl78gq2grXTwHRxn3UEj.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png", "assets/images/products/B8IzSfLYbxZDOGrmzO6m2F56pfEb7BLSL0MEjPvo.webp"],
      description:"SikaGrout-214 BD — high-performance cement-based non-shrink precision grout. ASTM C1107 compliant. For machine foundations, anchor bolts, base plates.",
      specifications:{ Type:"Non-Shrink Precision Grout", Standard:"ASTM C1107", Packing:"30 Kg Bag", Appearance:"Grey Powder", Brand:"Sika Bangladesh" }
    },
    {
      id:7, name:"Epoxy Flooring (per sq ft)",
      slug:"epoxy-flooring", category:"construction-chemical",
      brand:"Sika Bangladesh", price:400, originalPrice:450, unit:"Per Square Feet",
      stock:96000, rating:4.0, reviewCount:8, badge:"sale",
      featured:false, flashSale:true, inStock:true,
      images:["assets/images/products/PXxjTDfYW1xpVaUu7la3rDByB1DqQTLmARy3nI6n.jpg", "assets/images/products/y3xxLLFtDBXCbDjdHKmgPc4vngF8ljf5BnRXeDLA.jpg", "assets/images/products/nl91krwrAGW4ltW4dsMJfSV9dgTCBil4DPqagk1M.jpg", "assets/images/products/gFhrrX3E5wMdjhNwbhHoG15izywRozyBSiXfmOUk.jpg"],
      description:"Epoxy flooring — synthetic resin floor system applied on concrete substrates. Used in industries, factories, houses. Full service from preparation to finishing. Estimate Shipping: 10 Days.",
      specifications:{ Coverage:"Per Square Feet", Shipping:"10 Days", Application:"Industrial, commercial, residential floors" }
    },
    {
      id:8, name:"Skim Coating (Fair Face Finish)",
      slug:"skim-coating", category:"construction-chemical",
      brand:"Sika Bangladesh", price:140, originalPrice:150, unit:"Per Square Feet",
      stock:500, rating:3.9, reviewCount:6, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/1xAfuiJpslulbWbe9HWvPN36CYSBnP6RAasPJWsy.jpg", "assets/images/products/ogKDMHfkqbzdQNrXniH0ln6dluTS5NzUyPsjocyg.jpg", "assets/images/products/3PmEW1R3vyNsxaHcrrTqk2B6JEyeLfvvDMvtqRlH.jpg", "assets/images/products/si8e3coEAhjj6XYmbdWzYmrrh930BzyKkI3bDN8y.jpg"],
      description:"Skim Coat — single component polymer modified cement based joint compound. Anti-algal, fast drying. Interior & exterior. Repairs cracks, pin holes, honeycombs. Shipping: 7 Days.",
      specifications:{ Type:"Polymer Modified Cement", Finish:"Smooth/Textured", Application:"Walls, ceilings (int. & ext.)" }
    },

    /* ─────────── CEMENT & AGGREGATE ─────────── */
    {
      id:9, name:"Fresh Ultra Strong Cement",
      slug:"fresh-ultra-strong-cement", category:"cement-aggregate",
      brand:"Fresh Cement", price:518, originalPrice:530, unit:"50 Kg Bag",
      stock:199700, rating:4.2, reviewCount:45, badge:null,
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/IXZKRSh9zdPi6CFNnJJS1cDn3wKZaw8oOqDfdI5c.jpg", "assets/images/products/sdhMibM9QTPX1yOSkjgk3qOxVoJwpfhnlyPbbITM.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg"],
      description:"Fresh Ultra Strong cement — supplied directly from factory ensuring fresh quality. Minimum order: 200 bags. Delivery inside Dhaka City. Required 24-72 hours after order confirmation.",
      specifications:{ Type:"OPC Portland Cement", "Net Weight":"50 Kg", "Min. Order":"200 Bags", Delivery:"Inside Dhaka City", Brand:"Fresh Cement" }
    },
    {
      id:10, name:"INSEE Cement (42.5N)",
      slug:"insee-cement", category:"cement-aggregate",
      brand:"INSEE Cement", price:535, originalPrice:540, unit:"50 Kg Bag",
      stock:0, rating:4.3, reviewCount:28, badge:null,
      featured:true, flashSale:false, inStock:false,
      images:["assets/images/products/BlUW7c4qU2KAcm597Vo383VCSUYbAlLgJOMdjMop.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"INSEE Cement — clinker 79%, strength 42.5N, gypsum 0-5%, net weight 50Kg. Factory direct supply. Min. order 200 bags. Dhaka City delivery only. 24-72h delivery time.",
      specifications:{ Strength:"42.5N", Clinker:"79%", Gypsum:"0–5%", "Net Weight":"50 Kg", "Min. Order":"200 Bags", Standard:"CEM II" }
    },
    {
      id:11, name:"Bashundhara Cement",
      slug:"bashundhara-cement", category:"cement-aggregate",
      brand:"Bashundhara", price:540, originalPrice:570, unit:"50 Kg Bag",
      stock:5000, rating:4.1, reviewCount:33, badge:"sale",
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/prOWAbILV3O5GHMUTfH4xjYByR8WqIOYr1IfjFr5.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png", "assets/images/products/B8IzSfLYbxZDOGrmzO6m2F56pfEb7BLSL0MEjPvo.webp"],
      description:"Bashundhara Cement — 5700 PSI, 50Kg. Factory direct. Price fluctuates, contact via WhatsApp for latest rate. Minimum order 200 bags. Delivers inside Dhaka City.",
      specifications:{ PSI:"5700", "Net Weight":"50 Kg", "Min. Order":"200 Bags", Delivery:"24-72h after payment", Brand:"Bashundhara Group" }
    },
    {
      id:12, name:"Holcim Cement (42.5N PCC)",
      slug:"holcim-cement", category:"cement-aggregate",
      brand:"Holcim", price:550, originalPrice:560, unit:"50 Kg Bag",
      stock:3000, rating:4.4, reviewCount:41, badge:null,
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/J2TBDliSss2D6LNSAZCcBDpVQoy9cw69Q3TD6rKI.webp", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png", "assets/images/products/B8IzSfLYbxZDOGrmzO6m2F56pfEb7BLSL0MEjPvo.webp"],
      description:"Holcim — higher strength, faster setting. BDS EN 197-1:2003, CEM II/B-M 42.5N standard. Clinker 65–79%, slag/fly ash 0–5%, limestone 21–35%. Min. order 200 bags.",
      specifications:{ Standard:"BDS EN 197-1:2003, CEM II/B-M 42.5N", Clinker:"65–79%", Limestone:"21–35%", "Net Weight":"50 Kg", "Min. Order":"200 Bags" }
    },
    {
      id:13, name:"Seven Rings Cement Gold",
      slug:"seven-rings-cement-gold", category:"cement-aggregate",
      brand:"Seven Rings Cement", price:555, originalPrice:560, unit:"50 Kg Bag",
      stock:2000, rating:4.0, reviewCount:16, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/d3YMylk3tw7FCkaLCBsV4hqkui3WLMb5SQKdy9nN.jpg", "assets/images/products/RmTdGkejoLjVAl6FtnleEJsZrkhVfE90xYbBl5zM.png", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg"],
      description:"Seven Rings Cement Gold — clinker 65–79%, slag/fly ash 0–5%, limestone 21–35%. Made in Bangladesh. Min. order 200 bags. Delivers inside Dhaka City.",
      specifications:{ Clinker:"65–79%", "Gypsum/Slag":"0–5%", Limestone:"21–35%", "Net Weight":"50 Kg", "Min. Order":"200 Bags", "Made In":"Bangladesh" }
    },
    {
      id:14, name:"Holcim Water Protect Cement",
      slug:"holcim-water-protect-cement", category:"cement-aggregate",
      brand:"Holcim", price:690, originalPrice:710, unit:"50 Kg Bag",
      stock:1500, rating:4.5, reviewCount:22, badge:"new",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/KGAswWRWzmrQ4g9IcikUVr4PDuUGPTgB1BjiYwCT.png", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"Holcim Water Protect Cement — special waterproofing cement for foundations, basements and water-retaining structures. Premium grade for demanding environments.",
      specifications:{ Type:"Waterproofing Portland Cement", "Net Weight":"50 Kg", Application:"Basements, foundations, water tanks" }
    },

    /* ─────────── TMT STEEL BAR ─────────── */
    {
      id:15, name:"BSRM Steel Rod (Grade 60)",
      slug:"bsrm-steel", category:"tmt-steel-bar",
      brand:"BSRM", price:95000, originalPrice:100000, unit:"Per Ton (MT)",
      stock:89900, rating:4.7, reviewCount:88, badge:"featured",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png", "assets/images/products/B8IzSfLYbxZDOGrmzO6m2F56pfEb7BLSL0MEjPvo.webp", "assets/images/products/MgFZ2rUfLfGlMfHGlr70TaBNLAgAGvE9YecdEgIk.jpg"],
      description:"BSRM — Bangladesh's leading steel manufacturer. Grade 60 & 40 TMT bars, 10mm–25mm diameter. Also manufactures ACSR core wire, LRPC, Mig Wire. Price fluctuates — confirm via WhatsApp.",
      specifications:{ Grade:"Grade 60 & 40", "Size (mm)":"10–25mm", Type:"TMT Round Bar", Usage:"RCC Construction", Brand:"BSRM" }
    },
    {
      id:16, name:"CSRM Steel Rod (Grade 60 & 40)",
      slug:"csrm-steel", category:"tmt-steel-bar",
      brand:"CSRM", price:88000, originalPrice:95000, unit:"Per Ton (MT)",
      stock:10000, rating:4.3, reviewCount:32, badge:"sale",
      featured:false, flashSale:true, inStock:true,
      images:["assets/images/products/oZGPAMQJILr80ByWNz0q2ahYAnsnFx78WURhdsIe.webp", "assets/images/products/4mJxA2DW7cv6YeufpckFLTWvVkN7p92N0hLCsLXU.webp", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg"],
      description:"CSRM (Chakda Steel Re-Rolling Mills) — Grade 60 & 40, 10–25mm sizes. Iron rod for construction. Estimate Shipping: 1 Day.",
      specifications:{ Grade:"Grade 60 & 40", "Size (mm)":"10–25mm", Length:"Custom", Shape:"Round", Shipping:"1 Day" }
    },
    {
      id:17, name:"GPH Ispat Quantum 500CWR Rebar",
      slug:"gph-ispat-steel", category:"tmt-steel-bar",
      brand:"GPH Ispat", price:90000, originalPrice:95000, unit:"Per Ton (MT)",
      stock:8000, rating:4.5, reviewCount:54, badge:null,
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png", "assets/images/products/2O81PaPWMHtMPMtcUEREhPcAmzXlqBGzWB9V5yH2.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/B8IzSfLYbxZDOGrmzO6m2F56pfEb7BLSL0MEjPvo.webp"],
      description:"GPH Ispat — Quantum 500CWR Rebar. Leading steel manufacturer, exported internationally. Billets and bars to international standards. Estimate Shipping: 2 Days.",
      specifications:{ Grade:"500 CWR", Standard:"National & International", Type:"Structural TMT Bar", Shipping:"2 Days" }
    },
    {
      id:18, name:"Anwar Ispat Steel Rod",
      slug:"anwar-ispat-steel", category:"tmt-steel-bar",
      brand:"Anwar Ispat", price:85000, originalPrice:88000, unit:"Per Ton (MT)",
      stock:10000, rating:4.0, reviewCount:18, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/FeQK2acJSgD1D5eNLQWu2gy1vsRLFamcZmaeWWos.webp", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"Anwar Ispat steel rod. Price fluctuates — contact for latest rate. Standard sizes available.",
      specifications:{ Type:"Iron Rod", Grade:"60, 40", Brand:"Anwar Ispat" }
    },

    /* ─────────── BRICKS & BLOCKS ─────────── */
    {
      id:19, name:"Eco Ceramics Ceramic Brick",
      slug:"eco-ceramics-ceramic-brick", category:"bricks-blocks",
      brand:"Eco Ceramics", price:17, originalPrice:17.5, unit:"Per Piece",
      stock:100000, rating:4.3, reviewCount:67, badge:"featured",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/mipWNFwM0PT1NwZ2LvqvGot3kOb2F9DOyYvgV09L.png", "assets/images/products/YhzOvtxvFasxSlIPpDs17cYZFbx4xOILzsRgUnSP.png", "assets/images/products/bDWQ8HLBK6P0fMbMyxxwj4sKUXL3yQXmvn6I4RQy.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg"],
      description:"Premium ceramic bricks from refined clay fired at high temperatures. Excellent moisture, fire and corrosion resistance. Ideal for walls, facades, pavements. Estimate Shipping: 3 Days.",
      specifications:{ Brand:"Eco Ceramics", Material:"Refined Clay", Properties:"Moisture resistant, Fire resistant, Durable", Applications:"Walls, facades, pavements, decorative" }
    },
    {
      id:20, name:"EcoCil Ceramic Brick",
      slug:"ecocil-ceramic-brick", category:"bricks-blocks",
      brand:"Eco Ceramics", price:16.5, originalPrice:17, unit:"Per Piece",
      stock:50000, rating:4.1, reviewCount:23, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/LwdpVpqSQcx2IGXgF7TFEWTwSeJnmnzmFW92x9kB.png", "assets/images/products/qmets4N9j85Z0JzT9U8zpTqoIyZhvEHyGRtTrLay.jpg", "assets/images/products/bDWQ8HLBK6P0fMbMyxxwj4sKUXL3yQXmvn6I4RQy.jpg"],
      description:"EcoCil Ceramic Brick — quality building material. Standard sizes. Sold by ECL, Kushtia.",
      specifications:{ Brand:"Eco Ceramics (EcoCil)", Material:"Ceramic Clay", Application:"Wall construction" }
    },
    {
      id:21, name:"Easycon Block AAC (600×200×110 mm)",
      slug:"easycon-block-aac", category:"bricks-blocks",
      brand:"Easycon Block", price:85, originalPrice:86, unit:"Per Piece",
      stock:10000, rating:4.4, reviewCount:31, badge:"new",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/whABojWdv1Bx2d9j6rdPXS2QJkVLx8lwZJWu8GAR.jpg", "assets/images/products/CcD4bsWtcsC05stXHwyBwHsd8H2XzbDL0bkKfujQ.jpg", "assets/images/products/IAeBlc209yBCmEeTzBhabs1ZbitUTEP3GrbGXTVl.jpg", "assets/images/products/uVkvNRVR64Ndfn85Uocmha5s3V88sGCeLTW27CW1.jpg"],
      description:"EasyCon AAC Block — Lightweight, Strong, Eco-Friendly. From fly ash, cement, lime, aluminum powder. 3× lighter than clay bricks. Fire resistant up to 4 hours. Size: 600×200×110 mm. Shipping: 7 Days.",
      specifications:{ Size:"600×200×110 mm", Type:"AAC Autoclaved Aerated Concrete", Properties:"Lightweight, Fire Resistant, Thermal Insulation, Soundproof", Applications:"Walls, partitions, infill panels", "Made In":"Bangladesh" }
    },
    {
      id:22, name:"Next AAC Block (600×200×110 mm)",
      slug:"next-aac-block", category:"bricks-blocks",
      brand:"Next (AAC Block)", price:91, originalPrice:92, unit:"Per Piece",
      stock:8000, rating:4.2, reviewCount:19, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/gNE9xIfeRx35M2WMm8RKXufeaecpcfolBrMthRdn.jpg", "assets/images/products/zB6lvyG0UaYv8Uc2Ygc2fRBw1T9GM9JgNdEG9a8O.jpg", "assets/images/products/TcLpE2QZok965HgElEla24RAcJd0bj0I7rrGW531.jpg", "assets/images/products/UG0VFINQnkfPuEpidfnLcCH9pYqdNtq9f3m1VNZq.jpg"],
      description:"Next AAC Block — Autoclaved Aerated Concrete. Lightweight, precision cut. Faster construction with less mortar. Eco-friendly. Estimate Shipping: 3 Days.",
      specifications:{ Size:"600×200×110 mm", Type:"AAC Block", Brand:"Next" }
    },
    {
      id:23, name:"Solid Concrete Bricks / Block",
      slug:"solid-concrete-bricks", category:"bricks-blocks",
      brand:"Eco Ceramics", price:12.5, originalPrice:13, unit:"Per Piece",
      stock:20000, rating:3.9, reviewCount:14, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg", "assets/images/products/jU06whnGLdJX6qHJKl4l15OmASoPTEvKK2jf6R8L.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg"],
      description:"Solid concrete bricks and blocks for general construction use.",
      specifications:{ Material:"Concrete", Type:"Solid Block", Application:"Wall construction" }
    },
    {
      id:24, name:"UBC Parking Tiles (12×12 inch, 3/4\" thick)",
      slug:"ubc-parking-tiles", category:"bricks-blocks",
      brand:"UBC", price:38, originalPrice:41, unit:"Per Square Feet",
      stock:500000, rating:4.0, reviewCount:42, badge:"sale",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/HOWqPdeEfKvhJjhu6nKeCPLT8FL0QynbZLL2qZgX.jpg", "assets/images/products/Ktbnb5MLKVwfLFXIGOHtcHRNvsjrA2cyJwYfKHv9.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png"],
      description:"UBC Parking Tiles — machine produced, 12×12 inch, 3/4\" thick. Used in parking lots, pavement, basement, roof-top, sidewalk. Made from sand, aggregate, cement & chemicals. Shipping: 3 Days.",
      specifications:{ Size:"12×12 inch", Thickness:"3/4 inch", Material:"Concrete (Machine Production)", Applications:"Parking, pavement, sidewalk, basement, roof-top" }
    },
    {
      id:25, name:"Roof Tile Brick (8×8 inch, Red)",
      slug:"roof-tile-brick", category:"bricks-blocks",
      brand:"Mirpur Ceramics", price:28, originalPrice:29, unit:"Per Piece",
      stock:50000, rating:4.1, reviewCount:11, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/42GsIzqXWeAQBLnoieN1BpIb7MX9UoWdKRJ0KguN.jpg", "assets/images/products/lX0Ko3spjI6U2oVafxvx7lIo38tTN3P0U26y7ds2.jpg", "assets/images/products/qAmEnSmcQ00U8E66eQWPObtUN1sWLhas8U4Y5gAo.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg"],
      description:"8×8 inch red roof tile for exterior roofing. Ideal for schools, institutional buildings, public structures. High-strength clay/concrete. Resists cracking, fading, wear. Shipping: 3 Days.",
      specifications:{ Size:"8×8 inch", Color:"Red", Material:"High-strength Clay/Concrete", Application:"Exterior roofing" }
    },

    /* ─────────── DOORS ─────────── */
    {
      id:26, name:"Mostafa PVC Bathroom Door (7×2.5 ft)",
      slug:"mostafa-pvc-door", category:"doors",
      brand:"Mostafa Door", price:5555, originalPrice:6000, unit:"Per Piece",
      stock:500, rating:4.2, reviewCount:56, badge:"sale",
      featured:true, flashSale:true, inStock:true,
      images:["assets/images/products/PMHf8Bvin2T9pIWXgpBz2QowOe5qiza0TnLpcy3n.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png", "assets/images/products/B8IzSfLYbxZDOGrmzO6m2F56pfEb7BLSL0MEjPvo.webp"],
      description:"Mostafa PVC Bathroom Door — waterproof & termite-proof. High-quality PVC, 7ft×2.5ft. Lightweight, easy to install. Multiple colours. Low maintenance. Perfect for bathrooms, toilets, indoor areas.",
      specifications:{ Brand:"Mostafa Door", Material:"PVC (Polyvinyl Chloride)", Size:"7 ft × 2.5 ft", Properties:"Waterproof, Termite-proof, Lightweight" }
    },
    {
      id:27, name:"Mostafa UPVC Door (7×2.5 ft)",
      slug:"mostafa-upvc-door", category:"doors",
      brand:"Mostafa Door", price:5300, originalPrice:6100, unit:"Per Piece",
      stock:300, rating:4.1, reviewCount:29, badge:"sale",
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/PMHf8Bvin2T9pIWXgpBz2QowOe5qiza0TnLpcy3n.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png", "assets/images/products/B8IzSfLYbxZDOGrmzO6m2F56pfEb7BLSL0MEjPvo.webp"],
      description:"Mostafa UPVC Door — unplasticised PVC. Resistant to moisture, corrosion, extreme temperatures. Ideal for bathrooms and indoor areas.",
      specifications:{ Material:"UPVC (Unplasticised PVC)", Size:"7 ft × 2.5 ft", Properties:"Waterproof, Corrosion-resistant" }
    },
    {
      id:28, name:"PD Glass Door — Aluminum Frame (7×2.5 ft)",
      slug:"pd-glass-door", category:"doors",
      brand:"Mostafa Door", price:11499, originalPrice:12000, unit:"Per Piece",
      stock:1000, rating:4.5, reviewCount:37, badge:"featured",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/ley967Yzr1DTG2iccvZZtaRjOccv2sXzvNLKvAhR.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png", "assets/images/products/B8IzSfLYbxZDOGrmzO6m2F56pfEb7BLSL0MEjPvo.webp"],
      description:"PD Glass Door — aluminum frame, double side tempered glass. Regular size 7×2.5 ft. 50-year guarantee. Allows natural light. Custom modifications on request. Shipping: 5 Days.",
      specifications:{ Frame:"Aluminum", Glass:"Double Side Tempered", Size:"7×2.5 ft (Regular)", Guarantee:"50 Years", Shipping:"5 Days" }
    },
    {
      id:29, name:"WPC Green Eco Door (7×3 ft)",
      slug:"wpc-green-eco-door", category:"doors",
      brand:"Mostafa Door", price:13500, originalPrice:15000, unit:"Per Piece",
      stock:200, rating:4.3, reviewCount:14, badge:"new",
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/TDYJRR8YUcWnZbPUarJXJQHk1wxEakzwr87HzU12.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png", "assets/images/products/B8IzSfLYbxZDOGrmzO6m2F56pfEb7BLSL0MEjPvo.webp"],
      description:"WPC (Wood Plastic Composite) Green Eco Door — eco-friendly, waterproof, termite-proof, fire-resistant. Modern design with wood texture appearance. Ideal for main entrance and bedrooms.",
      specifications:{ Material:"WPC (Wood Plastic Composite)", Size:"7×3 ft", Properties:"Waterproof, Termite-proof, Fire-resistant, Eco-friendly" }
    },

    /* ─────────── DOOR FITTINGS ─────────── */
    {
      id:30, name:"Digital Smart Door Lock (Fingerprint + App)",
      slug:"digital-door-lock", category:"door-fittings",
      brand:"AG (Anwar Galvanizing)", price:16999, originalPrice:20000, unit:"Per Piece",
      stock:150, rating:4.6, reviewCount:72, badge:"hot",
      featured:true, flashSale:true, inStock:true,
      images:["assets/images/products/Vbi1dJV6ttmqwJMm2qHAFUnpPo51zujy6sHrzwcE.jpg", "assets/images/products/FJomzIBmrDOwtsgWEbBoT3X8JjapejblRFaZyPvG.jpg", "assets/images/products/Px7K0jx92HmNTS2hk3KbnhdtgehW8v5crsf2gM6D.jpg", "assets/images/products/4wLUfhk914oKf0sWEQtrEdxe1IsWVe0XikUIchCU.jpg"],
      description:"Smart Door Lock — fingerprint recognition, passcode, mobile app control, RFID card access. Auto-Lock & Intrusion Alarm. Long battery life. Easy installation on most standard doors.",
      specifications:{ Unlocking:"Fingerprint, PIN, App, RFID, Key", Features:"Auto-Lock, Intrusion Alarm, Remote Unlock", Battery:"Long life, low-power alert" }
    },
    {
      id:31, name:"AG 2\" GI Plug (Galvanized Iron)",
      slug:"ag-2inch-gi-plug", category:"door-fittings",
      brand:"AG (Anwar Galvanizing)", price:68.64, originalPrice:78, unit:"Per Piece",
      stock:500, rating:4.0, reviewCount:8, badge:"sale",
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/nKnH7TyVxpeooyqOYP7ZilXet5ZvCzY6PKaAc8sU.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"AG 2 inch GI (Galvanized Iron) plug for pipe fittings. Quality product from Anwar Galvanizing Ltd.",
      specifications:{ Size:"2 inch", Material:"GI (Galvanized Iron)", Brand:"AG (Anwar Galvanizing Ltd.)" }
    },
    {
      id:32, name:"5\" Door Clam (Heavy Duty)",
      slug:"5inch-door-clam", category:"door-fittings",
      brand:"AG (Anwar Galvanizing)", price:185, originalPrice:210, unit:"Per Piece",
      stock:300, rating:4.1, reviewCount:11, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/p1yKViqmT6yvdTZOhyd4xkWoojX1tR49aZWCBJ0n.png", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"5-inch heavy duty door clam/clamp for securing doors. Durable and corrosion-resistant.",
      specifications:{ Size:"5 inch", Material:"Steel", Brand:"AG" }
    },

    /* ─────────── ELECTRIC MATERIALS ─────────── */
    {
      id:33, name:"BRB Cable 1×4.0 RM (Single Core)",
      slug:"brb-cable-1x4-rm", category:"electric-materials",
      brand:"BRB", price:9466, originalPrice:9562, unit:"Per Roll",
      stock:200, rating:4.5, reviewCount:44, badge:null,
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/t4p0hFcu6xuRgfJbdsOZLxS6OnQQad2kKGnZ9vev.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"BRB Cable 1×4.0 RM — single core PVC insulated, BYA FR skin coated. Heavy-duty electrical cable. BRB brand ensures reliability and safety.",
      specifications:{ Core:"Single Core", Size:"1×4.0 RM", Insulation:"PVC", Coating:"BYA FR Skin", Brand:"BRB" }
    },
    {
      id:34, name:"BRB Green Cable 1×1.5RE (Single Wire)",
      slug:"brb-green-cable-1x1-5", category:"electric-materials",
      brand:"BRB", price:3684, originalPrice:3721, unit:"Per Roll",
      stock:350, rating:4.3, reviewCount:31, badge:null,
      featured:true, flashSale:true, inStock:true,
      images:["assets/images/products/NTLY1MTEeIeYnqOZNAp6s4aONbMGFMbIj4rtDojZ.jpg", "assets/images/products/XUOBTnMPuIa3kyerQ1QXpbG8B8x6trsbZOT0ghM3.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg"],
      description:"BRB Green Cable 1×1.5RE — single wire, BYA FR Skin Coated, Single Core PVC Insulated. Ideal for household and light commercial wiring.",
      specifications:{ Core:"Single Core", Size:"1×1.5 RE", Insulation:"PVC", Coating:"BYA FR Skin", Color:"Green", Brand:"BRB" }
    },
    {
      id:35, name:"BRB BYA Cable 1×3.0 Rm (7-Wire)",
      slug:"brb-cable-1x3-rm", category:"electric-materials",
      brand:"BRB", price:7324, originalPrice:7398, unit:"Per Roll",
      stock:180, rating:4.4, reviewCount:27, badge:"sale",
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/t4p0hFcu6xuRgfJbdsOZLxS6OnQQad2kKGnZ9vev.jpg", "assets/images/products/NTLY1MTEeIeYnqOZNAp6s4aONbMGFMbIj4rtDojZ.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg"],
      description:"BRB BYA 1 Core Cable 1×3.0 Rm — 7-wire (7/22) configuration. BYA FR Skin Coated. Suitable for higher load applications.",
      specifications:{ Core:"Single Core", Size:"1×3.0 Rm", Configuration:"7-Wire (7/22)", Insulation:"PVC", Coating:"BYA FR Skin", Brand:"BRB" }
    },
    {
      id:36, name:"BRB Red Cable 1×7.0 RM (Heavy Duty)",
      slug:"brb-red-cable-1x7-rm", category:"electric-materials",
      brand:"BRB", price:16316, originalPrice:16481, unit:"Per Roll",
      stock:80, rating:4.6, reviewCount:19, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/FadrQAQBIvRhbWDmWlDVYPV1z7gLCBPGt1X6Hxb0.jpg", "assets/images/products/t4p0hFcu6xuRgfJbdsOZLxS6OnQQad2kKGnZ9vev.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg"],
      description:"BRB Red Cable 1×7.0 RM — 7-wire BYA FR Skin Coated. Heavy-duty industrial/commercial electrical cable.",
      specifications:{ Core:"Single Core", Size:"1×7.0 RM", Configuration:"7-Wire", Coating:"BYA FR Skin", Color:"Red", Brand:"BRB" }
    },

    /* ─────────── PIPE & FITTING ─────────── */
    {
      id:37, name:"BRB 4\" Pipe (110mm, 2.7mm thick)",
      slug:"brb-4inch-pipe-27mm", category:"pipe-fitting",
      brand:"BRB", price:1850, originalPrice:1950, unit:"Per Piece",
      stock:6, rating:4.4, reviewCount:33, badge:"featured",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/x0dQ0WyFTX5oj7qbJaHjPhoYGxDhSO2ViI1GXf2F.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"BRB 4\" Pipe — 110mm diameter, 2.7mm wall thickness. Premium uPVC pipe for drainage and plumbing. Sold by ECL, Kushtia.",
      specifications:{ Diameter:"4 inch (110 mm)", "Wall Thickness":"2.7 mm", Material:"uPVC", Brand:"BRB" }
    },
    {
      id:38, name:"BRB 4\" Pipe 110mm (2.00-2.10mm)",
      slug:"brb-4inch-pipe-110mm", category:"pipe-fitting",
      brand:"BRB", price:1047, originalPrice:1262, unit:"Per Piece",
      stock:120, rating:4.2, reviewCount:21, badge:"sale",
      featured:false, flashSale:true, inStock:true,
      images:["assets/images/products/x0dQ0WyFTX5oj7qbJaHjPhoYGxDhSO2ViI1GXf2F.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"BRB 4\" Pipe 110mm — Bs pipe 2.00-2.10mm wall thickness. Budget-friendly for plumbing and drainage.",
      specifications:{ Diameter:"4 inch (110 mm)", "Wall Thickness":"2.00–2.10 mm", Material:"uPVC", Brand:"BRB" }
    },
    {
      id:39, name:"BRB 6\" Pipe (3.00-3.10mm thick)",
      slug:"brb-6inch-pipe-3mm", category:"pipe-fitting",
      brand:"BRB", price:2366, originalPrice:2850, unit:"Per Piece",
      stock:50, rating:4.3, reviewCount:15, badge:"sale",
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/x0dQ0WyFTX5oj7qbJaHjPhoYGxDhSO2ViI1GXf2F.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"BRB 6\" Pipe — Bs pipe 3.00-3.10mm wall thickness. For heavy-duty drainage and large-diameter plumbing.",
      specifications:{ Diameter:"6 inch", "Wall Thickness":"3.00–3.10 mm", Material:"uPVC", Brand:"BRB" }
    },
    {
      id:40, name:"BRB TS Pipe 3/4\" (3.70mm)",
      slug:"brb-ts-pipe-3-4inch", category:"pipe-fitting",
      brand:"BRB", price:220, originalPrice:259, unit:"Per Piece",
      stock:500, rating:4.1, reviewCount:27, badge:"sale",
      featured:false, flashSale:true, inStock:true,
      images:["assets/images/products/V9B13tnlCX8oIQYWa10OY7WZfJn1WqB4KLx7dSrb.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"BRB TS Pipe 3/4\" — 3.70mm wall, 380mm specification. Premium thread socket pipe for water supply.",
      specifications:{ Size:"3/4 inch", "Wall Thickness":"3.70 mm", Material:"uPVC", Brand:"BRB" }
    },
    {
      id:41, name:"BRB TS Pipe 1/2\" (3.70mm)",
      slug:"brb-ts-pipe-1-2inch", category:"pipe-fitting",
      brand:"BRB", price:175, originalPrice:208, unit:"Per Piece",
      stock:600, rating:4.0, reviewCount:19, badge:"sale",
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/V9B13tnlCX8oIQYWa10OY7WZfJn1WqB4KLx7dSrb.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"BRB TS Pipe 1/2\" — 3.70mm wall specification. Ideal for household water supply.",
      specifications:{ Size:"1/2 inch", Material:"uPVC", Brand:"BRB" }
    },
    {
      id:42, name:"M Seal Solvent Cement (Pipe Glue)",
      slug:"m-seal-solvent-cement", category:"pipe-fitting",
      brand:"RFL", price:165, originalPrice:180, unit:"Per Tin",
      stock:400, rating:4.2, reviewCount:34, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/YGl3DaaMkbCCc5mCQbKNrWOc770S1pU3Nwvr9B2A.jpg", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg", "assets/images/products/oAkYPfAaIP4tLQuuUJLbNCEQFsUZmD08jp7UAddN.jpg", "assets/images/products/KPWFy0gY4bXxSaQZa6cEgEthjpjYRCv41igUelqC.jpg"],
      description:"M Seal Solvent Cement for joining PVC and uPVC pipes. Creates a strong, leak-proof bond.",
      specifications:{ Use:"PVC/uPVC pipe joining", Type:"Solvent Cement", Brand:"M Seal" }
    },

    /* ─────────── SANITARY WARE ─────────── */
    {
      id:43, name:"Walton One-Piece Wall-Hung Commode",
      slug:"walton-wall-hung-commode", category:"sanitary-ware",
      brand:"Walton", price:8500, originalPrice:9500, unit:"Per Piece",
      stock:80, rating:4.4, reviewCount:48, badge:"featured",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/nYcc0FVTKPWUbI27T2CgYedNYHFlst6iDIPGhQtO.png", "assets/images/products/r4u9LK4s5W5460xoLkBvA5rbjHG45s59XuTzbYkN.png", "assets/images/products/xOzrIMVSMvrbeA72PqbjxYiLXh3GB6kYPMfi36MN.png", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg"],
      description:"Walton modern one-piece wall-hung commode with concealed cistern. Water-saving dual flush. Easy to clean hygienic design. Standard bathroom plumbing compatible.",
      specifications:{ Type:"One-Piece Wall-Hung", Flush:"Dual Flush", Color:"White", Brand:"Walton" }
    },
    {
      id:44, name:"RFL Wash Basin (Pedestal, White)",
      slug:"rfl-wash-basin-pedestal", category:"sanitary-ware",
      brand:"RFL", price:3800, originalPrice:4200, unit:"Per Piece",
      stock:120, rating:4.2, reviewCount:35, badge:"sale",
      featured:true, flashSale:true, inStock:true,
      images:["assets/images/products/nYcc0FVTKPWUbI27T2CgYedNYHFlst6iDIPGhQtO.png", "assets/images/products/r4u9LK4s5W5460xoLkBvA5rbjHG45s59XuTzbYkN.png", "assets/images/products/xOzrIMVSMvrbeA72PqbjxYiLXh3GB6kYPMfi36MN.png", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg"],
      description:"RFL ceramic pedestal wash basin. High-gloss white finish. Overflow hole included. Compatible with standard wall and pedestal fittings.",
      specifications:{ Type:"Pedestal Wash Basin", Material:"Vitreous China Ceramic", Color:"White Glossy", Brand:"RFL" }
    },
    {
      id:45, name:"RFL Single Lever Basin Mixer Tap (Chrome)",
      slug:"rfl-basin-mixer-tap", category:"sanitary-ware",
      brand:"RFL", price:1850, originalPrice:2100, unit:"Per Piece",
      stock:200, rating:4.1, reviewCount:29, badge:"sale",
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/nYcc0FVTKPWUbI27T2CgYedNYHFlst6iDIPGhQtO.png", "assets/images/products/r4u9LK4s5W5460xoLkBvA5rbjHG45s59XuTzbYkN.png", "assets/images/products/xOzrIMVSMvrbeA72PqbjxYiLXh3GB6kYPMfi36MN.png", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg"],
      description:"RFL single lever basin mixer faucet — chrome finish. Hot & cold mixing. Ceramic disc cartridge for longevity. Easy installation.",
      specifications:{ Type:"Single Lever Mixer", Finish:"Chrome", Cartridge:"Ceramic Disc", Brand:"RFL" }
    },
    {
      id:46, name:"Walton Overhead Rain Shower Head (8 inch)",
      slug:"walton-rain-shower", category:"sanitary-ware",
      brand:"Walton", price:2200, originalPrice:2500, unit:"Per Piece",
      stock:90, rating:4.3, reviewCount:22, badge:"new",
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/nYcc0FVTKPWUbI27T2CgYedNYHFlst6iDIPGhQtO.png", "assets/images/products/r4u9LK4s5W5460xoLkBvA5rbjHG45s59XuTzbYkN.png", "assets/images/products/xOzrIMVSMvrbeA72PqbjxYiLXh3GB6kYPMfi36MN.png", "assets/images/products/LvCPrkQRxBeLGwdKTKkCpQoQyJFedFY4Bj0RPuoC.jpg"],
      description:"Walton 8-inch overhead rain shower head. Rainfall effect. Stainless steel finish. Self-cleaning nozzles. Easy to install on standard shower arms.",
      specifications:{ Size:"8 inch", Material:"Stainless Steel", Effect:"Rainfall", Nozzles:"Self-cleaning", Brand:"Walton" }
    },

    /* ─────────── PAINT & COATING ─────────── */
    {
      id:47, name:"Berger Luxury Silk Interior Emulsion (4L)",
      slug:"berger-luxury-silk-4l", category:"paint-coating",
      brand:"Berger Paints", price:2300, originalPrice:2500, unit:"4 Litre Tin",
      stock:300, rating:4.5, reviewCount:82, badge:"featured",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/banner3.jpg", "assets/images/products/PXxjTDfYW1xpVaUu7la3rDByB1DqQTLmARy3nI6n.jpg"],
      description:"Berger Luxury Silk — premium interior emulsion. Silky smooth finish. Excellent washability. Low VOC. Covers 50–55 sqm per 4L. 1000+ shades available.",
      specifications:{ Type:"Interior Emulsion", Finish:"Silk (Semi-Sheen)", Coverage:"50–55 sqm/4L", VOC:"Low", Shades:"1000+ (tintable)", Brand:"Berger Paints" }
    },
    {
      id:48, name:"Asia Paint Exterior Emulsion (4L)",
      slug:"asia-paint-exterior-4l", category:"paint-coating",
      brand:"Asia Paint", price:2650, originalPrice:2900, unit:"4 Litre Tin",
      stock:250, rating:4.4, reviewCount:61, badge:"sale",
      featured:true, flashSale:true, inStock:true,
      images:["assets/images/banner3.jpg", "assets/images/products/PXxjTDfYW1xpVaUu7la3rDByB1DqQTLmARy3nI6n.jpg"],
      description:"Asia Paint Exterior Emulsion — durable weather-resistant exterior paint. Protects against rain, UV, mildew and efflorescence. Vibrant colour. Coverage 35–40 sqm per 4L.",
      specifications:{ Type:"Exterior Emulsion", Finish:"Matt", Coverage:"35–40 sqm/4L", Properties:"Weather-resistant, UV-proof, Anti-mildew", Brand:"Asia Paint" }
    },
    {
      id:49, name:"Berger Weather Coat All Guard (4L)",
      slug:"berger-weather-coat-4l", category:"paint-coating",
      brand:"Berger Paints", price:3100, originalPrice:3400, unit:"4 Litre Tin",
      stock:180, rating:4.6, reviewCount:53, badge:"hot",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/banner3.jpg", "assets/images/products/PXxjTDfYW1xpVaUu7la3rDByB1DqQTLmARy3nI6n.jpg"],
      description:"Berger Weather Coat All Guard — 7-year guarantee exterior masonry paint. Bridges hairline cracks. Anti-algal, anti-fungal. Water-based, low VOC.",
      specifications:{ Type:"Exterior Masonry", Guarantee:"7 Years", Coverage:"30–35 sqm/4L", Properties:"Crack bridging, Anti-algal, Anti-fungal", Brand:"Berger Paints" }
    },
    {
      id:50, name:"Asia Paint Wood Primer (1L)",
      slug:"asia-paint-wood-primer-1l", category:"paint-coating",
      brand:"Asia Paint", price:450, originalPrice:500, unit:"1 Litre",
      stock:400, rating:4.2, reviewCount:29, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/banner3.jpg", "assets/images/products/PXxjTDfYW1xpVaUu7la3rDByB1DqQTLmARy3nI6n.jpg"],
      description:"Asia Paint Wood Primer — excellent adhesion on wood. Seals wood grain. Prevents peeling. Suitable base coat before enamel or wood paint.",
      specifications:{ Type:"Wood Primer", Base:"Alkyd", Volume:"1 Litre", Application:"Wood, plywood, MDF", Brand:"Asia Paint" }
    },

    /* ─────────── TILES & FLOORING ─────────── */
    {
      id:51, name:"Mirpur Ceramics Floor Tile (60×60 cm)",
      slug:"mirpur-ceramics-floor-60x60", category:"tiles-flooring",
      brand:"Mirpur Ceramics", price:1850, originalPrice:2100, unit:"Per Box (4 pcs ≈ 1.44 sqm)",
      stock:500, rating:4.3, reviewCount:74, badge:"featured",
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/products/ERSS1Wq095jVTeXRXliGH5hVzIHTFXS5PcEaJy7A.jpg", "assets/images/products/hvGdv2QKYQqn308goPcG9P4if2y81vjO90KThXu6.png", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png"],
      description:"Mirpur Ceramics 60×60 cm floor tile — high-gloss ceramic. Stain-resistant, scratch-resistant. Suitable for living rooms, corridors, commercial spaces.",
      specifications:{ Size:"60×60 cm", Finish:"High Gloss", Coverage:"~1.44 sqm/box (4 pcs)", Application:"Floor, indoor", Brand:"Mirpur Ceramics" }
    },
    {
      id:52, name:"Eco Ceramics Wall Tile (30×60 cm)",
      slug:"eco-ceramics-wall-30x60", category:"tiles-flooring",
      brand:"Eco Ceramics", price:1350, originalPrice:1500, unit:"Per Box (6 pcs ≈ 1.08 sqm)",
      stock:600, rating:4.2, reviewCount:58, badge:"sale",
      featured:true, flashSale:true, inStock:true,
      images:["assets/images/products/mipWNFwM0PT1NwZ2LvqvGot3kOb2F9DOyYvgV09L.png", "assets/images/products/YhzOvtxvFasxSlIPpDs17cYZFbx4xOILzsRgUnSP.png", "assets/images/products/bDWQ8HLBK6P0fMbMyxxwj4sKUXL3yQXmvn6I4RQy.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg"],
      description:"Eco Ceramics 30×60 cm wall tile — smooth glossy finish. Kitchen backsplash, bathroom walls. Easy to clean. Water-resistant.",
      specifications:{ Size:"30×60 cm", Finish:"Glossy", Coverage:"~1.08 sqm/box (6 pcs)", Application:"Wall, bathroom, kitchen", Brand:"Eco Ceramics" }
    },
    {
      id:53, name:"Mirpur Ceramics 10-Hole Facing Brick",
      slug:"mirpur-ceramics-10hole-facing", category:"tiles-flooring",
      brand:"Mirpur Ceramics", price:22, originalPrice:25, unit:"Per Piece",
      stock:80000, rating:4.0, reviewCount:31, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/ERSS1Wq095jVTeXRXliGH5hVzIHTFXS5PcEaJy7A.jpg", "assets/images/products/hvGdv2QKYQqn308goPcG9P4if2y81vjO90KThXu6.png", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg", "assets/images/products/6YK07I8VtSt9XBb4hvwSe1sWlVWKGsSHjXNFOGzz.png"],
      description:"Mirpur Ceramics 10-hole facing brick — decorative exterior brick for facade cladding and wall finishing. Weather-resistant, aesthetically appealing.",
      specifications:{ Holes:"10-hole pattern", Material:"Ceramic Clay", Use:"Exterior facing, facade", Brand:"Mirpur Ceramics" }
    },
    {
      id:54, name:"Roof Tile — Large (8×8 inch)",
      slug:"roof-tile-large", category:"tiles-flooring",
      brand:"Mirpur Ceramics", price:42, originalPrice:45, unit:"Per Piece",
      stock:30000, rating:4.1, reviewCount:17, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/products/42GsIzqXWeAQBLnoieN1BpIb7MX9UoWdKRJ0KguN.jpg", "assets/images/products/lX0Ko3spjI6U2oVafxvx7lIo38tTN3P0U26y7ds2.jpg", "assets/images/products/qAmEnSmcQ00U8E66eQWPObtUN1sWLhas8U4Y5gAo.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg"],
      description:"Large ceramic/concrete roof tile. Classic design. Resists cracking, fading, wear. Estimate Shipping: 3 Days.",
      specifications:{ Size:"8×8 inch", Application:"Exterior roofing", Brand:"Mirpur/Chimbuk Ceramics" }
    },

    /* ─────────── SAFETY EQUIPMENT ─────────── */
    {
      id:55, name:"Construction Safety Helmet (HDPE, EN 397)",
      slug:"construction-safety-helmet", category:"safety-equipment",
      brand:"Walton", price:350, originalPrice:420, unit:"Per Piece",
      stock:500, rating:4.3, reviewCount:44, badge:null,
      featured:true, flashSale:false, inStock:true,
      images:["assets/images/banner4.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg"],
      description:"EN 397 certified HDPE construction safety helmet. Adjustable 4-point ratchet harness. Protects against falling objects and impact. Available in yellow, orange, white.",
      specifications:{ Material:"HDPE", Standard:"EN 397", Colors:"Yellow, Orange, White", Harness:"Adjustable 4-point ratchet" }
    },
    {
      id:56, name:"Safety Work Gloves (Cut-Resistant, Level 3)",
      slug:"safety-work-gloves", category:"safety-equipment",
      brand:"Walton", price:180, originalPrice:220, unit:"Per Pair",
      stock:800, rating:4.1, reviewCount:29, badge:null,
      featured:false, flashSale:true, inStock:true,
      images:["assets/images/banner4.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg"],
      description:"Cut-resistant Level 3 safety work gloves. Reinforced palm. Good grip wet/dry. Size L. For construction, handling, industrial work.",
      specifications:{ Size:"Large (L)", "Cut Resistance":"Level 3", Application:"Construction, handling, industrial" }
    },
    {
      id:57, name:"Safety Boots (Steel Toe, Water-Resistant)",
      slug:"safety-boots-steel-toe", category:"safety-equipment",
      brand:"Walton", price:1200, originalPrice:1500, unit:"Per Pair",
      stock:200, rating:4.4, reviewCount:37, badge:"sale",
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/banner4.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg"],
      description:"Steel-toe safety boots. Water-resistant leather upper. Anti-slip sole. EN ISO 20345 standard. Sizes 39–46.",
      specifications:{ "Toe Cap":"Steel", Upper:"Water-Resistant Leather", Sole:"Anti-Slip Rubber", Standard:"EN ISO 20345", Sizes:"39–46" }
    },
    {
      id:58, name:"High-Visibility Safety Vest (Class 2)",
      slug:"safety-vest-class2", category:"safety-equipment",
      brand:"Walton", price:280, originalPrice:350, unit:"Per Piece",
      stock:600, rating:4.0, reviewCount:18, badge:null,
      featured:false, flashSale:false, inStock:true,
      images:["assets/images/banner4.jpg", "assets/images/products/bWdF2GENLStMhUmnIbF5BCh3yLOftkcLOTgyUJGj.jpg"],
      description:"Class 2 high-visibility safety vest with retroreflective tape. Fluorescent yellow/orange. Maximum visibility on construction sites. Sizes M–XL.",
      specifications:{ Class:"EN ISO 20471 Class 2", Color:"Fluorescent Yellow/Orange", Tape:"Retroreflective", Sizes:"M, L, XL" }
    }
  ],

  // ════════════════════════════════════════════════
  // HERO SLIDES
  // ════════════════════════════════════════════════
  heroSlides: [
    {
      id:1, badge:"🔥 Flash Sale", title:"Best Quality\nConstruction Materials",
      subtitle:"From cement to tiles — your one-stop building materials shop in Bangladesh",
      price:"From ৳518", originalPrice:"৳570", cta:"Shop Flash Sale",
      ctaLink:"flash-sale.html", bg:"linear-gradient(130deg,#1b2a4a 0%,#2c3e6e 50%,#3d1a05 100%)"
    },
    {
      id:2, badge:"🎨 New Collection", title:"Premium Paint Collection\n2024",
      subtitle:"Berger, Asia Paint & more — Interior & Exterior paint at best prices",
      price:"From ৳2,300", originalPrice:"৳2,500", cta:"Explore Paints",
      ctaLink:"product-listing.html?category=paint-coating", bg:"linear-gradient(130deg,#065f46 0%,#047857 50%,#1b4f3b 100%)"
    },
    {
      id:3, badge:"🔩 Top Brand", title:"BSRM & GPH Steel Rods\nBest Price",
      subtitle:"Grade 60 TMT steel bars — the backbone of strong construction",
      price:"৳88,000/Ton", originalPrice:"৳95,000/Ton", cta:"Order Now",
      ctaLink:"product-listing.html?category=tmt-steel-bar", bg:"linear-gradient(130deg,#1e3a5f 0%,#2e4a7e 50%,#0f172a 100%)"
    },
    {
      id:4, badge:"🏗️ Premium Quality", title:"Ceramic Tiles &\nFlooring Collection",
      subtitle:"Mirpur Ceramics, Eco Ceramics & more — elegant floor & wall tiles",
      price:"From ৳17/piece", originalPrice:"৳20/piece", cta:"Browse Tiles",
      ctaLink:"product-listing.html?category=tiles-flooring", bg:"linear-gradient(130deg,#4c1d95 0%,#6d28d9 50%,#7c3aed 100%)"
    }
  ],

  // ════════════════════════════════════════════════
  // PROMO BANNERS
  // ════════════════════════════════════════════════
  promoBanners: [
    { id:1, tag:"Special Offer", title:"Paint & Coatings\nUp to 30% OFF", off:"30%", bg:"linear-gradient(135deg,#7c3aed 0%,#4c1d95 100%)", link:"product-listing.html?category=paint-coating" },
    { id:2, tag:"Limited Stock", title:"Steel Rods\nBest Price",           off:"15%", bg:"linear-gradient(135deg,#1b2a4a 0%,#0f172a 100%)", link:"product-listing.html?category=tmt-steel-bar" },
    { id:3, tag:"New Arrivals",  title:"Premium Tiles\nCollection",         off:"20%", bg:"linear-gradient(135deg,#065f46 0%,#022c22 100%)", link:"product-listing.html?category=tiles-flooring" }
  ],

  // ════════════════════════════════════════════════
  // ID LISTS for flash-sale & featured sections
  // ════════════════════════════════════════════════
  flashSaleProductIds:  [4, 7, 16, 26, 30, 34, 38, 40, 44, 48, 56],
  featuredProductIds:   [1, 2, 5, 9, 12, 15, 17, 19, 21, 24, 26, 28, 30, 33, 37, 43, 44, 47, 48, 49, 51, 52, 55]

}; // end window.PRODUCT_DATA
