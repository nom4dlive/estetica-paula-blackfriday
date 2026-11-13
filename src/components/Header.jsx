import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { CLINIC_PHONE } from '../utils/whatsapp';
import PaulaLogo from './brand/PaulaLogo';

export default function Header({ onSelectPackageClick }) {
  return (
    <header className="sticky top-0 z-50 bg-[#07090E]/95 backdrop-blur-md border-b border-[#CBB68B]/20 transition-luxury">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#9B855A] via-[#CBB68B] to-[#9B855A] text-black py-1.5 px-4 text-center text-xs font-semibold tracking-wide shadow-sm">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          BLACK FRIDAY OFICIAL 2026 • Realização obrigatória das sessões ainda em 2026 • Vagas limitadas!
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          {/* Dra. Paula Circular Portrait */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#CBB68B] overflow-hidden bg-slate-900 shadow-md shadow-[#CBB68B]/10 shrink-0">
            <img
              src="./assets/stitch/stitch_13_c4c0bc5c7b.jpg"
              alt="Dra. Paula Feliciano"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Official Vector Logo Component */}
          <PaulaLogo.Horizontal
            className="h-10 sm:h-11"
            textColor="text-white"
            goldColor="#CBB68B"
            showCredentials={true}
          />
        </div>

        {/* Action Buttons with Motion-UI Tap Physics */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onSelectPackageClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-[#CBB68B] transition-colors tap-luxury"
          >
            Ver Pacotes
          </button>
          
          <a
            href={`https://wa.me/${CLINIC_PHONE}?text=${encodeURIComponent('Olá Dra. Paula! Tenho dúvidas sobre os pacotes da Black Friday 2026.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-900/30 tap-luxury transition-luxury"
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
