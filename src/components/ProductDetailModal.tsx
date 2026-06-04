import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { X, Star, ShoppingBag, Leaf, Droplet, ShieldCheck } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'shipping'>('details');
  const [localProduct, setLocalProduct] = useState<Product | null>(null);

  // Sync and capture details so that during exit animation we retain details gracefully
  React.useEffect(() => {
    if (product) {
      setLocalProduct(product);
      setQuantity(1);
      setActiveTab('details');
    }
  }, [product]);

  const isOpen = product !== null;
  const displayProduct = product || localProduct;

  if (!displayProduct) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < displayProduct.stock) setQuantity(quantity + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-white border border-gold-300 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl z-10 font-sans text-brand-dark"
          >
            {/* Close button */}
            <button
              id="close-product-modal"
              onClick={onClose}
              className="absolute top-5 right-5 z-20 p-2 bg-gold-50 hover:bg-gold-100 border border-gold-200 text-gold-700 hover:text-black rounded-full transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-10">
              {/* Left side: Premium Image Showcase */}
              <div className="md:col-span-5 flex flex-col justify-center items-center bg-gold-50/50 rounded-2xl p-6 border border-gold-200/50 relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-brand-gold text-white text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full uppercase font-bold">
                  {displayProduct.concentration}
                </div>
                <img
                  src={displayProduct.image}
                  alt={displayProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full max-w-[280px] h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                />
                <span className="text-[10px] text-gray-400 font-mono mt-4 uppercase tracking-[0.15em] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold stroke-[2]" /> 100% Produk Asli & Eksklusif
                </span>
              </div>

              {/* Right side: Detailed Information */}
              <div className="md:col-span-7 flex flex-col">
                <span className="text-gold-600 text-xs font-mono tracking-[0.2em] uppercase block mb-1">
                  {displayProduct.scentFamily}
                </span>
                <h2 className="text-3xl font-serif font-medium tracking-tight mb-2 uppercase">
                  SOVAIRÉ <span className="text-gold-600 italic font-display font-semibold">{displayProduct.name}</span>
                </h2>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= Math.round(displayProduct.rating)
                            ? 'fill-brand-gold text-brand-gold'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-semibold text-gold-700">{displayProduct.rating} / 5.0</span>
                  <span className="text-xs text-gray-400 font-sans">| Terverifikasi Pecinta Parfum</span>
                </div>

                <p className="text-xs italic text-gray-400 font-serif mb-6 border-l-2 border-brand-gold pl-3 py-0.5">
                  "{displayProduct.tagline}"
                </p>

                {/* Price Tag & Stock Status */}
                <div className="flex justify-between items-center bg-gold-50/50 p-4 border border-gold-200/40 rounded-xl mb-6">
                  <div>
                    <span className="text-[10px] text-gray-400 font-mono tracking-wider block uppercase mb-0.5">ESTIMASI PEMBAYARAN</span>
                    <div className="flex flex-col">
                      {displayProduct.originalPrice && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono line-through text-gray-400">
                            Rp {displayProduct.originalPrice.toLocaleString('id-ID')}
                          </span>
                          <span className="text-[10px] bg-red-100 text-red-650 px-2 py-0.5 font-bold rounded-md font-mono">
                            HEMAT Rp {(displayProduct.originalPrice - displayProduct.price).toLocaleString('id-ID')} (-40%)
                          </span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-serif text-brand-dark font-semibold">
                          Rp {displayProduct.price.toLocaleString('id-ID')}
                        </span>
                        <span className="text-xs text-gray-450">/ {displayProduct.volume}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 font-mono tracking-wider block uppercase mb-1">KETERSEDIAAN</span>
                    {displayProduct.stock > 0 ? (
                      <span className="inline-block px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-mono font-medium rounded-full">
                        Hanya Sisa {displayProduct.stock} Botol
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-100 text-[10px] font-mono font-medium rounded-full">
                        Stok Habis
                      </span>
                    )}
                  </div>
                </div>

                {/* Olfactive Pyramid / Perfume Notes Visualization */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-3 font-semibold">Kategori Notes Olfaktori</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gold-50 border border-gold-200/40 p-2.5 rounded-lg">
                      <span className="font-serif font-semibold text-gold-700 block mb-1">Top Notes</span>
                      <div className="flex flex-col gap-1 text-[10px] text-gray-500 font-sans">
                        {displayProduct.notes.top.map((n, i) => (
                          <span key={i} className="truncate">• {n}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gold-50 border border-gold-200/40 p-2.5 rounded-lg">
                      <span className="font-serif font-semibold text-gold-700 block mb-1">Heart Notes</span>
                      <div className="flex flex-col gap-1 text-[10px] text-gray-500 font-sans">
                        {displayProduct.notes.middle.map((n, i) => (
                          <span key={i} className="truncate">• {n}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gold-50 border border-gold-200/40 p-2.5 rounded-lg">
                      <span className="font-serif font-semibold text-gold-700 block mb-1">Base Notes</span>
                      <div className="flex flex-col gap-1 text-[10px] text-gray-500 font-sans">
                        {displayProduct.notes.base.map((n, i) => (
                          <span key={i} className="truncate">• {n}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs for extra information */}
                <div className="border-b border-gray-100 flex gap-6 text-xs font-mono tracking-wider uppercase mb-4">
                  {(['details', 'ingredients', 'shipping'] as const).map((tab) => (
                    <button
                      key={tab}
                      id={`modal-tab-${tab}`}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2.5 border-b-2 font-medium transition-all ${
                        activeTab === tab
                          ? 'border-brand-gold text-brand-gold font-semibold'
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab === 'details' ? 'Filosofi Aroma' : tab === 'ingredients' ? 'Kandungan / Bahan' : 'Pengiriman'}
                    </button>
                  ))}
                </div>

                <div className="min-h-[90px] text-xs text-gray-500 font-sans leading-relaxed mb-6">
                  {activeTab === 'details' && (
                    <p>{displayProduct.longDescription}</p>
                  )}
                  {activeTab === 'ingredients' && (
                    <div className="flex flex-col gap-2">
                      <p className="flex items-center gap-1.5 text-gray-600 font-medium font-serif">
                        <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Bebas Kezaliman Hewani (Cruelty-Free) & Premium Sourcing.
                      </p>
                      <p>
                        Kandungan Alami: <strong className="text-gray-700">92% Botanical Extracts Oils, Alcohol Denat, Aquarich Aqua, Parfum Oil Extract, Geraniol.</strong> Kami menggunakan ekstraksi tumbuhan mentah murni yang diperoleh langsung dari perkebunan bunga lokal mandiri di dataran tinggi guna menjamin konsentrasi Extrait yang tahan lama di kulit sensitif.
                      </p>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="flex flex-col gap-2">
                      <p className="flex items-center gap-1.5 text-brand-dark font-semibold font-serif">
                        <Droplet className="w-3.5 h-3.5 text-brand-gold" /> Dikemas Aman dengan Segel Lilin Eksklusif
                      </p>
                      <p>
                        Semua pengiriman sovairé dikemas dalam kotak berlapis beludru putih tebal dengan segel lilin sovairé buatan tangan untuk mencegah kebocoran. Gratis ongkir ke seluruh wilayah Indonesia meluncur aman beserta asuransi pengiriman penuh.
                      </p>
                    </div>
                  )}
                </div>

                {/* Interactive Purchase controls */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-1 shrink-0 w-full sm:w-auto justify-between">
                    <span className="text-[10px] font-mono text-gray-400 px-3 uppercase tracking-wider font-semibold">Jumlah</span>
                    <div className="flex items-center">
                      <button
                        id="modal-qty-dec"
                        type="button"
                        onClick={handleDecrease}
                        className="w-8 h-8 flex items-center justify-center text-sm hover:bg-white rounded transition-colors text-gray-500 hover:text-black font-semibold"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-mono font-semibold text-brand-dark">
                        {quantity}
                      </span>
                      <button
                        id="modal-qty-inc"
                        type="button"
                        onClick={handleIncrease}
                        className="w-8 h-8 flex items-center justify-center text-sm hover:bg-white rounded transition-colors text-gray-500 hover:text-black font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to cart Action */}
                  <button
                    id={`modal-add-to-cart-${displayProduct.id}`}
                    onClick={() => {
                      onAddToCart(displayProduct, quantity);
                      onClose();
                    }}
                    disabled={displayProduct.stock === 0}
                    className="flex-1 flex items-center justify-center gap-2.5 bg-brand-gold hover:bg-gold-600 gold-btn-gradient text-white font-mono font-medium tracking-widest text-xs uppercase py-4 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-200 disabled:from-gray-200 disabled:to-gray-200 disabled:cursor-not-allowed shadow-md shadow-gold-400/25 w-full active:scale-98"
                  >
                    <ShoppingBag className="w-4.5 h-4.5" /> Masukkan Keranjang
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
