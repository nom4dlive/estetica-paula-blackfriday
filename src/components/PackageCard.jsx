import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/masks';

export default function PackageCard({ pkg, isSelected, onSelect }) {
  const savings = pkg.originalPrice - pkg.pixPrice;
  const discountPercent = Math.round((savings / pkg.originalPrice) * 100);

  return (
    <div
      onClick={() => onSelect(pkg)}
      className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between ${
        isSelected
          ? 'ring-2 ring-[#D4AF37] bg-[#101623] shadow-2xl shadow-amber-500/20 transform -translate-y-1'
          : 'bg-[#0E131F]/90 border border-slate-800/80 hover:border-amber-500/40 hover:bg-[#121826]'
      }`}
    >
      {/* Top Image & Badges */}
      <div>
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = '/assets/img_2b66.jpg'; // fallback
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E131F] via-transparent to-black/40" />

          {/* Promotional Tag */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-sm ${pkg.badgeColor}`}>
              {pkg.badge}
            </span>
            <span className="px-2 py-1 rounded-full text-[10px] font-extrabold bg-rose-600 text-white shadow-sm">
              -{discountPercent}%
            </span>
          </div>

          {/* Selected marker */}
          {isSelected && (
            <div className="absolute top-3 right-3 bg-amber-500 text-black px-2.5 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 shadow-lg">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              SELECIONADO
            </div>
          )}

          {/* Category & Session label */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
            <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-medium text-amber-300 border border-amber-500/20">
              {pkg.category}
            </span>
            <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-medium text-slate-200">
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
          <div className="bg-[#07090E]/80 border border-amber-500/20 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 line-through">
                De {formatCurrency(pkg.originalPrice)}
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
                Economia de {formatCurrency(savings)}
              </span>
            </div>

            {/* Pix Highlight */}
            <div className="pt-0.5">
              <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                À Vista no Pix:
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {formatCurrency(pkg.pixPrice)}
              </div>
            </div>

            {/* Installments Option */}
            <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="text-slate-400">Ou no Cartão:</span>
              <span className="font-semibold text-amber-300">
                {pkg.installments.count}x de {formatCurrency(pkg.installments.value)}
              </span>
            </div>
          </div>

          {/* Benefits list */}
          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              O que está incluso:
            </p>
            <ul className="space-y-1.5">
              {pkg.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
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
          className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 ${
            isSelected
              ? 'bg-[#D4AF37] text-black shadow-lg shadow-amber-500/30'
              : 'bg-slate-800 hover:bg-amber-500 hover:text-black text-slate-200 border border-slate-700'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4" />
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
          <p className="text-center text-[10px] text-amber-400/80 mt-2 font-medium">
            ⚡ {pkg.urgencyText}
          </p>
        )}
      </div>
    </div>
  );
}
