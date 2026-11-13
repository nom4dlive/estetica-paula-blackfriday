import React from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/masks';

export default function PackageCard({ pkg, isSelected, onSelect }) {
  const savings = pkg.originalPrice - pkg.pixPrice;
  const discountPercent = Math.round((savings / pkg.originalPrice) * 100);

  return (
    <div
      onClick={() => onSelect(pkg)}
      className={`relative rounded-3xl overflow-hidden cursor-pointer tap-luxury transition-luxury flex flex-col justify-between ${
        isSelected
          ? 'ring-2 ring-[#D4AF37] bg-[#0C101A] shadow-2xl shadow-[#D4AF37]/20 transform -translate-y-1'
          : 'bg-[#0A0D16]/95 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:bg-[#0E1322]'
      }`}
    >
      {/* Top Image & Badges */}
      <div>
        <div className="relative h-72 sm:h-84 w-full overflow-hidden bg-[#05070B] group">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D16] via-transparent to-black/30 pointer-events-none" />

          {/* Promotional Tag */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-md ${pkg.badgeColor}`}>
              {pkg.badge}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-red-600 text-white shadow-md">
              -{discountPercent}%
            </span>
          </div>

          {/* Selected marker */}
          {isSelected && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black px-3 py-1 rounded-full text-[11px] font-black flex items-center gap-1 shadow-xl z-10 animate-pulse">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              SELECIONADO
            </div>
          )}

          {/* Category & Session label */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-slate-300 z-10">
            <span className="bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-bold text-[#FFDF73] border border-[#D4AF37]/40 shadow-sm">
              {pkg.category}
            </span>
            <span className="bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-medium text-slate-200 border border-white/10 shadow-sm">
              {pkg.sessions}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-3.5">
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
    </div>
  );
}
