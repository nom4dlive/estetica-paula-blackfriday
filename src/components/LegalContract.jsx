import React from 'react';
import { FileText, ShieldAlert, CheckSquare, Square, AlertCircle, Clock } from 'lucide-react';

export default function LegalContract({ agreed, setAgreed, error }) {
  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-[#FFDF73]" />
          Termo de Adesão &amp; Regras Oficiais:
        </label>
        <span className="text-[11px] text-[#FFDF73]/90 font-medium">
          Leitura Obrigatória
        </span>
      </div>

      {/* Contract Scroll Box */}
      <div className="bg-[#05070B] border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-5 max-h-56 overflow-y-auto space-y-3 text-xs text-slate-300 leading-relaxed font-sans shadow-inner">
        <div className="border-b border-[#D4AF37]/20 pb-2">
          <p className="font-bold text-white text-xs uppercase tracking-wide">
            INSTRUMENTO PARTICULAR DE ADESÃO A PROTOCOLOS ESTÉTICOS — BLACK FRIDAY 2026
          </p>
          <p className="text-[10px] text-[#FFDF73]/80 mt-0.5">
            Dra. Paula Feliciano — Estética Facial &amp; Corporal • Procedimentos Estéticos
          </p>
        </div>

        {/* Rule 1 Highlight */}
        <div className="bg-[#D4AF37]/10 border-l-2 border-[#D4AF37] p-2.5 rounded-r-lg space-y-1">
          <p className="font-bold text-[#FFDF73] text-[11px] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            CLÁUSULA 1ª — DA VIGÊNCIA E REALIZAÇÃO OBRIGATÓRIA EM 2026
          </p>
          <p className="text-[11px] text-slate-200">
            A CONTRATANTE tem plena ciência e concorda expressamente que os descontos da campanha Black Friday 2026 são outorgados sob a condição vinculante de que <strong className="text-white">TODAS as sessões do pacote contratado deverão ser iniciadas e integralmente realizadas ainda dentro do ano de 2026</strong>. Sessões não usufruídas ou agendadas até o encerramento do exercício de 2026 expirarão de pleno direito, sem direito a reembolso ou prorrogação para 2027.
          </p>
        </div>

        {/* Rule 2 Highlight */}
        <div className="bg-[#0A0D16] border-l-2 border-slate-700 p-2.5 rounded-r-lg space-y-1">
          <p className="font-bold text-slate-200 text-[11px] flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-[#FFDF73]" />
            CLÁUSULA 2ª — POLÍTICA DE AGENDAMENTO E AVISO PRÉVIO DE 24 HORAS
          </p>
          <p className="text-[11px] text-slate-300">
            Com vistas à organização da agenda e esterilização dos equipamentos da clínica, qualquer reagendamento de sessão deverá ser comunicado formalmente via WhatsApp com <strong className="text-white">antecedência mínima de 24 (vinte e quatro) horas úteis</strong>. O não comparecimento no dia e horário agendados sem o devido aviso prévio implicará a perda e baixa da respectiva sessão.
          </p>
        </div>

        {/* Rule 3 */}
        <div className="space-y-1 text-slate-400 text-[11px]">
          <p className="font-semibold text-slate-300">
            CLÁUSULA 3ª — ANAMNESE E CONSENTIMENTO INFORMADO:
          </p>
          <p>
            A CONTRATANTE será submetida à ficha de anamnese prévia pela Dra. Paula Feliciano antes da primeira aplicação, comprometendo-se a prestar informações fidedignas acerca do seu estado de saúde, uso de fármacos, alergias e possíveis contraindicações estéticas.
          </p>
        </div>

        {/* Rule 4 */}
        <div className="space-y-1 text-slate-400 text-[11px]">
          <p className="font-semibold text-slate-300">
            CLÁUSULA 4ª — EFETIVAÇÃO E FORMA DE PAGAMENTO:
          </p>
          <p>
            A vaga da presente promoção é garantida após a confirmação do pagamento acordado (Pix com super desconto à vista ou parcelamento em até 10x no link da maquininha).
          </p>
        </div>
      </div>

      {/* Mandatory Checkbox */}
      <div
        onClick={() => setAgreed(!agreed)}
        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
          agreed
            ? 'bg-[#151206]/80 border-[#D4AF37] ring-1 ring-[#D4AF37]/50'
            : error
            ? 'bg-red-950/20 border-red-500'
            : 'bg-[#0A0D16] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
        }`}
      >
        <button
          type="button"
          className="mt-0.5 text-[#FFDF73] focus:outline-none"
        >
          {agreed ? (
            <CheckSquare className="w-5 h-5 fill-[#D4AF37] text-black" />
          ) : (
            <Square className="w-5 h-5 text-slate-500" />
          )}
        </button>

        <div className="text-xs text-slate-200 leading-snug">
          <p className="font-semibold text-white">
            Li e concordo expressamente com os termos do contrato da Black Friday 2026.
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Estou ciente da realização obrigatória das sessões ainda em 2026 e do aviso prévio de 24h para reagendamento.
          </p>
        </div>
      </div>

      {error && (
        <p className="text-[11px] text-red-400 flex items-center gap-1 pl-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}
