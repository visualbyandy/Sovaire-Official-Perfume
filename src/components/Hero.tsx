import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowDown, ShieldCheck, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { PERFUMES } from '../data';

interface HeroProps {
  onLearnMore: () => void;
  bestSeller: Product;
  onExploreProduct: (product: Product) => void;
}

export default function Hero({ onLearnMore, bestSeller, onExploreProduct }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play interval for the showcase carousel
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PERFUMES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isHovered]);

  const activeProduct = PERFUMES[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + PERFUMES.length) % PERFUMES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % PERFUMES.length);
  };

  // Maps to premium high-resolution image asset directly
  const getProductImage = (prod: Product) => {
    return prod.image;
  };

  return (
    <section className="relative bg-white pt-6 pb-16 md:py-20 overflow-hidden font-sans text-[#1A1A1A]" id="hero">
      
      {/* Decorative vectors / marble layout grids */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
      
      {/* Dynamic Gold Light effects in background */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-gold-100/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-gold-50/40 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Brand Narrative & Majestic Slogan Tagline */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left relative pl-0 md:pl-12">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 overflow-hidden hidden md:block select-none">
            <span className="writing-mode-vertical text-[10px] uppercase tracking-[0.45em] text-[#C5A059]/40 transform rotate-180 block whitespace-nowrap">
              ESTABLISHED IN 1924
            </span>
          </div>
          
          <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold mb-3 block">
            The Signature Collection
          </span>

          <h2 className="text-5xl sm:text-7xl leading-[1.1] text-[#1A1A1A] font-light font-sans uppercase tracking-[0.05em]">
            L'Essence <br/> 
            <span className="italic font-serif pl-8 md:pl-12 text-[#b08d4a]">de l'Aube</span>
          </h2>

          <p className="text-xs md:text-sm text-gray-500 max-w-md leading-relaxed mt-4 mb-8 font-sans">
            Butik parfum murni paling prestisius. Dihidangkan khusus untuk pribadi agung yang memuja kesempurnaan. Setiap racikan disuling murni dari perkebunan tanaman pusaka legendaris, serta dirakit dalam botol kaca kristal mewah dengan detail presisi tiada cela.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <button
              id="hero-find-scent-btn"
              onClick={onLearnMore}
              className="px-10 py-4 bg-[#C5A059] text-white text-xs uppercase tracking-widest hover:bg-[#b08d4a] transition-all rounded-full w-full sm:w-auto font-mono font-medium"
            >
              CARI AROMA ANDA
            </button>
            <div className="h-[1px] w-12 bg-[#C5A059]/30 hidden sm:block"></div>
            <a
              id="hero-collection-link"
              href="#collection"
              className="text-xs uppercase tracking-widest text-[#1A1A1A]/80 hover:text-brand-gold border-b border-brand-gold/40 pb-1 font-mono font-medium whitespace-nowrap"
            >
              Mulai Koleksi
            </a>
          </div>

          {/* Sincerity Icons */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#C5A059]/20 w-full max-w-md">
            <div>
              <span className="block font-serif text-lg font-bold text-[#C5A059] leading-none">12h+</span>
              <span className="text-[10px] text-gray-400 font-mono tracking-wider block uppercase mt-1">Daya Tahan</span>
            </div>
            <div>
              <span className="block font-serif text-lg font-bold text-[#C5A059] leading-none">92%</span>
              <span className="text-[10px] text-gray-400 font-mono tracking-wider block uppercase mt-1">Bahan Organik</span>
            </div>
            <div>
              <span className="block font-serif text-lg font-bold text-[#C5A059] leading-none">IDN</span>
              <span className="text-[10px] text-gray-400 font-mono tracking-wider block uppercase mt-1">Lokal Sourced</span>
            </div>
          </div>

        </div>

        {/* Right Side: Showcase with gorgeous mockup-styled box with integrated carousel */}
        <div 
          className="lg:col-span-6 relative flex flex-col items-center justify-center bg-[#F9F7F2] p-8 md:p-14 border border-[#C5A059]/10 rounded-2xl overflow-hidden shadow-xs w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Decorative Elements */}
          <div className="absolute top-6 right-8 text-[100px] md:text-[140px] font-serif font-light text-[#C5A059]/5 select-none leading-none">
            S0{currentIndex + 1}
          </div>
          
          {/* Carousel Frame Wrapper */}
          <div className="relative flex items-center justify-center w-full max-w-sm">
            
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 lg:-left-6 z-20 p-2 sm:p-2.5 rounded-full border border-[#C5A059]/20 hover:border-[#C5A059] text-[#C5A059] hover:text-white bg-white/90 hover:bg-[#C5A059] backdrop-blur-xs transition-all duration-300 -translate-x-3 sm:-translate-x-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              title="Aroma Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Main Product Display Frame */}
            <div className="relative w-72 h-[440px] sm:h-[480px] bg-white shadow-[30px_30px_60px_rgba(0,0,0,0.04)] border border-[#C5A059]/10 p-3 z-10">
              <div className="w-full h-full border border-[#C5A059]/20 flex flex-col items-center justify-between p-4 py-8">
                {/* Gold Cap visual mockup */}
                <div className="w-24 h-12 bg-[#C5A059]/10 rounded-t-[36px] border border-[#C5A059]/20"></div>
                
                {/* Label area which holds the image beautifully with transition animations */}
                <div className="relative w-full h-52 flex items-center justify-center overflow-hidden">
                  {/* Embedded glass glow halo */}
                  <div className="absolute w-28 h-28 bg-[#C5A059]/5 rounded-full blur-xl"></div>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeProduct.id}
                      src={getProductImage(activeProduct)}
                      alt={activeProduct.name}
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="w-full h-full object-contain pointer-events-none drop-shadow-md select-none"
                    />
                  </AnimatePresence>
                </div>

                {/* Title brand details block on bottle */}
                <div className="w-full text-center">
                  <span className="text-[9px] tracking-[0.4em] uppercase opacity-50 block text-[#1A1A1A]">sovairé</span>
                  <div className="w-8 h-[1px] bg-[#C5A059] mx-auto my-2"></div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProduct.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-lg font-serif italic text-brand-dark block truncate px-2">
                        {activeProduct.name}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="text-center font-sans">
                  <p className="text-[9px] uppercase tracking-wider text-[#C5A059] font-medium tracking-[0.15em]">{activeProduct.concentration}</p>
                  <p className="text-[10px] mt-0.5 text-gray-500 font-mono">{activeProduct.scentFamily} • {activeProduct.volume}</p>
                </div>
              </div>

              {/* Quick action button inside the card framework */}
              <div className="absolute inset-x-4 bottom-4 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity bg-white/95 backdrop-blur-xs p-3 border border-[#C5A059]/20 text-center flex flex-col items-center justify-center shadow-lg">
                <span className="text-[9px] font-mono text-gold-600 uppercase tracking-widest block mb-1">Maison {activeProduct.name}</span>
                <button
                  id={`hero-carousel-detail-btn-${activeProduct.id}`}
                  onClick={() => onExploreProduct(activeProduct)}
                  className="bg-[#C5A059] hover:bg-[#b08d4a] text-white rounded-none w-full py-2 text-[10px] uppercase tracking-widest font-mono transition-colors cursor-pointer"
                >
                  Cium Aroma
                </button>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 lg:-right-6 z-20 p-2 sm:p-2.5 rounded-full border border-[#C5A059]/20 hover:border-[#C5A059] text-[#C5A059] hover:text-white bg-white/90 hover:bg-[#C5A059] backdrop-blur-xs transition-all duration-300 translate-x-3 sm:translate-x-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              title="Aroma Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
          </div>

          {/* Carousel minimal index dots */}
          <div className="flex gap-2 mt-6 z-10 relative">
            {PERFUMES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-1.5 h-1.5 transition-all duration-300 rounded-none cursor-pointer ${
                  idx === currentIndex 
                    ? 'w-6 bg-[#C5A059]' 
                    : 'bg-[#C5A059]/30 hover:bg-[#C5A059]/60'
                }`}
                title={`Ke Aroma ${idx + 1}`}
              ></button>
            ))}
          </div>

          {/* Float Reviews Ribbon */}
          <div className="absolute bottom-6 right-6 flex flex-col items-end bg-white/90 backdrop-blur-xs px-3 py-2 border border-[#C5A059]/10 text-right select-none shadow-xs">
            <span className="text-[8px] font-mono tracking-tighter text-[#C5A059]">Ulasan Kolektor</span>
            <span className="text-[11px] font-sans font-bold text-[#1A1A1A]">5.0 / 5.0 ★</span>
          </div>

        </div>

      </div>

      {/* Floating scroll indicator */}
      <div className="flex justify-center mt-12">
        <a
          href="#collection"
          className="flex flex-col items-center gap-1.5 text-gray-300 hover:text-[#C5A059] transition-colors font-mono text-[9px] uppercase tracking-[0.25em]"
        >
          <span>Uraikan Ke bawah</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="w-4 h-4 text-[#C5A059]" />
          </motion.div>
        </a>
      </div>

    </section>
  );
}
