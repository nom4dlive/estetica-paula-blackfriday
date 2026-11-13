import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, CheckCircle2, Award, ArrowDown } from 'lucide-react';
import PaulaEmblem from './brand/PaulaEmblem';

export default function Hero({ onExploreClick }) {
  // Countdown timer — fixed target: 15/11/2026 23:59:59 BRT
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
      {/* Background radial glow with Motion-UI ambient pulsing */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#CBB68B]/10 blur-[130px] rounded-full pointer-events-none -z-10 ambient-glow" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Sales Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            {/* Tag badge with authentic PaulaEmblem */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CBB68B]/10 border border-[#CBB68B]/30 text-[#CBB68B] text-xs font-semibold tracking-wide shadow-sm">
              <PaulaEmblem className="w-4 h-4 shrink-0" goldColor="#CBB68B" />
              <span>BLACK FRIDAY VIP 2026 • CONDIÇÕES LIMITADAS</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white leading-tight tracking-tight">
              Sua melhor versão com as condições mais aguardadas do ano na{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5D6BA] via-[#CBB68B] to-[#9B855A]">
                Estética Avançada
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Escolha entre os <strong className="text-white">6 protocolos consagrados</strong> da Dra. Paula Feliciano, garanta o valor promocional com opção <strong className="text-emerald-400">Pix com super desconto</strong> ou <strong className="text-[#CBB68B]">Cartão em até 10x</strong>, assine seu contrato direto no celular e realize suas sessões ainda em 2026.
            </p>

            {/* Urgency Countdown Box */}
            <div className="bg-[#101623]/80 border border-[#CBB68B]/25 rounded-2xl p-4 max-w-md mx-auto lg:mx-0 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between text-xs text-[#CBB68B] font-medium mb-2.5">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#CBB68B]" />
                  Tempo restante para encerramento do lote:
                </span>
                <span className="text-rose-400 font-semibold uppercase tracking-wider text-[10px] bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  Poucas Vagas
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl py-2 px-1">
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Dias</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl py-2 px-1">
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Horas</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl py-2 px-1">
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Min</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl py-2 px-1">
                  <span className="text-xl sm:text-2xl font-bold text-[#CBB68B] font-mono block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Seg</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons with Motion-UI Tap Physics */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#CBB68B] via-[#E5D6BA] to-[#9B855A] hover:brightness-105 text-black font-bold text-sm tracking-wide shadow-lg shadow-[#CBB68B]/20 flex items-center justify-center gap-2 group tap-luxury transition-luxury"
              >
                <span>Conhecer os 6 Pacotes Black Friday</span>
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
                <ShieldCheck className="w-4 h-4 text-[#CBB68B] shrink-0" />
                <span>Assinatura Digital Segura</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Award className="w-4 h-4 text-[#E5D6BA] shrink-0" />
                <span>Protocolos Certificados Anvisa</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dra. Paula Featured Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#CBB68B]/30 to-[#9B855A]/10 rounded-3xl blur-md" />

              <div className="relative bg-[#0F172A] border border-[#CBB68B]/30 rounded-3xl p-4 shadow-2xl overflow-hidden">
                {/* Photo */}
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-800">
                  <img
                    src="./assets/stitch/stitch_13_c4c0bc5c7b.jpg"
                    alt="Dra. Paula Feliciano - Estética Avançada"
                    className="w-full h-full object-cover object-top"
                  />
                  
                  {/* Floating badge with Vector Floral Emblem */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#0B0F17]/90 backdrop-blur-md border border-[#CBB68B]/30 rounded-xl p-3 flex items-center gap-3 shadow-lg">
                    <div className="w-10 h-10 rounded-full bg-[#CBB68B]/15 border border-[#CBB68B]/40 flex items-center justify-center shrink-0">
                      <PaulaEmblem className="w-6 h-6" goldColor="#CBB68B" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold font-serif">Dra. Paula Feliciano</p>
                      <p className="text-[#CBB68B] text-[10px] tracking-wider uppercase font-medium">Estética Facial e Corporal • Harmonização VIP</p>
                    </div>
                  </div>
                </div>

                {/* Important Contract Rule Banner */}
                <div className="mt-3 bg-[#CBB68B]/10 border border-[#CBB68B]/25 rounded-xl p-3 text-center">
                  <p className="text-[11px] text-[#CBB68B] font-semibold leading-tight">
                    ⚖️ Regra Estrita da Black Friday:
                  </p>
                  <p className="text-[10px] text-slate-300 mt-0.5">
                    Os valores promocionais são exclusivos para sessões iniciadas e concluídas impreterivelmente ainda no ano de 2026.
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
