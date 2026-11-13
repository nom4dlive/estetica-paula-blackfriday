import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { CLINIC_PHONE } from '../utils/whatsapp';

export default function Header({ onSelectPackageClick }) {
  return (
    <header className="sticky top-0 z-50 bg-[#07090E]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black py-1 px-4 text-center text-xs font-semibold tracking-wide">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          BLACK FRIDAY OFICIAL 2026 • Realização obrigatória das sessões ainda em 2026 • Vagas limitadas!
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-slate-900 shadow-md shadow-amber-500/10">
            <img
              src="/assets/img_2b66.jpg"
              alt="Dra. Paula Feliciano"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide flex items-center gap-1.5">
              DRA. PAULA FELICIANO
            </h1>
            <p className="text-[11px] sm:text-xs text-amber-400 font-medium tracking-widest uppercase">
              Estética Avançada • Biomédica
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onSelectPackageClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors"
          >
            Ver Pacotes
          </button>
          
          <a
            href={`https://wa.me/${CLINIC_PHONE}?text=${encodeURIComponent('Olá Dra. Paula! Tenho dúvidas sobre os pacotes da Black Friday 2026.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-emerald-900/30"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden xs:inline">Falar no WhatsApp</span>
            <span className="xs:hidden">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
