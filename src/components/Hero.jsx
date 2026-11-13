import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, CheckCircle2, Award, ArrowDown, Sparkles } from 'lucide-react';
import PaulaEmblem from './brand/PaulaEmblem';
import { stitchAssets } from '../assets/stitch/index.js';

export default function Hero({ onExploreClick }) {
  // Countdown timer locked strictly to Sunday 15/11/2026 23:59:59 BRT
  const getTimeLeft = () => {
    const target = new Date('2026-11-15T23:59:59-03:00');
    const now = new Date();
    const diff = Math.max(0, target - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-6 pb-14 px-4 overflow-hidden">
      {/* Background ambient crimson & gold lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/15 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#D4AF37]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Sales Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            {/* Tag badge with authentic PaulaEmblem & Crimson pulse */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-950/60 to-black/80 border border-red-500/40 text-red-300 text-xs font-semibold tracking-wider shadow-lg">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>BLACK FRIDAY VIP 2026 • LOTE EXCLUSIVO DE RETORNO</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white leading-tight tracking-tight">
              Sua melhor versão com as condições mais aguardadas na{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#E5D6BA]">
                Estética Avançada
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Escolha entre os <strong className="text-white">6 protocolos consagrados</strong> da Dra. Paula Feliciano, garanta sua condição com opção <strong className="text-emerald-400">Pix com super desconto</strong> ou <strong className="text-[#FFDF73]">Cartão em até 10x</strong>, assine seu termo direto no celular e realize suas sessões ainda em 2026.
            </p>

            {/* Urgency Countdown Box (Black Metal Edition) */}
            <div className="bg-[#0A0D16]/90 border border-[#D4AF37]/30 rounded-2xl p-4 max-w-md mx-auto lg:mx-0 backdrop-blur-md shadow-2xl shadow-black/80">
              <div className="flex items-center justify-between text-xs text-[#FFDF73] font-medium mb-2.5">
                <span className="inline-flex items-center gap-1.5 font-bold">
                  <Clock className="w-4 h-4 text-red-500" />
                  Encerra neste Domingo (15/11 às 23:59):
                </span>
                <span className="text-red-400 font-black uppercase tracking-wider text-[10px] bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30">
                  Poucas Vagas
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#05070B] border border-slate-800/80 rounded-xl py-2 px-1 shadow-inner">
                  <span className="text-xl sm:text-2xl font-extrabold text-white font-mono block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Dias</span>
                </div>
                <div className="bg-[#05070B] border border-slate-800/80 rounded-xl py-2 px-1 shadow-inner">
                  <span className="text-xl sm:text-2xl font-extrabold text-white font-mono block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Horas</span>
                </div>
                <div className="bg-[#05070B] border border-slate-800/80 rounded-xl py-2 px-1 shadow-inner">
                  <span className="text-xl sm:text-2xl font-extrabold text-white font-mono block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Min</span>
                </div>
                <div className="bg-[#05070B] border border-red-900/40 rounded-xl py-2 px-1 shadow-inner">
                  <span className="text-xl sm:text-2xl font-extrabold text-red-400 font-mono block animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-red-400/80 font-bold">Seg</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons with Liquid Gold & Black Metal Physics */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#B38F24] hover:brightness-110 text-black font-black text-sm tracking-wider uppercase shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 group tap-luxury transition-luxury transform hover:scale-[1.02]"
              >
                <span>Garantir Condição VIP 2026</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Realização garantida em 2026</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Assinatura Digital Segura</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Award className="w-4 h-4 text-[#FFDF73] shrink-0" />
                <span>Protocolos Certificados Anvisa</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dra. Paula Featured Card (Black Metal Edition) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-red-600/30 via-[#D4AF37]/20 to-transparent rounded-3xl blur-lg" />

              <div className="relative bg-[#07090E] border border-[#D4AF37]/40 rounded-3xl p-3 sm:p-4 shadow-2xl overflow-hidden">
                {/* Photo container */}
                <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-[#0A0D16]">
                  <img
                    src={stitchAssets.heroPortrait}
                    alt="Dra. Paula Feliciano - Estética Avançada"
                    className="w-full h-full object-cover object-top"
                  />
                  
                  {/* Top Badge: Vagas 2026 Abertas */}
                  <div className="absolute top-3 left-3 backdrop-blur-md bg-black/80 border border-[#D4AF37]/40 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[10px] font-black tracking-widest text-[#FFDF73] uppercase">Vagas 2026 Abertas</span>
                  </div>

                  {/* Floating Doctor Showcase Footer */}
                  <div className="absolute bottom-3 inset-x-3 backdrop-blur-xl bg-[#080B12]/95 border border-[#D4AF37]/40 p-3.5 rounded-2xl flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                        <PaulaEmblem className="w-6 h-6" goldColor="#D4AF37" />
                      </div>
                      <div>
                        <p className="text-white text-xs sm:text-sm font-bold font-serif">Dra. Paula Feliciano</p>
                        <p className="text-[#D4AF37] text-[10px] tracking-wider uppercase font-semibold">Estética Facial &amp; Corporal</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Contract Rule Banner */}
                <div className="mt-3 bg-red-950/20 border border-red-500/25 rounded-xl p-3 text-center">
                  <p className="text-[11px] text-[#FFDF73] font-bold leading-tight flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-red-400" />
                    Regra Oficial Black Friday:
                  </p>
                  <p className="text-[10px] text-slate-300 mt-0.5">
                    Condições exclusivas para sessões realizadas ainda ao longo do ano de 2026.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
