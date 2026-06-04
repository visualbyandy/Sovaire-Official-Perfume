import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Review, Product } from '../types';
import { Star, CheckCircle, MessageSquarePlus, PenTool, Sparkles } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  products: Product[];
  onAddReview: (review: Review) => void;
}

export default function ReviewsSection({ reviews, products, onAddReview }: ReviewsSectionProps) {
  const [selectedProductReview, setSelectedProductReview] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [productId, setProductId] = useState(products[0]?.id || '');
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const filteredReviews = selectedProductReview === 'all'
    ? reviews
    : reviews.filter(rev => rev.productId === selectedProductReview);

  // Calculate overall stats
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviews.length > 0
      ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100
      : 0
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      setErrorMessage('Harap isi nama Anda dan ulasan secara lengkap.');
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      author: authorName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      isVerified: true // Mocked purchase certification
    };

    onAddReview(newReview);
    
    // Clear state
    setAuthorName('');
    setComment('');
    setRating(5);
    setIsFormOpen(false);
    setErrorMessage('');
  };

  return (
    <div className="py-16 bg-white border-b border-[#C5A059]/20" id="reviews">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-gold-650 font-sans text-[11px] tracking-[0.25em] uppercase block mb-2 font-medium">
            Aura Kejujuran
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] font-light tracking-tight">
            Bagaimana Kesan Mereka?
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-500 font-sans text-xs max-w-lg mx-auto">
            Testimoni jujur dari para pecinta parfum termasyhur yang telah merasakan keagungan aroma kami.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-4 bg-white border border-[#C5A059]/20 p-6 rounded-none text-center flex flex-col justify-center items-center shadow-xs">
            <h3 className="text-6xl font-serif text-[#C5A059] font-light mb-2">{averageRating}</h3>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    s <= Math.round(parseFloat(averageRating))
                      ? 'fill-[#C5A059] text-[#C5A059]'
                      : 'text-gray-150'
                  }`}
                />
              ))}
            </div>
            <p className="text-[10px] text-gray-400 font-mono tracking-wide uppercase">
              Rata-rata dari {reviews.length} Ulasan Terverifikasi
            </p>
          </div>

          <div className="md:col-span-4 bg-white border border-[#C5A059]/20 p-6 rounded-none flex flex-col gap-2.5 shadow-xs">
            {ratingCounts.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="font-mono text-gray-500 w-3">{stars}</span>
                <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059] shrink-0" />
                <div className="flex-1 bg-gray-100 h-1 overflow-hidden">
                  <div
                    className="bg-[#C5A059] h-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="font-mono text-gray-400 w-8 text-right text-[10px]">{count} ulasan</span>
              </div>
            ))}
          </div>

          <div className="md:col-span-4 bg-white border border-[#C5A059]/20 p-6 rounded-none flex flex-col justify-center items-center shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-100/40 via-transparent to-transparent pointer-events-none"></div>
            <p className="text-xs font-sans text-gray-500 text-center mb-5 max-w-[200px] leading-relaxed">
              Punya pengalaman berharga dengan botol parfum sovairé Anda?
            </p>
            <button
              id="write-review-btn"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#C5A059] border border-transparent text-white px-6 py-3.5 rounded-none text-[11px] font-mono font-medium tracking-widest uppercase transition-all duration-300 shadow-sm cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" /> Tulis Ulasan
            </button>
          </div>
        </div>

        {/* Review Form Drawer/Collapse */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-12"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-brand-gold/60 p-6 md:p-8 rounded-2xl shadow-md max-w-2xl mx-auto relative"
              >
                <h3 className="text-lg font-serif text-brand-dark font-medium mb-6 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-brand-gold" /> Bagikan Kesan Anda
                </h3>

                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-sans">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1.5 font-medium">
                      Nama Lengkap Anda
                    </label>
                    <input
                      id="rev-author-name"
                      type="text"
                      required
                      placeholder="Contoh: Dian Sastrowardoyo"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full text-sm p-3 bg-white border border-gray-200 focus:border-brand-gold rounded-lg focus:outline-none transition-colors font-sans text-brand-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1.5 font-medium">
                      Pilih Parfum yang Diulas
                    </label>
                    <select
                      id="rev-product-select"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      className="w-full text-sm p-3 bg-white border border-gray-200 focus:border-brand-gold rounded-lg focus:outline-none transition-colors font-sans text-brand-dark"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          SOVAIRÉ {p.name.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1.5 font-medium">
                    Beri Penilaian Bintang
                  </label>
                  <div className="flex gap-1.5 items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        id={`star-btn-${star}`}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(null)}
                        className="p-1 transition-transform active:scale-95"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoveredRating ?? rating)
                              ? 'fill-brand-gold text-brand-gold'
                              : 'text-gray-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-gray-400 ml-3 italic">
                      {(hoveredRating ?? rating) === 5 ? 'Sangat Sempurna!'
                        : (hoveredRating ?? rating) === 4 ? 'Sangat Bagus'
                        : (hoveredRating ?? rating) === 3 ? 'Cukup Puas'
                        : (hoveredRating ?? rating) === 2 ? 'Kurang Memuaskan'
                        : 'Sangat Buruk'}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[11px] font-mono text-gray-400 uppercase mb-2 font-medium">
                    Tulis Ulasan jujur Anda
                  </label>
                  <textarea
                    id="rev-comment-text"
                    required
                    rows={4}
                    placeholder="Ceritakan pengalaman Anda mengenai top notes, medium notes, ketahanan aroma, keserasian botol, dsb..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full text-sm p-3 bg-white border border-gray-200 focus:border-brand-gold rounded-lg focus:outline-none transition-colors font-sans text-brand-dark leading-relaxed resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    id="cancel-review"
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2.5 text-xs font-mono text-gray-400 hover:text-gray-600 transition-colors uppercase border border-transparent"
                  >
                    Batal
                  </button>
                  <button
                    id="submit-review-btn"
                    type="submit"
                    className="bg-brand-gold hover:bg-gold-600 gold-btn-gradient text-white px-5 py-3 rounded-lg text-xs font-mono font-medium tracking-wider uppercase transition-all duration-300 shadow-sm"
                  >
                    Kirim Ulasan
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter and Reviews list */}
        <div className="bg-white border border-gold-200/60 rounded-3xl p-6 md:p-8 shadow-sm">
          {/* Header filter */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gold-100 mb-6">
            <h3 className="text-md font-serif text-brand-dark font-semibold uppercase tracking-wider">
              Ulasan Pengguna ({filteredReviews.length})
            </h3>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400 uppercase">Saring berdasarkan:</span>
              <select
                id="review-filter-dropdown"
                value={selectedProductReview}
                onChange={(e) => setSelectedProductReview(e.target.value)}
                className="text-xs font-sans p-2 bg-gold-50 border border-gold-200/60 rounded-md focus:outline-none focus:border-brand-gold text-brand-dark"
              >
                <option value="all">Semua Koleksi SOVAIRÉ</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    SOVAIRÉ {p.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Testimonies lists */}
          {filteredReviews.length > 0 ? (
            <div className="divide-y divide-gold-100/60">
              {filteredReviews.map((rev) => {
                const associatedProduct = products.find(p => p.id === rev.productId);
                return (
                  <div key={rev.id} className="py-6 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <h4 className="font-serif text-brand-dark font-medium text-sm flex items-center gap-2">
                          {rev.author}
                          {rev.isVerified && (
                            <span className="inline-flex items-center text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 gap-1 px-1.5 py-0.5 rounded-full font-mono font-semibold">
                              <CheckCircle className="w-3 h-3 fill-emerald-100" /> TERVERIFIKASI
                            </span>
                          )}
                        </h4>
                        <span className="text-[10px] font-mono text-gray-400 uppercase mt-0.5 block">
                          Mengulas parfum <span className="font-semibold text-gold-600">SOVAIRÉ {associatedProduct?.name?.toUpperCase()}</span>
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 shrink-0">{rev.date}</span>
                    </div>

                    <div className="flex gap-0.5 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating
                              ? 'fill-brand-gold text-brand-gold'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs md:text-sm font-sans text-gray-500 leading-relaxed max-w-4xl select-none">
                      "{rev.comment}"
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400 font-sans text-xs flex flex-col items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-gold-300 stroke-[1.5]" />
              Belum ada ulasan untuk wewangian ini. Jadilah yang pertama memberikan ulasan!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
