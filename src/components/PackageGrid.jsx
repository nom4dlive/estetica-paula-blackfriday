import React, { useState } from 'react';
import { PACKAGES } from '../data/packages';
import PackageCard from './PackageCard';
import { Sparkles } from 'lucide-react';

export default function PackageGrid({ selectedPackage, onSelectPackage }) {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', 'Facial', 'Corporal', 'VIP'];

  const filteredPackages = activeCategory === 'Todos'
    ? PACKAGES
    : PACKAGES.filter((p) => p.category === activeCategory);

  return (
    <section id="pacotes" className="py-12 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#FFDF73] text-xs font-semibold border border-[#D4AF37]/35 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          ETAPA 1: ESCOLHA SEU PACOTE VIP
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
          Os 6 Protocolos Oficiais da Black Friday
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
          Valores promocionais garantidos apenas durante o lote vigente. Clique no pacote desejado para avançar para a personalização e assinatura digital.
        </p>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer tap-luxury ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/25 font-bold'
                  : 'bg-[#0A0D16] text-slate-300 hover:text-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 6 packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            isSelected={selectedPackage?.id === pkg.id}
            onSelect={onSelectPackage}
          />
        ))}
      </div>
    </section>
  );
}
