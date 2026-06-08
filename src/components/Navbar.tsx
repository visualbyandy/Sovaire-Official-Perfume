import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, Search, Sparkles, MapPin, Heart, HelpCircle, Instagram } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateTo: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearCache?: () => void;
}

export default function Navbar({ cartCount, onOpenCart, onNavigateTo, searchQuery, onSearchChange, onClearCache }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Koleksi Parfum', id: 'collection' },
    { label: 'Scent Finder', id: 'scent-finder' },
    { label: 'Filosofi Kami', id: 'philosophy' },
    { label: 'Aura Ulasan', id: 'reviews' },
    { label: 'Butik Offline', id: 'boutique' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false);
    onNavigateTo(id);
  };

  return (
    <>
      {/* Main Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#C5A059]/20 shadow-xs">
        
        {/* =======================================================
            DESKTOP VIEW (md+)
            - Grid layout to prevent ANY overlap of Left, Center logo, and Right utilities
            ======================================================= */}
        <div className="hidden md:grid grid-cols-3 items-center max-w-7xl mx-auto px-6 md:px-8 h-20 md:h-22 relative">
          
          {/* LEFT: Mini artistic menu and text links */}
          <div className="flex items-center gap-6 justify-start">
            <button
              id="desktop-burger-btn"
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-3 select-none pr-4 border-r border-[#C5A059]/20 cursor-pointer group bg-transparent border-0 focus:outline-none focus:ring-0 text-left"
              aria-label="Buka Menu"
            >
              <div className="w-8 h-[14px] flex flex-col justify-between">
                <span className="h-[1px] w-full bg-[#C5A059] transition-all group-hover:bg-[#1A1A1A]"></span>
                <span className="h-[1px] w-2/3 bg-[#C5A059] transition-all group-hover:w-full group-hover:bg-[#1A1A1A]"></span>
                <span className="h-[1px] w-full bg-[#C5A059] transition-all group-hover:bg-[#1A1A1A]"></span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-sans leading-none font-medium group-hover:text-[#1A1A1A] transition-colors">Menu</span>
            </button>
            
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`nav-link-desktop-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-[9px] xl:text-[10px] font-sans font-medium tracking-[0.12em] xl:tracking-[0.18em] xl:mr-[-0.18em] text-[#1A1A1A]/80 hover:text-brand-gold transition-colors relative py-1 uppercase"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              ))}
            </nav>
          </div>

          {/* CENTER: Logo (Perfect centered placement, completely collision-safe) */}
          <div className="flex flex-col items-center justify-center select-none">
            <button
              id="desktop-brand-logo"
              onClick={() => onNavigateTo('hero')}
              className="flex flex-col items-center text-center group focus:outline-none"
            >
              <h1 className="text-2xl lg:text-3xl font-serif font-light text-[#1A1A1A] tracking-[0.4em] mr-[-0.4em] uppercase hover:text-gold-600 transition-colors leading-none">
                sovairé
              </h1>
              <span className="text-[8px] lg:text-[9px] uppercase tracking-[0.3em] mr-[-0.3em] text-[#C5A059] mt-1.5 group-hover:text-gold-800 transition-colors block">
                scent crafted • lasting aura
              </span>
            </button>
          </div>

          {/* RIGHT UTILS: Right for Desktop */}
          <div className="flex items-center gap-4 lg:gap-6 justify-end">
            <div className="relative group">
              <input
                id="desktop-search"
                type="text"
                placeholder="Cari aroma..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-28 focus:w-40 lg:w-36 lg:focus:w-48 text-xs p-2 pl-8 border border-[#C5A059]/20 focus:border-[#C5A059] rounded-none focus:outline-none transition-all duration-300 bg-[#F9F7F2]/50 text-[#1A1A1A] font-sans placeholder-gray-400"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5 transition-colors group-focus-within:text-brand-gold" />
            </div>

            {/* Cart Button */}
            <button
              id="desktop-cart-toggle"
              onClick={onOpenCart}
              className="relative p-2.5 bg-transparent hover:bg-[#F9F7F2] text-[#1A1A1A] border border-[#C5A059]/20 transition-all duration-300 active:scale-95 flex items-center justify-center"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-[#1A1A1A]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[9px] bg-[#C5A059] text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* =======================================================
            MOBILE VIEW (<md)
            - Center-aligned Logo (Absolute-centered per guidelines)
            ======================================================= */}
        <div className="flex md:hidden items-center justify-between max-w-7xl mx-auto px-4 py-4 h-20 relative">
          
          {/* LEFT: Toggle button (Mobile burger) */}
          <button
            id="mobile-burger-btn"
            onClick={() => setIsMenuOpen(true)}
            className="p-2 border border-gold-200/50 text-gold-700 hover:text-black rounded-lg bg-gold-50/40 active:scale-90 transition-transform flex items-center justify-center z-10"
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* CENTER: Logo (Absolute positioned per Artistic style) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <button
              id="mobile-centered-logo"
              onClick={() => handleLinkClick('hero')}
              className="text-center group"
            >
              <h1 className="text-2xl font-serif font-light text-[#1A1A1A] tracking-[0.35em] mr-[-0.35em] leading-none uppercase">
                sovairé
              </h1>
              <span className="text-[8px] uppercase tracking-[0.25em] mr-[-0.25em] text-[#C5A059] mt-0.5 block font-medium">
                scent crafted • lasting aura
              </span>
            </button>
          </div>

          {/* RIGHT: Mobile Cart icon */}
          <button
            id="mobile-cart-toggle"
            onClick={onOpenCart}
            className="relative p-2.5 bg-gold-50/40 border border-gold-200/50 rounded-lg text-gold-700 active:scale-90 transition-transform flex items-center justify-center z-10"
            aria-label="Keranjang Belanja Mobile"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[9px] font-mono font-bold leading-none flex items-center justify-center w-4.5 h-4.5 rounded-full border border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </header>

      {/* =======================================================
          TOGGLE MENU (Sliding mobile drawer from left)
          - Per user requested details, must have logo inside
         ======================================================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans text-brand-dark">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Left side sliding panel */}
            <div className="absolute inset-y-0 left-0 max-w-xs w-full flex pr-10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
                className="w-full bg-white h-full shadow-2xl border-r border-gold-300 flex flex-col"
              >
                {/* Toggle Menu Header featuring the Logo explicitly as requested */}
                <div className="px-6 py-6 border-b border-gold-100 bg-gold-50/70 relative">
                  
                  {/* BRAND EMBLEM IN TOGGLE MENU */}
                  <div className="flex flex-col items-center text-center mt-3 mb-2 select-none">
                    <span className="text-[10px] text-brand-gold font-serif tracking-[0.3em] mr-[-0.3em] uppercase block mb-1">
                      Maison de Luxe
                    </span>
                    <h2 className="text-3xl font-display font-medium text-brand-dark tracking-[0.18em] mr-[-0.18em] leading-none">
                      sovairé
                    </h2>
                    <p className="text-[8.5px] font-serif text-gold-600 block mt-2 tracking-widest mr-[-0.1em] italic uppercase">
                      "Fragrances d'Éternité"
                    </p>
                  </div>

                  <button
                    id="close-burger-drawer"
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scent filter / search on mobile */}
                <div className="p-4 bg-gold-50/20 border-b border-gold-100">
                  <div className="relative">
                    <input
                      id="mobile-search"
                      type="text"
                      placeholder="Cari aroma istimewa..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="w-full text-xs p-2.5 pl-9 border border-gray-200 focus:border-brand-gold rounded-lg focus:outline-none bg-white text-brand-dark font-sans"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* Links */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
                  <span className="text-[10px] font-mono text-gray-400 block mb-3 uppercase tracking-[0.2em] font-bold">Kategori Butik</span>
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      id={`nav-link-mobile-${link.id}`}
                      onClick={() => handleLinkClick(link.id)}
                      className="w-full text-left py-3 px-3 uppercase text-xs font-mono font-medium tracking-[0.15em] text-gray-600 hover:text-brand-gold hover:bg-gold-50 border-l border-transparent hover:border-brand-gold rounded transition-all flex items-center justify-between"
                    >
                      {link.label}
                      <span className="text-gold-500 font-mono text-[10px]">•</span>
                    </button>
                  ))}
                </div>

                 {/* Footer of Mobile Drawer */}
                <div className="p-6 border-t border-gold-100 bg-gold-50/50 text-center flex flex-col justify-center items-center">
                  <span className="text-[9px] font-serif text-gray-400 italic block mb-2">
                    "Aroma abadi yang melukis keindahan kepribadian Anda."
                  </span>
                  
                  <div className="flex gap-4 mt-2">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gold-600 hover:text-brand-gold" referrerPolicy="no-referrer">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="#boutique" onClick={() => handleLinkClick('boutique')} className="text-gold-600 hover:text-brand-gold font-mono text-[10px] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Jakarta, ID
                    </a>
                  </div>

                  <button
                    id="clear-app-cache-btn"
                    onClick={() => {
                      if (onClearCache) {
                        onClearCache();
                      } else {
                        localStorage.clear();
                        window.location.reload();
                      }
                    }}
                    className="mt-5 text-[9px] font-mono uppercase tracking-[0.12em] text-red-500 hover:text-red-700 bg-red-50/70 hover:bg-red-100 border border-red-200/50 px-3.5 py-1.5 rounded-md transition-all cursor-pointer font-bold block"
                    title="Bersihkan cache wewangian dan keranjang jika ada kesalahan data"
                  >
                    Hapus Cache Sistem
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
