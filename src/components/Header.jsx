import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { CLINIC_PHONE } from '../utils/whatsapp';
import PaulaLogo from './brand/PaulaLogo';
import { stitchAssets } from '../assets/stitch/index.js';

export default function Header({ onSelectPackageClick }) {
  return (
    <header className="sticky top-0 z-50 bg-[#07090E]/95 backdrop-blur-md border-b border-[#D4AF37]/25 transition-luxury">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#991B1B] text-white py-1.5 px-4 text-center text-xs font-bold tracking-wider shadow-sm flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span>BLACK FRIDAY VIP 2026 • Realização das sessões ainda em 2026 • Lote Limitado</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          {/* Dra. Paula Circular Portrait */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-slate-900 shadow-md shadow-[#D4AF37]/20 shrink-0">
            <img
              src={stitchAssets.doctorAvatar}
              alt="Dra. Paula Feliciano"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Official Vector Logo Component */}
          <PaulaLogo.Horizontal
            className="h-10 sm:h-11"
            textColor="text-white"
            goldColor="#D4AF37"
            showCredentials={true}
          />
        </div>

        {/* Action Buttons with Motion-UI Tap Physics */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onSelectPackageClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-[#FFDF73] transition-colors tap-luxury"
          >
            Ver Pacotes
          </button>
          
          <a
            href={`https://wa.me/${CLINIC_PHONE}?text=${encodeURIComponent('Olá, Dra. Paula Feliciano! Gostaria de garantir minha condição VIP Black Friday 2026.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#10B981] hover:bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/40 tap-luxury transition-luxury"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden xs:inline">WhatsApp VIP</span>
            <span className="xs:hidden">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
