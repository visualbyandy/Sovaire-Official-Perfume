import React from 'react';
import { Product } from '../types';
import { Star, ShoppingBag, Eye, Heart } from 'lucide-react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onExplore: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onExplore, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white border border-[#C5A059]/20 hover:border-[#C5A059] rounded-none overflow-hidden group transition-all duration-300 flex flex-col h-full shadow-xs hover:shadow-md font-sans relative">
      
      {/* Best Seller badge */}
      {product.isBestSeller && (
        <div className="absolute top-4 left-4 z-10 bg-[#C5A059] text-white text-[8px] font-mono tracking-[0.18em] px-2.5 py-1 rounded-none uppercase">
          Best Seller
        </div>
      )}

      {/* Floating Volume / Concentration Badge */}
      <div className="absolute top-4 right-4 z-10 bg-[#F9F7F2]/95 text-gold-800 text-[8px] font-mono font-medium tracking-wide px-2.5 py-1 rounded-none border border-[#C5A059]/20">
        {product.volume} • {product.concentration === 'Extrait de Parfum' ? 'Extrait' : product.concentration}
      </div>

      {/* Product Image Frame */}
      <div className="h-64 sm:h-72 bg-[#F9F7F2]/30 flex items-center justify-center p-6 relative overflow-hidden shrink-0 border-b border-[#C5A059]/10">
        {/* Subtle background golden glow */}
        <div className="absolute w-36 h-36 bg-[#C5A059]/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full max-w-[190px] h-full object-contain pointer-events-none drop-shadow-md group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Scent family badge */}
        <span className="text-gold-650 font-mono text-[9px] tracking-[0.2em] block uppercase mb-1 font-semibold">
          {product.scentFamily}
        </span>
        
        {/* Product title */}
        <h3 className="text-lg font-serif font-light text-[#1A1A1A] group-hover:text-gold-605 transition-colors mb-1 tracking-wide uppercase">
          SOVAIRÉ {product.name}
        </h3>

        {/* Short tagline description */}
        <p className="text-xs text-gray-500 font-serif leading-relaxed line-clamp-2 md:mb-4 select-none italic">
          "{product.description}"
        </p>

        {/* Rating stars and numerical statistics */}
        <div className="flex items-center gap-1.5 mt-auto mb-4 text-xs font-mono">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3 h-3 ${
                  s <= Math.round(product.rating)
                    ? 'fill-[#C5A059] text-[#C5A059]'
                    : 'text-gray-150'
                }`}
              />
            ))}
          </div>
          <span className="text-gold-800 text-[10px] font-bold">{product.rating}</span>
          <span className="text-gray-200 font-normal">|</span>
          <span className="text-gray-400 text-[9px] uppercase font-sans">Official</span>
        </div>

        {/* Pricing tag and buttons */}
        <div className="pt-4 border-t border-[#C5A059]/10 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[8px] text-gray-400 font-mono tracking-wider block uppercase mb-0.5">ESTIMASI</span>
            <div className="flex flex-col">
              {product.originalPrice && (
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-mono line-through text-gray-400">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[8px] font-mono bg-red-50 text-red-650 px-1 font-bold rounded-xs">
                    -40%
                  </span>
                </div>
              )}
              <span className="text-base font-serif font-medium text-[#1A1A1A]">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              id={`prod-card-explore-${product.id}`}
              onClick={() => onExplore(product)}
              className="p-3 border border-[#C5A059]/20 hover:border-[#C5A059] text-gold-700 hover:text-brand-gold rounded-none transition-all bg-white hover:bg-[#F9F7F2]/50 shadow-xs cursor-pointer"
              title="Cium Detail Aroma"
            >
              <Eye className="w-4 h-4 text-[#1A1A1A]" />
            </button>
            <button
              id={`prod-card-add-to-cart-${product.id}`}
              onClick={() => onAddToCart(product)}
              className="bg-[#1A1A1A] hover:bg-[#C5A059] text-white font-mono font-medium tracking-widest text-[10px] uppercase px-4 py-3 rounded-none flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> BELI
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
