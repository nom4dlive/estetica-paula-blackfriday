import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, ZoomIn, X } from 'lucide-react';
import { formatCurrency } from '../utils/masks';

export default function PackageCard({ pkg, isSelected, onSelect }) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const savings = pkg.originalPrice - pkg.pixPrice;
  const discountPercent = Math.round((savings / pkg.originalPrice) * 100);

  return (
    <div
      onClick={() => onSelect(pkg)}
      className={`relative rounded-3xl overflow-hidden cursor-pointer tap-luxury transition-luxury flex flex-col justify-between w-full max-w-sm mx-auto ${
        isSelected
          ? 'ring-2 ring-[#D4AF37] bg-[#0C101A] shadow-2xl shadow-[#D4AF37]/20 transform -translate-y-1'
          : 'bg-[#0A0D16]/95 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:bg-[#0E1322]'
      }`}
    >
      {/* Top Image & Badges */}
      <div>
        {/* Photo Container - Exact 4:5 Aspect Ratio matching the 1122x1402 artwork */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomOpen(true);
          }}
          className="relative w-full aspect-[4/5] overflow-hidden bg-[#05070B] group cursor-zoom-in"
          title="Clique para ver o resultado de Antes & Depois em tela cheia"
        >
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Promotional Tag */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-md ${pkg.badgeColor}`}>
              {pkg.badge}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-red-600 text-white shadow-md">
              -{discountPercent}%
            </span>
          </div>

          {/* Selected marker */}
          {isSelected && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black px-3 py-1 rounded-full text-[11px] font-black flex items-center gap-1 shadow-xl z-10 animate-pulse pointer-events-none">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              SELECIONADO
            </div>
          )}

          {/* Hover zoom indicator */}
          <div className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-md text-[#FFDF73] text-[10px] font-bold px-2 py-1 rounded-md border border-[#D4AF37]/40 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
            <ZoomIn className="w-3 h-3 text-[#FFDF73]" />
            <span>Toque p/ zoom</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {/* Category & Session label (Clean and unobstructed below image) */}
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="bg-[#05070B] px-2.5 py-0.5 rounded text-[11px] font-bold text-[#FFDF73] border border-[#D4AF37]/35 shadow-sm">
              {pkg.category}
            </span>
            <span className="bg-[#05070B] px-2.5 py-0.5 rounded text-[11px] font-medium text-slate-300 border border-slate-800 shadow-sm">
              {pkg.sessions}
            </span>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-snug">
              {pkg.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {pkg.tagline}
            </p>
          </div>

          {/* Price Box */}
          <div className="bg-[#05070B] border border-[#D4AF37]/25 rounded-2xl p-3.5 space-y-2 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 line-through">
                De {formatCurrency(pkg.originalPrice)}
              </span>
              <span className="text-[11px] text-[#FFDF73] font-bold bg-[#D4AF37]/15 border border-[#D4AF37]/35 px-2 py-0.5 rounded">
                Economia de {formatCurrency(savings)}
              </span>
            </div>

            {/* Pix Highlight */}
            <div className="pt-0.5">
              <div className="text-[11px] text-[#FFDF73] font-bold uppercase tracking-wider">
                À Vista no Pix:
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {formatCurrency(pkg.pixPrice)}
              </div>
            </div>

            {/* Installments Option */}
            <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
              <span className="text-slate-400 font-medium">Ou no Cartão:</span>
              <span className="font-bold text-[#FFDF73]">
                {pkg.installments.count}x de {formatCurrency(pkg.installments.value)}
              </span>
            </div>
          </div>

          {/* Benefits list */}
          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              O que está incluso:
            </p>
            <ul className="space-y-1.5">
              {pkg.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Card Action Button */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(pkg);
          }}
          className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase tap-luxury transition-luxury flex items-center justify-center gap-2 ${
            isSelected
              ? 'bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#B38F24] text-black shadow-lg shadow-[#D4AF37]/30'
              : 'bg-[#121824] hover:bg-gradient-to-r hover:from-[#FFDF73] hover:to-[#D4AF37] hover:text-black text-slate-200 border border-[#D4AF37]/30'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Pacote Selecionado</span>
            </>
          ) : (
            <>
              <span>Escolher Este Pacote</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {pkg.urgencyText && (
          <p className="text-center text-[10px] text-[#FFDF73]/80 mt-2 font-medium">
            ⚡ {pkg.urgencyText}
          </p>
        )}
      </div>

      {/* High-Resolution Zoom Lightbox */}
      {isZoomOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomOpen(false);
          }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-zoom-out animate-in fade-in duration-200"
        >
          <div className="relative max-w-2xl w-full flex flex-col items-center">
            {/* Top bar with close */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <span className="text-xs sm:text-sm font-bold text-[#FFDF73] flex items-center gap-1.5 font-serif">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                {pkg.title} — Detalhes do Resultado
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomOpen(false);
                }}
                className="p-1.5 rounded-full bg-slate-900 border border-[#D4AF37]/40 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Res Image display */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-[#05070B] max-h-[82vh]">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Clique em qualquer lugar da tela para fechar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
