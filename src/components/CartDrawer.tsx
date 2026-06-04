import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Product } from '../types';
import { MOCK_COUPONS } from '../data';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Percent, CheckCircle, Receipt, ArrowLeft, ShieldPlus, Phone } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; isFlat: boolean } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  
  // Checkout Shipping Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'free' | 'express'>('free');
  const [currentWaUrl, setCurrentWaUrl] = useState('');

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.isFlat) {
      discountAmount = appliedCoupon.discount;
    } else {
      discountAmount = subtotal * appliedCoupon.discount;
    }
  }

  const shippingCost = shippingMethod === 'express' ? 120000 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    const codeUpper = couponCode.toUpperCase().trim();
    if (codeUpper === 'SOVIAREGOLD') {
      setAppliedCoupon({ code: codeUpper, discount: 0.10, isFlat: false });
      setCouponCode('');
    } else if (codeUpper === 'WELCOMESOVIARE') {
      setAppliedCoupon({ code: codeUpper, discount: 150000, isFlat: true });
      setCouponCode('');
    } else {
      setCouponError('Kode diskon tidak terdaftar.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      return;
    }

    const waNumber = '6287781857169';
    const itemsText = cartItems
      .map(
        (item) =>
          `• *Sovairé ${item.product.name}* (x${item.quantity}) - Rp ${(
            item.product.price * item.quantity
          ).toLocaleString('id-ID')}`
      )
      .join('\n');

    const discountText = appliedCoupon
      ? `\n- *Diskon (${appliedCoupon.code}):* - Rp ${discountAmount.toLocaleString('id-ID')}`
      : '';
    const totalText = `Rp ${grandTotal.toLocaleString('id-ID')}`;

    const message = `Halo Sovairé, saya ingin melakukan pemesanan parfum:

*DATA PENERIMA*
- *Nama:* ${fullName}
- *No. Telepon:* ${phone}
- *Alamat:* ${address}

*DETAIL PESANAN*
${itemsText}${discountText}
- *TOTAL PEMBAYARAN:* ${totalText}

Terima kasih.`;

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    setCurrentWaUrl(waUrl);

    try {
      window.open(waUrl, '_blank');
    } catch (err) {
      console.warn("Popup blocked or not supported in this frame environment:", err);
    }

    setCheckoutStep('success');
  };

  const handleCloseAndReset = () => {
    onClose();
    // Wait for animation
    setTimeout(() => {
      setCheckoutStep('cart');
      setAppliedCoupon(null);
      setFullName('');
      setPhone('');
      setAddress('');
      setIsCheckingOut(false);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans text-brand-dark">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseAndReset}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Drawer container Right side */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
              className="w-screen max-w-md bg-white border-l border-gold-300 shadow-2xl flex flex-col h-full"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-gold-100 flex items-center justify-between bg-gold-50/50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-gold" />
                  <h2 className="text-md font-serif font-semibold tracking-wider uppercase">
                    {checkoutStep === 'success' ? 'Pesanan Selesai' : checkoutStep === 'shipping' ? 'Detail Pengiriman' : 'Keranjang Anda'}
                  </h2>
                </div>
                <button
                  id="close-cart-drawer"
                  onClick={handleCloseAndReset}
                  className="p-1.5 hover:bg-gold-100/60 rounded-full text-gray-400 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
                {checkoutStep === 'cart' && (
                  <>
                    {cartItems.length > 0 ? (
                      <div className="flex-1 flex flex-col justify-between">
                        {/* Item list */}
                        <div className="divide-y divide-gold-100/60 flex-1 pr-1">
                          {cartItems.map((item) => (
                            <div key={item.product.id} className="py-4 flex gap-4">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                referrerPolicy="no-referrer"
                                className="w-20 h-20 object-contain bg-gold-50 border border-gold-200/50 rounded-xl p-1 shrink-0"
                              />
                              <div className="flex-1 flex flex-col justify-center">
                                <span className="text-[10px] text-gold-600 font-mono tracking-wider block uppercase">{item.product.scentFamily}</span>
                                <h3 className="text-sm font-serif font-medium text-brand-dark uppercase tracking-wide">SOVAIRÉ {item.product.name}</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-xs font-mono font-medium text-gold-700">
                                    Rp {item.product.price.toLocaleString('id-ID')}
                                  </span>
                                  {item.product.originalPrice && (
                                    <span className="text-[10px] font-mono line-through text-gray-400">
                                      Rp {item.product.originalPrice.toLocaleString('id-ID')}
                                    </span>
                                  )}
                                </div>

                                {/* Quantity Counter & Remove */}
                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center border border-gray-100 rounded bg-gray-50 p-0.5">
                                    <button
                                      id={`cart-qty-dec-${item.product.id}`}
                                      onClick={() => item.quantity > 1 && onUpdateQuantity(item.product.id, item.quantity - 1)}
                                      className="w-6 h-6 flex items-center justify-center text-xs hover:bg-white rounded transition-colors text-gray-500 font-bold"
                                    >
                                      -
                                    </button>
                                    <span className="w-7 text-center text-xs font-mono font-semibold text-brand-dark">
                                      {item.quantity}
                                    </span>
                                    <button
                                      id={`cart-qty-inc-${item.product.id}`}
                                      onClick={() => item.quantity < item.product.stock && onUpdateQuantity(item.product.id, item.quantity + 1)}
                                      className="w-6 h-6 flex items-center justify-center text-xs hover:bg-white rounded transition-colors text-gray-500 font-bold"
                                    >
                                      +
                                    </button>
                                  </div>

                                  <button
                                    id={`cart-remove-${item.product.id}`}
                                    onClick={() => onRemoveItem(item.product.id)}
                                    className="p-1 hover:text-red-600 text-gray-400 rounded transition-colors active:scale-95"
                                    title="Hapus Item"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Promotion coupon Section */}
                        <div className="mt-6 pt-6 border-t border-gold-100">
                          {appliedCoupon ? (
                            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                                <Percent className="w-4 h-4 text-emerald-600" />
                                <div>
                                  <p className="font-semibold uppercase tracking-wider font-mono text-[11px]">{appliedCoupon.code}</p>
                                  <p className="text-[10px] text-emerald-600">Diskon Berhasil Diaktifkan</p>
                                </div>
                              </div>
                              <button
                                id="remove-coupon-btn"
                                onClick={handleRemoveCoupon}
                                className="text-[10px] font-mono font-bold text-red-600 hover:text-red-800 tracking-wider uppercase border border-red-200 rounded px-2 py-1"
                              >
                                Hapus
                              </button>
                            </div>
                          ) : (
                            <form onSubmit={handleApplyCoupon} className="flex gap-2">
                              <input
                                id="coupon-input"
                                type="text"
                                placeholder="Punya kode diskon? (e.g. SOVIAREGOLD)"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="flex-1 text-xs p-3 border border-gray-200 focus:border-brand-gold rounded-lg focus:outline-none bg-white placeholder-gray-400 tracking-wide font-sans text-brand-dark"
                              />
                              <button
                                id="apply-coupon-btn"
                                type="submit"
                                className="bg-brand-dark hover:bg-gold-900 text-white px-4 py-3 rounded-lg text-xs font-mono uppercase tracking-widest transition-colors shrink-0"
                              >
                                Terapkan
                              </button>
                            </form>
                          )}
                          {couponError && (
                            <p className="text-[10px] text-red-600 mt-1.5 font-mono ml-1">
                              * {couponError}
                            </p>
                          )}
                          <div className="mt-2 text-[10px] text-gray-400 flex justify-between px-1">
                            <span>Promo aktif: <strong>SOVIAREGOLD</strong> (10%)</span>
                            <span>atau <strong>WELCOMESOVIARE</strong> (Rp150k)</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 py-16">
                        <ShoppingBag className="w-14 h-14 text-gold-200 stroke-[1.2] mb-4" />
                        <h3 className="font-serif font-medium text-brand-dark text-base mb-1">Keranjang masih kosong</h3>
                        <p className="text-xs text-gray-400 max-w-[240px] leading-relaxed">
                          Kemewahan tidak datang bagi mereka yang bimbang. Jelajahi butik dan tambahkan parfum mewah Anda.
                        </p>
                        <button
                          id="cart-back-to-shop"
                          onClick={onClose}
                          className="mt-6 text-xs font-mono font-semibold text-gold-700 hover:text-brand-gold border-b border-gold-400 pb-0.5 hover:border-brand-gold"
                        >
                          Lanjut Berbelanja
                        </button>
                      </div>
                    )}
                  </>
                )}
                {checkoutStep === 'shipping' && (
                  <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1.5 font-medium">Nama Lengkap Penerima</label>
                        <input
                          id="ship-name"
                          type="text"
                          required
                          placeholder="Suryo Hadi Kusumo"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full text-xs p-3 bg-white border border-[#C5A059]/20 focus:border-[#C5A059] rounded-none focus:outline-none text-[#1A1A1A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1.5 font-medium">Nomor Telepon aktif</label>
                        <input
                          id="ship-phone"
                          type="tel"
                          required
                          placeholder="e.g. 081234567890"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full text-xs p-3 bg-white border border-[#C5A059]/20 focus:border-[#C5A059] rounded-none focus:outline-none text-[#1A1A1A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1.5 font-medium">Alamat Lengkap Pengiriman</label>
                        <textarea
                          id="ship-address"
                          required
                          rows={3}
                          placeholder="Jalan Kebon Jeruk No 14, RT 02/09, Jakarta Barat 11530"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full text-xs p-3 bg-white border border-[#C5A059]/20 focus:border-[#C5A059] rounded-none focus:outline-none text-[#1A1A1A] resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#C5A059]/10 flex gap-3">
                      <button
                        id="ship-back-btn"
                        type="button"
                        onClick={() => setCheckoutStep('cart')}
                        className="flex-1 border border-[#C5A059]/20 hover:border-[#C5A059] text-gold-700 px-4 py-3.5 rounded-none text-xs font-mono font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Kembali
                      </button>
                      <button
                        id="ship-submit-btn"
                        type="submit"
                        className="flex-1 bg-[#C5A059] hover:bg-[#b08d4a] text-white px-4 py-3.5 rounded-none text-xs font-mono font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Lanjutkan ke Pemesanan <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}

                {checkoutStep === 'success' && (
                  <div className="flex-1 flex flex-col justify-center items-center text-center py-6">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full mb-5">
                      <CheckCircle className="w-10 h-10 animate-bounce" />
                    </div>
                    <span className="text-[10px] text-emerald-700 font-mono tracking-[0.25em] uppercase font-bold block mb-1">
                      Transaksi Selesai
                    </span>
                    <h3 className="text-xl font-serif text-brand-dark font-medium mb-3">Pesanan Berhasil Diproses!</h3>
                    <p className="text-xs text-gray-500 max-w-[280px] leading-relaxed mb-6">
                      Sistem mencoba membuka halaman WhatsApp untuk menghubungkan Anda dengan petugas butik kami. Jika tidak terbuka otomatis, silakan klik tombol hijau di bawah ini:
                    </p>

                    {/* WhatsApp Resilient Button Accent */}
                    {currentWaUrl && (
                      <a
                        href={currentWaUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-3.5 px-4 rounded-lg text-xs font-mono font-medium tracking-widest uppercase transition-colors flex items-center justify-center gap-2 mb-4 shadow-sm"
                      >
                        <Phone className="w-4 h-4 fill-white" /> Kirim Detail ke WhatsApp
                      </a>
                    )}

                    {/* Receipt Details card */}
                    <div className="bg-gold-50/50 border border-gold-300/60 rounded-2xl p-5 text-left w-full max-w-sm mb-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-100/50 via-transparent to-transparent pointer-events-none"></div>
                      <h4 className="text-xs font-mono font-bold text-gold-700 uppercase tracking-widest pb-3 border-b border-gold-100 mb-3 flex items-center gap-1.5">
                        <Receipt className="w-4 h-4 text-brand-gold" /> STRUK PESANAN SOVAIRÉ
                      </h4>
                      <div className="space-y-2 text-[11px] font-sans">
                        <p className="flex justify-between text-gray-500">
                          <span>Penerima:</span>
                          <strong className="text-brand-dark">{fullName}</strong>
                        </p>
                        <p className="flex justify-between text-gray-500">
                          <span>Kontak:</span>
                          <span className="text-brand-dark">{phone}</span>
                        </p>
                        <div className="border-t border-dashed border-gold-200 my-2 pt-2">
                          {cartItems.map((item) => (
                            <p key={item.product.id} className="flex justify-between text-xs text-gray-600 mb-1">
                              <span className="uppercase">SOVAIRÉ {item.product.name} (x{item.quantity})</span>
                              <span className="font-mono">Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}</span>
                            </p>
                          ))}
                        </div>
                        {appliedCoupon && (
                          <p className="flex justify-between text-emerald-700 text-xs my-1 font-semibold">
                            <span>Diskon ({appliedCoupon.code}):</span>
                            <span className="font-mono">- Rp {discountAmount.toLocaleString('id-ID')}</span>
                          </p>
                        )}
                        <p className="flex justify-between text-gray-500 font-semibold border-t border-gold-200 pt-2 text-md text-brand-dark mt-2 font-serif bg-gold-200/20 p-2 rounded-lg">
                          <span>TOTAL AKHIR:</span>
                          <span className="font-mono text-gold-700 font-bold">Rp {grandTotal.toLocaleString('id-ID')}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      id="checkout-success-close"
                      onClick={() => {
                        onClearCart();
                        handleCloseAndReset();
                      }}
                      className="w-full bg-brand-dark hover:bg-gold-900 border border-brand-dark text-white py-3.5 rounded-lg text-xs font-mono font-medium tracking-widest uppercase transition-colors"
                    >
                      Kembali ke Butik Utama
                    </button>
                  </div>
                )}
              </div>

              {/* Sticky bottom total summary */}
              {cartItems.length > 0 && checkoutStep === 'cart' && (
                <div className="bg-gold-50/50 border-t border-gold-200 px-6 py-5 space-y-4">
                  <div className="space-y-1.5 text-xs font-sans text-gray-500">
                    <p className="flex justify-between">
                      <span>Subtotal Belanja:</span>
                      <span className="font-mono text-brand-dark">Rp {subtotal.toLocaleString('id-ID')}</span>
                    </p>
                    {appliedCoupon && (
                      <p className="flex justify-between text-emerald-700 font-medium">
                        <span>Diskon ({appliedCoupon.code}):</span>
                        <span className="font-mono">- Rp {discountAmount.toLocaleString('id-ID')}</span>
                      </p>
                    )}
                    <div className="pt-2 border-t border-gold-200 flex justify-between text-sm text-brand-dark font-serif font-bold">
                      <span>TOTAL PEMBAYARAN:</span>
                      <span className="font-mono text-gold-700 text-lg">Rp {grandTotal.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <button
                    id="trigger-checkout-step"
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full bg-brand-gold hover:bg-gold-600 gold-btn-gradient text-white py-4 px-6 rounded-lg text-xs font-mono font-medium tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md shadow-gold-500/20"
                  >
                    Lanjutkan ke Pemesanan <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <p className="text-[9px] text-gray-400 text-center font-sans tracking-wide leading-relaxed flex items-center justify-center gap-1">
                    <ShieldPlus className="w-3 h-3 text-brand-gold stroke-[2.5]" /> Pembayaran aman terenkripsi fiktif & dilindungi garansi sovairé.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
