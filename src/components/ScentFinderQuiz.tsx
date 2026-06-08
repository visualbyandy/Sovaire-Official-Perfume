import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS, PERFUMES } from '../data';
import { Product } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, ShoppingBag, Eye } from 'lucide-react';

interface ScentFinderQuizProps {
  key?: number | string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ScentFinderQuiz({ onSelectProduct, onAddToCart }: ScentFinderQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resultProduct, setResultProduct] = useState<Product | null>(null);

  const handleOptionSelect = (optionValue: string) => {
    const newAnswers = [...answers, optionValue];
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    // Count frequencies or map directly to scent vibes
    // majestic/marble-chamber/charismatic -> L'Éclat Noctera (soviare-eclat)
    // mysterious/starry-gala/unforgettable -> Zephran (soviare-zephran)

    const scores = {
      'Soviare-Noctera': 0,
      'Soviare-Zephran': 0,
    };

    finalAnswers.forEach(ans => {
      if (['majestic', 'marble-chamber', 'charismatic'].includes(ans)) {
        scores['Soviare-Noctera'] += 2;
      }
      if (['mysterious', 'starry-gala', 'unforgettable'].includes(ans)) {
        scores['Soviare-Zephran'] += 2;
      }
    });

    // Default ties logic or find highest
    let bestProductId = 'Soviare-Noctera';
    let highestScore = -1;

    Object.entries(scores).forEach(([pId, score]) => {
      if (score > highestScore) {
        highestScore = score;
        bestProductId = pId;
      }
    });

    const recommendation = PERFUMES.find(p => p.id === bestProductId) || PERFUMES[0];
    setResultProduct(recommendation);
    setShowResult(true);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const newAnswers = [...answers];
      newAnswers.pop();
      setAnswers(newAnswers);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
    setResultProduct(null);
  };

  return (
    <div className="py-16 bg-[#F9F7F2]/40 border-y border-[#C5A059]/20" id="scent-finder">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-gold-650 font-sans text-[11px] tracking-[0.25em] uppercase block mb-2 font-medium">
            Interaktif Scent Finder
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] font-light tracking-tight">
            Temukan Aroma <span className="italic">Signature</span> Anda
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-500 font-sans text-xs max-w-lg mx-auto">
            Jawab 3 pertanyaan personal berikut untuk mengetahui parfum sovairé mana yang mewakili jiwa dan elegansi Anda.
          </p>
        </div>

        <div className="relative overflow-hidden bg-white border border-[#C5A059]/20 p-8 md:p-12 rounded-none shadow-xs">
          {/* Subtle elegant design accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-200/30 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gold-200/30 via-transparent to-transparent pointer-events-none"></div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {/* Progress bar */}
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs font-mono text-gold-600 tracking-wider font-semibold">
                    PERTANYAAN {currentStep + 1} DARI {QUIZ_QUESTIONS.length}
                  </span>
                  <div className="w-48 bg-[#F3ECE0] h-[1px] overflow-hidden">
                    <div
                      className="bg-[#C5A059] h-full transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-serif text-brand-dark font-medium mb-6 leading-relaxed">
                  {QUIZ_QUESTIONS[currentStep].question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {QUIZ_QUESTIONS[currentStep].options.map((option) => (
                    <button
                      key={option.value}
                      id={`quiz-opt-${option.value}`}
                      onClick={() => handleOptionSelect(option.value)}
                      className="text-left p-5 bg-white hover:bg-[#F9F7F2]/40 border border-[#C5A059]/15 hover:border-[#C5A059] transition-all duration-300 rounded-none group relative overflow-hidden cursor-pointer"
                    >
                      <div className="absolute top-0 left-0 w-[3px] h-full bg-[#C5A059] scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                      <p className="font-serif text-brand-dark font-medium text-base group-hover:text-gold-700 transition-colors">
                        {option.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-2 font-sans group-hover:text-gray-500 transition-colors leading-relaxed">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>

                {currentStep > 0 && (
                  <button
                    id="quiz-back-btn"
                    onClick={handlePrev}
                    className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-brand-gold transition-colors font-medium border-b border-transparent hover:border-brand-gold pb-0.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Kembali
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center relative z-10"
              >
                <div className="inline-flex items-center justify-center p-3 bg-gold-200/20 text-[#C5A059] rounded-none mb-4 border border-[#C5A059]/25">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-gold-650 tracking-[0.25em] uppercase block mb-1">
                  Rekomendasi Karakter Scent Anda
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-[#1A1A1A] tracking-[0.18em] uppercase mb-2">
                  SOVAIRÉ {resultProduct?.name}
                </h3>
                <p className="text-xs italic text-gold-600 font-serif mb-8 select-none">
                  "{resultProduct?.tagline}"
                </p>

                {resultProduct && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#F9F7F2]/30 p-6 rounded-none border border-[#C5A059]/20 text-left max-w-3xl mx-auto mb-8 shadow-xs">
                    <div className="md:col-span-5 flex justify-center">
                      <img
                        src={resultProduct.image}
                        alt={resultProduct.name}
                        referrerPolicy="no-referrer"
                        className="w-48 h-48 object-contain rounded-none hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="md:col-span-7 flex flex-col justify-center">
                      <span className="inline-block px-3 py-1 bg-[#F9F7F2] border border-[#C5A059]/20 text-[#C5A059] text-[9px] font-mono rounded-none w-max mb-3 uppercase tracking-widest">
                        {resultProduct.scentFamily}
                      </span>
                      <p className="text-xs font-sans text-gray-500 mb-4 leading-relaxed">
                        {resultProduct.description}
                      </p>
                      
                      <div className="mb-4">
                        <span className="text-[9px] font-mono text-gray-400 block mb-1.5 uppercase tracking-widest">Aroma Notes Inti:</span>
                        <div className="flex flex-wrap gap-2">
                          {resultProduct.notes.middle.map((note, idx) => (
                            <span key={idx} className="text-[10px] bg-white border border-[#C5A059]/10 px-2 py-1 rounded-none text-gray-600 font-sans uppercase tracking-wider">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 mb-6">
                        {resultProduct.originalPrice && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono line-through text-gray-400">
                              Rp {resultProduct.originalPrice.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[9px] font-mono bg-red-50 text-red-650 px-1 font-bold rounded-xs">
                              -40%
                            </span>
                          </div>
                        )}
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-serif text-[#1A1A1A] font-medium">
                            Rp {resultProduct.price.toLocaleString('id-ID')}
                          </span>
                          <span className="text-[9px] text-gray-400 font-sans">/ {resultProduct.volume}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          id={`quiz-add-to-cart-${resultProduct.id}`}
                          onClick={() => onAddToCart(resultProduct)}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#b08d4a] text-white px-5 py-3 rounded-none text-xs font-mono font-medium tracking-widest uppercase transition-all duration-300 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Beli Sekarang
                        </button>
                        <button
                          id={`quiz-view-detail-${resultProduct.id}`}
                          onClick={() => onSelectProduct(resultProduct)}
                          className="flex items-center justify-center gap-2 border border-[#C5A059]/30 hover:border-[#C5A059] text-[#1a1a1a] hover:bg-[#F9F7F2] px-5 py-3 rounded-none text-xs font-mono font-medium tracking-widest uppercase transition-all duration-300 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> Detail Lilin & Botol
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  id="quiz-retry-btn"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-brand-gold transition-colors font-medium border border-[#C5A059]/20 hover:border-[#C5A059] px-4 py-2.5 rounded-none bg-white shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Ulangi Scent Quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
