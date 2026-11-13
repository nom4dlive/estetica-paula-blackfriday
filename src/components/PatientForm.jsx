import React from 'react';
import { User, CreditCard, Phone, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { maskCPF, maskPhone, isValidCPF } from '../utils/masks';

export default function PatientForm({ patient, setPatient, errors }) {
  const handleNameChange = (e) => {
    setPatient((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleCPFChange = (e) => {
    const masked = maskCPF(e.target.value);
    setPatient((prev) => ({ ...prev, cpf: masked }));
  };

  const handlePhoneChange = (e) => {
    const masked = maskPhone(e.target.value);
    setPatient((prev) => ({ ...prev, phone: masked }));
  };

  const handleEmailChange = (e) => {
    setPatient((prev) => ({ ...prev, email: e.target.value.trim() }));
  };

  const cpfValid = isValidCPF(patient.cpf);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[#FFDF73]" />
          Seus Dados Para o Contrato Oficial:
        </label>
        <span className="text-[11px] text-slate-400">Todos os campos obrigatórios</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nome Completo */}
        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs text-slate-300 font-medium flex items-center gap-1">
            Nome Completo:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={patient.name}
              onChange={handleNameChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#07090E] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                errors?.name
                  ? 'border-red-500 focus:ring-red-500 bg-red-950/20'
                  : 'border-[#D4AF37]/25 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
              }`}
            />
          </div>
          {errors?.name && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        {/* CPF */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs text-slate-300 font-medium">CPF:</label>
            {patient.cpf.length >= 14 && (
              <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${cpfValid ? 'text-emerald-400' : 'text-red-400'}`}>
                {cpfValid ? <><CheckCircle2 className="w-3 h-3" /> CPF Válido</> : 'CPF Inválido'}
              </span>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <CreditCard className="w-4 h-4" />
            </div>
            <input
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={patient.cpf}
              onChange={handleCPFChange}
              maxLength={14}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#07090E] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all font-mono ${
                errors?.cpf
                  ? 'border-red-500 focus:ring-red-500 bg-red-950/20'
                  : 'border-[#D4AF37]/25 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
              }`}
            />
          </div>
          {errors?.cpf && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.cpf}
            </p>
          )}
        </div>

        {/* WhatsApp */}
        <div className="space-y-1">
          <label className="text-xs text-slate-300 font-medium">WhatsApp / Celular:</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              inputMode="tel"
              placeholder="(11) 90000-0000"
              value={patient.phone}
              onChange={handlePhoneChange}
              maxLength={15}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#07090E] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all font-mono ${
                errors?.phone
                  ? 'border-red-500 focus:ring-red-500 bg-red-950/20'
                  : 'border-[#D4AF37]/25 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
              }`}
            />
          </div>
          {errors?.phone && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        {/* E-mail */}
        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs text-slate-300 font-medium">E-mail para Envio do Contrato:</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="exemplo@gmail.com"
              value={patient.email}
              onChange={handleEmailChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#07090E] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                errors?.email
                  ? 'border-red-500 focus:ring-red-500 bg-red-950/20'
                  : 'border-[#D4AF37]/25 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
              }`}
            />
          </div>
          {errors?.email && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
