import React from 'react';
import { ShieldCheck, Clock, MessageCircle } from 'lucide-react';
import { CLINIC_PHONE } from '../utils/whatsapp';
import PaulaLogo from './brand/PaulaLogo';

export default function Footer() {
  return (
    <footer className="bg-[#05070B] border-t border-slate-900 pt-12 pb-8 px-4 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Clinic Brand with Vector Vertical Logo */}
          <div className="md:col-span-2 space-y-3">
            <PaulaLogo.Vertical
              className="w-48 sm:w-56 h-auto"
              textColor="#F8FAFC"
              goldColor="#CBB68B"
            />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm pt-1">
              Procedimentos de alta performance, tecnologia de ponta e cuidado humanizado. Campanha exclusiva de Black Friday 2026 com formalização digital segura.
            </p>
            <div className="flex items-center gap-2 pt-1 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#CBB68B]" />
              <span>Assinatura Digital Auditável Padrão OpenSign (SHA-256)</span>
            </div>
          </div>

          {/* Col 2: Atendimento */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-serif">
              Atendimento & Contato
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${CLINIC_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors font-medium text-slate-300"
                >
                  (11) 98608-1762
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#CBB68B] shrink-0" />
                <span>Segunda a Sábado • Horário Marcado</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Regras Importantes */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-serif">
              Regulamento Black Friday
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400 leading-relaxed">
              <li>• Realização obrigatória de todas as sessões no ano civil de 2026.</li>
              <li>• Reagendamentos sujeitos a aviso prévio mínimo de 24h úteis.</li>
              <li>• Vagas sujeitas à disponibilidade de agenda da clínica.</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2026 Dra. Paula Feliciano Estética Avançada. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1 text-[#CBB68B]/80 font-medium">
            ✦ Campanha Oficial Black Friday 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
