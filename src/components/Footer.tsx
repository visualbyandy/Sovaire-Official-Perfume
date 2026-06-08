import React, { useState } from 'react';
import { Mail, ShieldCheck, MapPin, Phone, MessageSquare, Instagram, ExternalLink, Send } from 'lucide-react';

interface FooterProps {
  onNavigateTo: (id: string) => void;
}

export default function Footer({ onNavigateTo }: FooterProps) {
  const [email, setEmail] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSignedUp(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-gold-400/40 relative font-sans">
      {/* Decorative Golden Ambient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-gray-800">
        
        {/* Col 1: Brand & Slogan Tagline */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl font-display font-medium tracking-[0.2em] text-white uppercase select-none leading-none">
            sovairé
          </h2>
          <span className="text-[10px] text-brand-gold font-mono tracking-widest uppercase mt-1">
            Fragrances d'Éternité
          </span>
          <p className="text-xs text-gray-400 font-serif italic mt-4 max-w-sm leading-relaxed">
            "Scenting Your Elegance: Melukis kemurnian cinta dan kekuatan ambisi Anda di dalam setiap tetes esensi murni kami."
          </p>

          <div className="flex gap-4 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 border border-[#C5A059]/20 hover:border-[#C5A059] text-gray-400 hover:text-white rounded-none transition-colors flex items-center justify-center bg-[#1A1A1A]" referrerPolicy="no-referrer">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#boutique" className="p-2.5 border border-[#C5A059]/20 hover:border-[#C5A059] text-gray-400 hover:text-white rounded-none transition-colors flex items-center justify-center bg-[#1A1A1A]">
              <MapPin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Pathways */}
        <div className="md:col-span-2 flex flex-col items-center md:items-start select-none">
          <h4 className="text-xs font-mono font-bold tracking-widest text-[#C5A059] uppercase mb-5">Butik Navigasi</h4>
          <ul className="space-y-3 text-center md:text-left text-xs text-gray-400">
            {['collection', 'scent-finder', 'philosophy', 'reviews', 'boutique'].map((id) => (
              <li key={id}>
                <button
                  id={`footer-nav-btn-${id}`}
                  onClick={() => onNavigateTo(id)}
                  className="hover:text-brand-gold transition-colors font-medium cursor-pointer"
                >
                  {id === 'collection' ? 'Koleksi Parfum'
                    : id === 'scent-finder' ? 'Interactive Scent Finder'
                    : id === 'philosophy' ? 'Filosofi & Proses Alami'
                    : id === 'reviews' ? 'Aura Ulasan Pelanggan'
                    : 'Kunjungi Butik Offline'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Sincerity / Contact Address */}
        <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left" id="boutique">
          <h4 className="text-xs font-mono font-bold tracking-widest text-[#C5A059] uppercase mb-5">Butik Pusat</h4>
          <div className="space-y-4 text-xs text-gray-400 w-full">
            <p className="flex items-start gap-2 justify-center md:justify-start">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>
                <strong>Sovairé House:</strong><br />
                Jl. Inpres XI No.40 RT.03 RW.05 Kec.Larangan Kel. Gaga,<br />
                Ciledug Tangerang 15154
              </span>
            </p>
            <a href="https://wa.me/6287781857169" target="_blank" rel="noreferrer" className="flex items-center gap-2 justify-center md:justify-start hover:text-brand-gold transition-colors" referrerPolicy="no-referrer">
              <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>087781857169</span>
            </a>
            <p className="flex items-center gap-2 justify-center md:justify-start">
              <MessageSquare className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>maison@soviare.com</span>
            </p>
          </div>
        </div>

        {/* Col 4: Exclusive Newsletter Email Sign up */}
        <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-xs font-mono font-bold tracking-widest text-[#C5A059] uppercase mb-5">Klub Kolektor Eksklusif</h4>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed max-w-sm">
            Bergabunglah dengan jajaran eksklusif penerima newsletter parfum edisi terbatas dan diskon khusus anggota.
          </p>

          {signedUp ? (
            <div className="p-3 bg-gold-900/40 border border-[#C5A059]/40 text-[#C5A059] rounded-none text-xs w-full">
              Sambut Kemewahan! Tim kami telah mendaftarkan surel Anda sebagai Klub Kolektor Eksklusif.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full flex items-center bg-[#1A1A1A] border border-[#C5A059]/30 focus-within:border-[#C5A059] p-1 rounded-none transition-colors">
              <input
                id="footer-newsletter-email"
                type="email"
                required
                placeholder="Surel Anda..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-xs p-2.5 bg-transparent focus:outline-none text-white font-sans placeholder-gray-500"
              />
              <button
                id="footer-newsletter-submit"
                type="submit"
                className="bg-[#C5A059] hover:bg-[#b08d4a] font-mono p-2.5 rounded-none text-white transition-colors cursor-pointer"
                title="Daftar Klub"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Credit terms, fiktif warning, security policies */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-mono tracking-wider">
        <div className="text-center md:text-left uppercase">
          <p>© 2026 sovairé Fragrances Ind. Seluruh hak fiktif dilindungi undang-undang.</p>
          <p className="text-brand-gold/60 mt-0.5 italic">Butik online parfum putih premium dengan bahan pusaka asli alami.</p>
        </div>

        <div className="flex items-center gap-4 uppercase font-semibold">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-brand-gold stroke-[2]" /> SSL SECURE 256-BIT</span>
          <span className="text-gray-700">|</span>
          <span>BCA, Mandiri, Visa, Mastercard</span>
        </div>
      </div>

    </footer>
  );
}
