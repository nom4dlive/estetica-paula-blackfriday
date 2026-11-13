import React from 'react';
import { QrCode, CreditCard, Sparkles, Check } from 'lucide-react';
import { formatCurrency } from '../utils/masks';

export default function PaymentSelector({ selectedPackage, paymentMethod, onSelectPaymentMethod }) {
  if (!selectedPackage) return null;

  const isPix = paymentMethod === 'pix';
  const isCredit = paymentMethod === 'credit';

  const savings = selectedPackage.originalPrice - selectedPackage.pixPrice;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FFDF73]" />
          Forma de Pagamento Desejada:
        </label>
        <span className="text-[11px] text-[#FFDF73]/90 font-medium">
          Escolha uma opção
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Option 1: Pix */}
        <div
          onClick={() => onSelectPaymentMethod('pix')}
          className={`relative p-4 rounded-2xl border cursor-pointer transition-all ${
            isPix
              ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-900/20 ring-1 ring-emerald-500'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          {/* Badge */}
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3 h-3" />
              Super Desconto Pix
            </span>
            {isPix && (
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">PIX À Vista</p>
              <p className="text-xl font-extrabold text-emerald-400 mt-0.5">
                {formatCurrency(selectedPackage.pixPrice)}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Economia máxima de {formatCurrency(savings)}. A Dra. Paula emitirá a chave/QR Code no WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Option 2: Cartão de Crédito 10x */}
        <div
          onClick={() => onSelectPaymentMethod('credit')}
          className={`relative p-4 rounded-2xl border cursor-pointer transition-all ${
            isCredit
              ? 'bg-[#151206]/80 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 ring-1 ring-[#D4AF37]'
              : 'bg-[#0A0D16] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
          }`}
        >
          {/* Badge */}
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#FFDF73] border border-[#D4AF37]/40">
              Link Maquininha Segura
            </span>
            {isCredit && (
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center text-[#FFDF73] shrink-0 mt-0.5">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Cartão de Crédito</p>
              <p className="text-xl font-extrabold text-[#FFDF73] mt-0.5">
                {selectedPackage.installments.count}x de {formatCurrency(selectedPackage.installments.value)}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Total de {formatCurrency(selectedPackage.installments.total)}. Link da maquininha enviado após assinatura.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
