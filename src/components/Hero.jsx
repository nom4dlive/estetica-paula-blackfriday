import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, Sparkles, CheckCircle2, Award, ArrowDown } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 11,
    minutes: 48,
    seconds: 32,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-6 pb-14 px-4 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Sales Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>BLACK FRIDAY VIP 2026 • CONDIÇÕES LIMITADAS</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white leading-tight tracking-tight">
              Sua melhor versão com as condições mais aguardadas do ano na{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                Estética Avançada
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Escolha entre os <strong className="text-white">6 protocolos consagrados</strong> da Dra. Paula Feliciano, garanta o valor promocional com opção <strong className="text-emerald-400">Pix com super desconto</strong> ou <strong className="text-amber-300">Cartão em até 10x</strong>, assine seu contrato direto no celular e realize suas sessões ainda em 2026.
            </p>

            {/* Urgency Countdown Box */}
            <div className="bg-[#101623]/80 border border-amber-500/20 rounded-2xl p-4 max-w-md mx-auto lg:mx-0 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between text-xs text-amber-300/90 font-medium mb-2.5">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
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
                  <span className="text-xl sm:text-2xl font-bold text-amber-400 font-mono block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Seg</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm tracking-wide transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group"
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
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Assinatura Digital Segura</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Award className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Protocolos Certificados Anvisa</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dra. Paula Featured Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/30 to-yellow-500/10 rounded-3xl blur-md" />

              <div className="relative bg-[#0F172A] border border-amber-500/30 rounded-3xl p-4 shadow-2xl overflow-hidden">
                {/* Photo */}
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-800">
                  <img
                    src="/assets/img_2b66.jpg"
                    alt="Dra. Paula Feliciano - Biomédica Esteta"
                    className="w-full h-full object-cover object-top"
                  />
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#0B0F17]/90 backdrop-blur-md border border-amber-500/30 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">Dra. Paula Feliciano</p>
                      <p className="text-slate-400 text-[10px]">Especialista em Harmonização Facial & Corporal</p>
                    </div>
                  </div>
                </div>

                {/* Important Contract Rule Banner */}
                <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center">
                  <p className="text-[11px] text-amber-300 font-semibold leading-tight">
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
