/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERFUMES, INITIAL_REVIEWS } from './data';
import { Product, CartItem, Review } from './types';

// Importing subcomponents
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import ScentFinderQuiz from './components/ScentFinderQuiz';
import ReviewsSection from './components/ReviewsSection';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

// Icons
import {
  Sparkles,
  Award,
  Clock,
  Heart,
  Droplets,
  PackageCheck,
  Compass,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  Percent,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

export default function App() {
  // --- STATE ---
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Filtering & Sorting
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSort, setActiveSort] = useState<string>('best');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Scent Quiz direct navigation feedback
  const [quizTriggerKey, setQuizTriggerKey] = useState(0);

  // Slideshow config for Local Indonesian Sourcing section
  const GRASSE_PHOTOS = [
    {
      src: "https://i.pinimg.com/1200x/c5/b5/bc/c5b5bc812f3408ac9b5a90363b608011.jpg",
      sub: "Merasakan Keaslian",
      title: "Kebun Melati & Mawar, Jawa Tengah",
      desc: "Ekstraksi murni bunga lokal dipetik manual sesaat sebelum kabut fajar merekah di pelataran bukit."
    },
    {
      src: "https://i.pinimg.com/736x/23/b3/14/23b3141e21f91a2b75c7111ba247e8e8.jpg",
      sub: "Pesona Lestari",
      title: "Lembah Bunga Pegunungan",
      desc: "Hamparan kebun bunga luar biasa yang mekar subur di bawah udara sejuk dan sinar fajar hangat Indonesia."
    },
    {
      src: "https://i.pinimg.com/1200x/99/6c/0f/996c0f08a837f19a89d6d60dd73f8f31.jpg",
      sub: "Seleksi Ketat",
      title: "Pemetikan Kelopak Segar",
      desc: "Pemilihan lembaran kelopak murni terbaik secara manual oleh petani lokal demi menjaga kualitas minyak atsiri."
    },
    {
      src: "https://i.pinimg.com/736x/5c/6e/7d/5c6e7d09125ff3dc9872daf18ff75668.jpg",
      sub: "Warisan Alam",
      title: "Kebun Organik Lestari",
      desc: "Dirawat turun-temurun dengan kasih sayang oleh ahli perkebunan lokal dan dipupuk secara alami."
    },
    {
      src: "https://i.pinimg.com/736x/e1/98/0c/e1980ccac69471d48135c024c76c8d6b.jpg",
      sub: "Seni Distilasi",
      title: "Ekstraksi Tradisional",
      desc: "Penyulingan uap tradisional bertemperatur rendah oleh para artisan lokal untuk mengunci esensi kemurnian."
    }
  ];

  const [currentGrasseIndex, setCurrentGrasseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGrasseIndex((prev) => (prev + 1) % GRASSE_PHOTOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Load and save state locally for optimal persistent user experience
  useEffect(() => {
    const cachedCart = localStorage.getItem('soviare_cart');
    const cachedReviews = localStorage.getItem('soviare_reviews');
    if (cachedCart) {
      try {
        const parsed = JSON.parse(cachedCart);
        if (Array.isArray(parsed)) {
          // Map of old IDs to new IDs
          const idMigrationMap: Record<string, string> = {
            'soviare-eclat': 'Soviare-Noctera',
            'soviare-nuit': 'Soviare-Zephran',
            'soviare-Noctera': 'Soviare-Noctera',
            'Soviare-Noctera': 'Soviare-Noctera',
            'Soviare-Nuit': 'Soviare-Zephran',
            'Soviare-Zephran': 'Soviare-Zephran',
          };

          const validatedCart: CartItem[] = parsed
            .map((item: any) => {
              if (!item || !item.product) return null;
              const originalId = item.product.id;
              // Normalize and look up matching product
              const migratedId = idMigrationMap[originalId] || idMigrationMap[originalId.toLowerCase()] || originalId;
              const updatedProduct = PERFUMES.find(p => p.id === migratedId);
              if (updatedProduct) {
                return {
                  ...item,
                  product: updatedProduct,
                };
              }
              return null;
            })
            .filter((item): item is CartItem => item !== null);

          setCartItems(validatedCart);
          localStorage.setItem('soviare_cart', JSON.stringify(validatedCart));
        }
      } catch (e) {
        console.error('Failed reading cart cache:', e);
      }
    }
    if (cachedReviews) {
      try {
        const parsedReviews = JSON.parse(cachedReviews);
        if (Array.isArray(parsedReviews)) {
          const idMigrationMap: Record<string, string> = {
            'soviare-eclat': 'Soviare-Noctera',
            'soviare-nuit': 'Soviare-Zephran',
            'soviare-Noctera': 'Soviare-Noctera',
            'Soviare-Noctera': 'Soviare-Noctera',
            'Soviare-Nuit': 'Soviare-Zephran',
            'Soviare-Zephran': 'Soviare-Zephran',
          };
          const validatedReviews = parsedReviews
            .map((rev: any) => {
              if (!rev || !rev.productId) return null;
              const originalId = rev.productId;
              const mappedId = idMigrationMap[originalId] || idMigrationMap[originalId.toLowerCase()] || originalId;
              const productExists = PERFUMES.some(p => p.id === mappedId);
              if (!productExists) return null;
              return {
                ...rev,
                productId: mappedId,
              };
            })
            .filter((rev): rev is Review => rev !== null);

          setReviews(validatedReviews);
          localStorage.setItem('soviare_reviews', JSON.stringify(validatedReviews));
        }
      } catch (e) {
        console.error('Failed reading reviews cache:', e);
      }
    }
  }, []);

  const saveCartToCache = (newCart: CartItem[]) => {
    localStorage.setItem('soviare_cart', JSON.stringify(newCart));
  };

  const saveReviewsToCache = (newReviews: Review[]) => {
    localStorage.setItem('soviare_reviews', JSON.stringify(newReviews));
  };

  // --- ACTIONS ---
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      } else {
        updated = [...prev, { product, quantity }];
      }
      saveCartToCache(updated);
      return updated;
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      saveCartToCache(updated);
      return updated;
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.product.id !== productId);
      saveCartToCache(updated);
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('soviare_cart');
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => {
      const updated = [newReview, ...prev];
      saveReviewsToCache(updated);
      return updated;
    });
  };

  const handleNavigation = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90; // Height of our luxurious sticky header plus tiny padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDirectToFinder = () => {
    setQuizTriggerKey(prev => prev + 1); // Trigger key reset to retry quiz seamlessly
    handleNavigation('scent-finder');
  };

  // --- PROCESSING FILTER & SORT ---
  const filteredProducts = PERFUMES.filter((prod) => {
    // Category match
    if (activeCategory !== 'all' && prod.category !== activeCategory) {
      return false;
    }
    // Search match (checks name, tagline, or olfactive notes)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const matchName = prod.name.toLowerCase().includes(query);
      const matchTagline = prod.tagline.toLowerCase().includes(query);
      const matchFamily = prod.scentFamily.toLowerCase().includes(query);
      const matchNotes = [
        ...prod.notes.top,
        ...prod.notes.middle,
        ...prod.notes.base
      ].some(note => note.toLowerCase().includes(query));

      if (!matchName && !matchTagline && !matchFamily && !matchNotes) {
        return false;
      }
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (activeSort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'best':
      default:
        // Best sellers first, then rating
        const scoreA = (a.isBestSeller ? 10 : 0) + a.rating;
        const scoreB = (b.isBestSeller ? 10 : 0) + b.rating;
        return scoreB - scoreA;
    }
  });

  const bestSellerProduct = PERFUMES.find(p => p.isBestSeller) || PERFUMES[0];
  const cartTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleClearCache = () => {
    localStorage.removeItem('soviare_cart');
    localStorage.removeItem('soviare_reviews');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col font-sans selection:bg-brand-lightgold selection:text-gold-900 scroll-smooth">
      
      {/* 1. TOP NAVIGATION & BRAND MATRICES */}
      <Navbar
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateTo={handleNavigation}
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          if (query.trim() !== '') {
            const collectionEl = document.getElementById('collection');
            if (collectionEl) {
              collectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }}
        onClearCache={handleClearCache}
      />

      {/* 2. MAJESTIC BANNER & IMMERSIVE INTRO */}
      <Hero
        onLearnMore={handleDirectToFinder}
        bestSeller={bestSellerProduct}
        onExploreProduct={(p) => setSelectedProduct(p)}
      />

      {/* 3. PREMIUM ADVANTAGES / SEALS */}
      <section className="bg-gold-50/30 border-y border-gold-200/50 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl border border-transparent hover:border-gold-205 transition-all">
            <div className="p-3 bg-white border border-gold-200 text-brand-gold rounded-full shrink-0">
              <Compass className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wide text-brand-dark uppercase">Bahan Botani Murni Pilihan</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                92% ramuan murni bersumber langsung dari perkebunan melati dan kelopak bunga segar pegunungan.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl border border-transparent hover:border-gold-205 transition-all">
            <div className="p-3 bg-white border border-gold-200 text-brand-gold rounded-full shrink-0">
              <Award className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wide text-brand-dark uppercase">Kaca Kristal Buatan Tangan</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Botol dipahat khusus oleh seniman gelas berpengalaman, lengkap dengan detail cincin leher yang berkilau mewah.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl border border-transparent hover:border-gold-205 transition-all">
            <div className="p-3 bg-white border border-gold-200 text-brand-gold rounded-full shrink-0">
              <PackageCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wide text-brand-dark uppercase">Segel Lilin & Kemasan Beludru</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Setiap kotak berlapis beludru putih tebal diredam aman, disegel tangan menggunakan lilin leleh khusus sovairé.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. MAIN PRODUCT GRID / THE BOUTIQUE COLLECTION */}
      <main className="py-16 bg-white" id="collection">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          {/* Header collection */}
          <div className="text-center mb-12">
            <span className="text-gold-600 font-display font-medium text-xs tracking-[0.25em] uppercase block mb-1">
              Koleksi Utama
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-dark font-medium tracking-tight">
              Butik Wewangian Eksklusif
            </h2>
            <div className="w-16 h-[1.5px] bg-brand-gold mx-auto mt-4 mb-4"></div>
            <p className="text-gray-400 font-sans text-xs max-w-lg mx-auto">
              Jelajahi konsentrasi ketahanan Extrait de Parfum dengan sensasi wewangian berlapis-lapis yang menyingkap kepribadian bangsawan Anda.
            </p>
          </div>

          {/* Filtering and Search Controls bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gold-50/40 p-4 border border-gold-200/50 rounded-2xl mb-8">
            
            {/* Scent Categories Filters buttons */}
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start w-full md:w-auto">
              {[
                { label: 'Semua Koleksi', id: 'all' },
                { label: 'Amber Floral', id: 'floral-amber' },
                { label: 'Iris & Musk', id: 'musky' },
                { label: 'Oud & Saffron', id: 'woody-oriental' },
                { label: 'Fresh Green Rose', id: 'fresh-floral' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  id={`cat-filter-btn-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-brand-dark text-white shadow-sm'
                      : 'bg-white hover:bg-gold-50 text-gray-500 hover:text-brand-gold border border-gray-150'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sorting controls select */}
            <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gold-100">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest leading-none">Terpilih:</span>
              <div className="relative">
                <select
                  id="sort-products-dropdown"
                  value={activeSort}
                  onChange={(e) => setActiveSort(e.target.value)}
                  className="bg-white border border-gray-200 text-brand-dark font-sans text-xs p-2.5 pr-8 rounded-lg outline-none focus:border-brand-gold appearance-none cursor-pointer"
                >
                  <option value="best">Kombinasi Terlaris</option>
                  <option value="price-asc">Harga: Rendah ke Tinggi</option>
                  <option value="price-desc">Harga: Tinggi ke Rendah</option>
                  <option value="rating">Nilai Bintang Sempurna</option>
                </select>
                <div className="absolute right-2.5 top-3.5 pointer-events-none text-gray-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>

          {/* Core Perfume Cards Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map((perfume) => (
                <ProductCard
                  key={perfume.id}
                  product={perfume}
                  onExplore={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-gold-300 rounded-3xl bg-gold-50/20 max-w-lg mx-auto">
              <ShieldAlert className="w-12 h-12 text-brand-gold mx-auto mb-3" />
              <h4 className="font-serif font-semibold text-brand-dark mb-1">Aroma tidak dapat ditemukan</h4>
              <p className="text-xs text-gray-500 max-w-[280px] mx-auto leading-relaxed">
                Kami tidak memiliki catatan ramuan yang cocok dengan pencarian Anda. Coba kata kunci murni lainnya seperti "vienna", "mawar", "malam".
              </p>
              <button
                id="reset-filters"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 text-xs font-mono uppercase tracking-widest text-gold-700 font-bold hover:text-brand-gold border-b border-gold-400 pb-0.5"
              >
                Reset Penyaringan
              </button>
            </div>
          )}

        </div>
      </main>

      {/* 5. INTERACTIVE SCENT FINDER STEP WIZARD */}
      <ScentFinderQuiz
        key={quizTriggerKey}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* 6. IMMERSIVE PHILOSOPHY SECTION (Grasse Sourcing & Handcraft bottling) */}
      <section className="py-20 bg-gold-50/30 border-b border-gold-200" id="philosophy">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Photos split or collage panel on Left */}
          <div className="relative flex justify-center">
            {/* Visual borders */}
            <div className="absolute inset-4 border border-brand-gold rounded-3xl pointer-events-none transform rotate-2"></div>
            
            <div className="relative bg-white border border-gold-200 p-4 rounded-3xl shadow-xl w-full max-w-md overflow-hidden h-[400px] md:h-[460px]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentGrasseIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={GRASSE_PHOTOS[currentGrasseIndex].src}
                      alt={GRASSE_PHOTOS[currentGrasseIndex].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent"></div>
                    
                    <div className="absolute bottom-10 left-6 right-6 text-white text-left">
                      <span className="text-[9px] font-mono text-brand-gold uppercase tracking-[0.2em] block mb-1">
                        {GRASSE_PHOTOS[currentGrasseIndex].sub}
                      </span>
                      <h4 className="font-serif font-medium text-lg text-white leading-tight">
                        {GRASSE_PHOTOS[currentGrasseIndex].title}
                      </h4>
                      <p className="text-[10px] text-gray-300 font-sans mt-1.5 leading-relaxed">
                        {GRASSE_PHOTOS[currentGrasseIndex].desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dot Indicators */}
              <div className="absolute bottom-6 left-10 flex gap-1.5 z-10">
                {GRASSE_PHOTOS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentGrasseIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentGrasseIndex ? 'w-5 bg-brand-gold' : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Philosophical narrative text on Right */}
          <div className="flex flex-col text-left">
            <span className="text-gold-600 font-display font-medium text-xs tracking-[0.25em] uppercase block mb-2">
              Filosofi Kejujuran Kemurnian
            </span>
            <h3 className="text-3xl md:text-4xl font-serif text-brand-dark font-medium tracking-tight mb-6">
              Melahirkan Kembali <span className="italic">Karya Alami</span> Istimewa
            </h3>
            
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Maison **sovairé** percaya kemewahan sejati lahir dari kekayaan tanah air dan ketelatenan lokal yang mendalam. Di saat industri global beralih ke wewangian sintetis buatan mesin, kami berdiri kukuh mengangkat bahan botani lokal pilihan dan seni penyulingan tradisional murni warisan pengrajin terampil tanah air kita sendiri.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0 mt-2"></div>
                <div>
                  <h5 className="text-xs font-mono font-bold tracking-wider text-brand-dark uppercase">Kekuatan Konsentrasi Ekstrak</h5>
                  <p className="text-xs text-gray-400 mt-1">
                    Setiap botol sovairé memiliki kadar konsentrasi essential oils di atas 30%. Inilah rahasia mengapa pancaran aroma kami tidak pernah luntur sekalipun diseka angin sore.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0 mt-2"></div>
                <div>
                  <h5 className="text-xs font-mono font-bold tracking-wider text-brand-dark uppercase">Keadilan Transparansi Sourcing</h5>
                  <p className="text-xs text-gray-400 mt-1">
                    Kami bekerja sama langsung dengan para petani bunga murni dan pemetik lokal Jawa, Sumatera, hingga Bali dengan sistem perdagangan yang adil. Dedikasi kasih sayang mereka menyatu sempurna dalam setiap esensi premium sovairé Anda.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                id="philosophy-discover-btn"
                onClick={handleDirectToFinder}
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-dark hover:text-brand-gold border-b border-brand-dark hover:border-brand-gold pb-1.5 uppercase tracking-widest transition-colors"
              >
                Ikut Merasa Dengan Aroma <ArrowRight className="w-4 h-4 text-brand-gold" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. REAL TESTIMONIAL CLIENT REVIEWS & ADD COMPONENT */}
      <ReviewsSection
        reviews={reviews}
        products={PERFUMES}
        onAddReview={handleAddReview}
      />

      {/* 7.5 OFFLINE SHOWROOM / GOOGLE MAPS LOCATION SECTION */}
      <section className="py-20 bg-gold-50/20 border-t border-b border-gold-200/40 relative" id="boutique">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-gold-600 font-display font-medium text-xs tracking-[0.25em] uppercase block mb-2">
              Kunjungi Showroom Kami
            </span>
            <h3 className="text-3xl font-serif text-brand-dark font-medium tracking-tight">
              Butik Pusat & Showroom Offline
            </h3>
            <p className="text-xs text-gray-400 mt-2 font-serif italic">
              "Sambut aroma eksklusif dan kemewahan murni dalam setiap helai botol parfum secara langsung di butik fisik kami."
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left side, information details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 md:p-8 border border-gold-200/50 rounded-3xl shadow-sm space-y-6">
                <div>
                  <h4 className="font-serif font-semibold text-xl text-brand-dark">Sovairé House</h4>
                  <p className="text-[10px] text-brand-gold font-mono uppercase tracking-wider mt-1">L'atelier de Parfum Premium</p>
                </div>
                
                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5 text-xs text-gray-500">
                    <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-brand-dark font-mono uppercase text-[10px] tracking-wider block mb-0.5">Alamat</strong>
                      <p className="leading-relaxed">
                        Jl. Inpres XI No.40 RT.03 RW.05 Kec.Larangan Kel. Gaga,<br />
                        Ciledug, Tangerang 15154
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 text-xs text-gray-500">
                    <Phone className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-brand-dark font-mono uppercase text-[10px] tracking-wider block mb-0.5">Layanan WhatsApp</strong>
                      <p className="mt-0.5">
                        <a 
                          href="https://wa.me/6287781857169" 
                          target="_blank" 
                          rel="noreferrer"
                          className="hover:text-brand-gold font-mono font-medium tracking-wide transition-colors border-b border-dotted border-gray-300 hover:border-brand-gold pb-0.5"
                          referrerPolicy="no-referrer"
                        >
                          087781857169
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 text-xs text-gray-500">
                    <Mail className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-brand-dark font-mono uppercase text-[10px] tracking-wider block mb-0.5">Surel Resmi</strong>
                      <p className="mt-0.5 font-mono text-[11px] text-gray-400">maison@soviare.com</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                  <span>Waktu Operasional</span>
                  <span className="font-semibold text-brand-gold font-sans text-xs">09.00 - 21.00 WIB</span>
                </div>
              </div>
            </div>

            {/* Right side, the Google Maps embed */}
            <div className="lg:col-span-7 h-[380px] rounded-3xl overflow-hidden border border-gold-200/60 shadow-xl relative group bg-gray-100">
              <iframe
                title="Google Maps Showroom Location"
                src="https://maps.google.com/maps?q=Jl.%20Inpres%20XI%20No.40%20RT.03%20RW.05%20Larangan%20Gaga%20Ciledug%20Tangerang&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-auto"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              
              <a
                href="https://maps.google.com/?q=Jl.%20Inpres%20XI%20No.40%20RT.03%20RW.05%20Larangan%20Gaga%20Ciledug%20Tangerang"
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 bg-transparent flex items-center justify-center group-hover:bg-black/5 transition-colors duration-300 pointer-events-none md:pointer-events-auto"
                referrerPolicy="no-referrer"
                title="Buka Map Besar"
              >
                <div className="absolute top-5 right-5 bg-white/95 text-brand-dark hover:bg-brand-gold hover:text-white font-mono text-[10px] uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-md transition-all duration-300 flex items-center gap-1.5 pointer-events-auto">
                  <span>Petunjuk Arah</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SLA / TRUST GUARANTEE STATEMENT */}
      <section className="py-12 bg-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <div className="inline-flex items-center justify-center p-2 bg-gold-50 border border-gold-200 text-brand-gold rounded-full mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-semibold text-brand-dark mb-2">Piagam Jaminan Keaslian sovairé</h4>
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            Kami menjamin bahwa setiap mili botol parfum sovairé yang dikirimkan telah melalui 4 tahap kurasi olfaktori independen di Jakarta dan Bandung. Kami bersedia mengganti 200% nilai pembayaran Anda jika terbukti terdapat campur tangan bahan sintetis berbahaya di dalamnya.
          </p>
        </div>
      </section>

      {/* 9. BRAND FOOTER (Links, Address, Newsletter, and Trust logos) */}
      <Footer onNavigateTo={handleNavigation} />

      {/* --- FLOATING DIALOGS & OVERLAY SLIDES --- */}

      {/* A. PRODUCT DETAIL MODAL */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
      />

      {/* B. LUXURY CART SLIDE DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
