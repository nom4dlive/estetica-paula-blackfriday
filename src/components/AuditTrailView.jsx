import React from 'react';
import { ShieldCheck, Hash, Key, Clock, Globe, Lock } from 'lucide-react';

export default function AuditTrailView({ auditData }) {
  if (!auditData) return null;

  return (
    <div className="bg-[#0A0D16] border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center text-[#FFDF73]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Trilha de Auditoria Digital (OpenSign Standard)
            </h4>
            <p className="text-[10px] text-slate-400">
              Protocolo Criptográfico de Integridade &amp; Não-Repúdio
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <Lock className="w-2.5 h-2.5" /> AUDITADO
        </span>
      </div>

      {/* Grid of audit items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Document ID */}
        <div className="bg-[#05070B] p-2.5 rounded-xl border border-[#D4AF37]/20 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
            <Key className="w-3 h-3 text-[#FFDF73]" /> Document ID (UUID v4)
          </span>
          <p className="font-mono text-white text-[11px] truncate" title={auditData.docId}>
            {auditData.docId}
          </p>
        </div>

        {/* SHA-256 Hash */}
        <div className="bg-[#05070B] p-2.5 rounded-xl border border-[#D4AF37]/20 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
            <Hash className="w-3 h-3 text-[#FFDF73]" /> Hash SHA-256 (Integridade)
          </span>
          <p className="font-mono text-[#FFDF73] text-[11px] truncate" title={auditData.sha256}>
            {auditData.sha256}
          </p>
        </div>

        {/* Timestamp */}
        <div className="bg-[#05070B] p-2.5 rounded-xl border border-[#D4AF37]/20 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#FFDF73]" /> Data &amp; Hora Oficial (Brasília)
          </span>
          <p className="font-mono text-slate-200 text-[11px]">
            {auditData.timestamp}
          </p>
        </div>

        {/* IP & Security */}
        <div className="bg-[#05070B] p-2.5 rounded-xl border border-[#D4AF37]/20 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
            <Globe className="w-3 h-3 text-[#FFDF73]" /> Endereço IP / Origem
          </span>
          <p className="font-mono text-slate-200 text-[11px]">
            {auditData.ip} • Registro Web Protegido
          </p>
        </div>
      </div>

      <div className="text-[10px] text-slate-400 bg-[#05070B] p-2.5 rounded-lg border border-[#D4AF37]/15 leading-relaxed">
        ⚖️ <strong>Garantia Jurídica:</strong> Os dados biométricos da assinatura na tela sensível ao toque, combinados com o Hash SHA-256 e o carimbo de tempo acima, conferem validade executiva ao contrato nos termos da Lei Federal nº 14.063/2020 e MP nº 2.200-2/2001.
      </div>
    </div>
  );
}
