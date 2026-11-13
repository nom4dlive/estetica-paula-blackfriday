import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Download,
  MessageCircle,
  ShieldCheck,
  X,
  FileCheck2,
  Calendar,
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { generateContractPDF } from '../utils/pdfGenerator';
import { formatCurrency } from '../utils/masks';
import PaulaLogo from './brand/PaulaLogo';

export default function SuccessModal({
  isOpen,
  onClose,
  patient,
  selectedPackage,
  paymentMethod,
  signatureDataUrl,
  auditData,
}) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#CBB68B', '#10B981', '#E5D6BA', '#FFFFFF'],
        });
      } catch (e) {
        console.warn('Confetti error:', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isPix = paymentMethod === 'pix';
  const whatsappUrl = getWhatsAppUrl({
    patient,
    selectedPackage,
    paymentMethod,
    auditData,
  });

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      await generateContractPDF({
        patient,
        selectedPackage,
        paymentMethod,
        signatureDataUrl,
        auditData,
      });
      setDownloaded(true);
    } catch (e) {
      console.error('Error generating PDF:', e);
      alert('Houve um problema ao compilar o PDF. Por favor, tente novamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0A0D16] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-[#05070B] border border-[#D4AF37]/20 transition-colors tap-luxury cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Vector Brand Logo & Title */}
        <div className="text-center space-y-3">
          <div className="flex justify-center pt-2">
            <PaulaLogo.Vertical
              className="w-44 sm:w-48 h-auto mx-auto"
              textColor="#F8FAFC"
              goldColor="#D4AF37"
            />
          </div>

          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-950">
            <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#FFDF73] text-xs font-semibold border border-[#D4AF37]/35 shadow-sm">
            ✦ CONTRATO FORMALIZADO COM SUCESSO!
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Parabéns, {patient.name.split(' ')[0]}!
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
            Sua vaga com valor promocional de Black Friday está pré-reservada e o termo digital foi assinado com integridade OpenSign.
          </p>
        </div>

        {/* Contract Summary Box */}
        <div className="bg-[#05070B] border border-[#D4AF37]/25 rounded-2xl p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Pacote Escolhido:</span>
            <span className="font-bold text-white text-right">{selectedPackage.title}</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Forma de Pagamento:</span>
            <span className="font-bold text-emerald-400">
              {isPix
                ? `PIX: ${formatCurrency(selectedPackage.pixPrice)} à vista`
                : `Cartão: 10x de ${formatCurrency(selectedPackage.installments.value)}`}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Document ID:</span>
            <span className="font-mono text-[#FFDF73] text-[11px]">{auditData.docId.slice(0, 18)}...</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Vigência Obrigatória:</span>
            <span className="font-semibold text-[#FFDF73] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Sessões em 2026
            </span>
          </div>
        </div>

        {/* OpenSign Certificate Badge */}
        <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-3 text-emerald-300 text-xs">
          <ShieldCheck className="w-6 h-6 shrink-0 text-emerald-400" />
          <p className="leading-tight text-[11px]">
            <strong>Trilha de Auditoria Gravada:</strong> Hash SHA-256 e assinatura colhida vinculados permanentemente ao documento.
          </p>
        </div>

        {/* Action Buttons with Motion-UI Tap Physics */}
        <div className="space-y-3 pt-1">
          {/* Main Action: WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm tracking-wide shadow-xl shadow-emerald-950 flex items-center justify-center gap-2 group tap-luxury transition-luxury"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>
              {isPix ? 'Finalizar e Solicitar Chave Pix no WhatsApp' : 'Finalizar e Solicitar Link do Cartão no WhatsApp'}
            </span>
          </a>

          {/* Secondary Action: Download PDF */}
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="w-full py-3 px-4 rounded-xl bg-[#05070B] hover:bg-[#121824] text-slate-200 border border-[#D4AF37]/30 font-semibold text-xs flex items-center justify-center gap-2 tap-luxury transition-luxury cursor-pointer"
          >
            {isGeneratingPDF ? (
              <span>Gerando PDF oficial...</span>
            ) : downloaded ? (
              <>
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>PDF Baixado com Sucesso! (Clique p/ baixar de novo)</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#FFDF73]" />
                <span>Baixar Cópia do Contrato Assinado (PDF)</span>
              </>
            )}
          </button>
        </div>

        <p className="text-center text-[10px] text-slate-500">
          A Dra. Paula Feliciano responderá com as instruções de liquidação e o agendamento da sua primeira sessão para 2026.
        </p>
      </div>
    </div>
  );
}
