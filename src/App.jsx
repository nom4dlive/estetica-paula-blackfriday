import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PackageGrid from './components/PackageGrid';
import PaymentSelector from './components/PaymentSelector';
import PatientForm from './components/PatientForm';
import LegalContract from './components/LegalContract';
import SignaturePad from './components/SignaturePad';
import AuditTrailView from './components/AuditTrailView';
import SuccessModal from './components/SuccessModal';
import Footer from './components/Footer';
import { PACKAGES } from './data/packages';
import { generateUUID, computeSHA256, getBrasiliaTimestamp, getBrasiliaShortTimestamp } from './utils/crypto';
import { isValidCPF, formatCurrency } from './utils/masks';
import { ShieldCheck, FileSignature, AlertCircle, Lock } from 'lucide-react';

export default function App() {
  // Selected package (default to Liporeductt as it's the bestselling)
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[2]); // Liporeductt
  const [paymentMethod, setPaymentMethod] = useState('pix'); // 'pix' | 'credit'

  // Patient data
  const [patient, setPatient] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
  });

  // Terms and Signature
  const [agreed, setAgreed] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);

  // Form Validation Errors
  const [errors, setErrors] = useState({});

  // Audit data
  const [auditData, setAuditData] = useState({
    docId: generateUUID(),
    sha256: 'a9b4c2e1f88764032d1e5c4b8a790f123456789abcdef0123456789abcdef012',
    timestamp: getBrasiliaTimestamp(),
    timestampShort: getBrasiliaShortTimestamp(),
    ip: '189.120.45.10',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Mozilla/5.0 (Mobile Secure Client)',
    isSigned: false,
  });

  // Success Modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Section reference for smooth scroll
  const contractSectionRef = useRef(null);

  // Fetch client IP on mount (fallback gracefully)
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => {
        if (data.ip) {
          setAuditData((prev) => ({ ...prev, ip: data.ip }));
        }
      })
      .catch(() => {
        // Fallback default IP already set
      });
  }, []);

  // Update hash dynamically when relevant fields change (only prior to final signature seal)
  useEffect(() => {
    if (auditData.isSigned) return;
    const payload = `${auditData.docId}|${patient.name}|${patient.cpf}|${selectedPackage?.id}|${paymentMethod}|${auditData.timestamp}`;
    computeSHA256(payload).then((hash) => {
      setAuditData((prev) => (prev.isSigned ? prev : { ...prev, sha256: hash }));
    });
  }, [auditData.docId, auditData.isSigned, auditData.timestamp, patient.name, patient.cpf, selectedPackage?.id, paymentMethod]);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    // Smooth scroll to contract section
    if (contractSectionRef.current) {
      contractSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!patient.name || patient.name.trim().length < 3) {
      newErrors.name = 'Por favor, informe seu nome completo.';
    }

    if (!patient.cpf || !isValidCPF(patient.cpf)) {
      newErrors.cpf = 'Por favor, informe um CPF válido com 11 dígitos.';
    }

    const cleanPhone = patient.phone.replace(/\D/g, '');
    if (!patient.phone || cleanPhone.length < 10) {
      newErrors.phone = 'Por favor, informe um WhatsApp ou celular válido com DDD.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patient.email || !emailRegex.test(patient.email)) {
      newErrors.email = 'Por favor, informe um e-mail válido para envio da via contratual.';
    }

    if (!agreed) {
      newErrors.agreed = 'É obrigatório aceitar os termos do contrato e a regra de realização em 2026.';
    }

    if (!signatureDataUrl) {
      newErrors.signature = 'Por favor, desenhe sua assinatura digital no quadro antes de prosseguir.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Find the first error and scroll to it
      window.scrollTo({
        top: contractSectionRef.current?.offsetTop - 80,
        behavior: 'smooth',
      });
      return;
    }

    // Refresh timestamp and compute final seal
    const finalTimestamp = getBrasiliaTimestamp();
    const finalTimestampShort = getBrasiliaShortTimestamp();
    const payload = `${auditData.docId}|${patient.name}|${patient.cpf}|${selectedPackage.id}|${paymentMethod}|${finalTimestamp}|SIGNED`;
    const finalHash = await computeSHA256(payload);

    setAuditData((prev) => ({
      ...prev,
      timestamp: finalTimestamp,
      timestampShort: finalTimestampShort,
      sha256: finalHash,
      isSigned: true,
    }));

    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black w-full max-w-[100vw] overflow-x-hidden">
      {/* Sticky Header */}
      <Header
        onSelectPackageClick={() => {
          document.getElementById('pacotes')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => {
            document.getElementById('pacotes')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Packages Grid (Step 1) */}
        <PackageGrid
          selectedPackage={selectedPackage}
          onSelectPackage={handleSelectPackage}
        />

        {/* Digital Contract & Checkout Section (Steps 2, 3, 4, 5) */}
        <section
          ref={contractSectionRef}
          id="checkout-section"
          className="py-14 px-4 bg-gradient-to-b from-[#07090E] via-[#0B0F17] to-[#07090E] border-t border-slate-900"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Step header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#FFDF73] text-xs font-semibold border border-[#D4AF37]/35 shadow-sm">
                <FileSignature className="w-3.5 h-3.5" />
                ETAPA FINAL: FORMALIZAÇÃO & ASSINATURA DIGITAL
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Contrato de Prestação de Serviços Estéticos
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
                Preencha seus dados cadastrais, confira o termo oficial com vigência estrita em 2026 e assine com o dedo no celular.
              </p>
            </div>

            {/* Selected Package Highlight Box */}
            <div className="bg-[#0A0D16] border border-[#D4AF37]/35 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#05070B] shrink-0 border border-[#D4AF37]/30">
                  <img
                    src={selectedPackage.image}
                    alt={selectedPackage.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#FFDF73] bg-[#D4AF37]/20 px-2 py-0.5 rounded border border-[#D4AF37]/35">
                    Pacote Selecionado
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white mt-1">
                    {selectedPackage.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {selectedPackage.sessions}
                  </p>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-[#D4AF37]/20 sm:pl-5 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                <div>
                  <span className="text-[11px] text-slate-400 line-through block">
                    De {formatCurrency(selectedPackage.originalPrice)}
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-white">
                    {paymentMethod === 'pix'
                      ? formatCurrency(selectedPackage.pixPrice)
                      : `${selectedPackage.installments.count}x de ${formatCurrency(selectedPackage.installments.value)}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('pacotes')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs text-[#FFDF73] hover:text-white font-semibold underline mt-1 cursor-pointer"
                >
                  Trocar pacote
                </button>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="space-y-8 bg-[#0A0D16]/95 border border-[#D4AF37]/25 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-sm">
              
              {/* Step 2: Payment Method */}
              <PaymentSelector
                selectedPackage={selectedPackage}
                paymentMethod={paymentMethod}
                onSelectPaymentMethod={setPaymentMethod}
              />

              <hr className="border-slate-800" />

              {/* Step 3: Patient Information */}
              <PatientForm
                patient={patient}
                setPatient={setPatient}
                errors={errors}
              />

              <hr className="border-slate-800" />

              {/* Step 4: Legal Terms & 2026 Rule */}
              <LegalContract
                agreed={agreed}
                setAgreed={setAgreed}
                error={errors.agreed}
              />

              <hr className="border-slate-800" />

              {/* Step 5: Touch Signature Canvas */}
              <SignaturePad
                onSignatureChange={setSignatureDataUrl}
                error={errors.signature}
              />

              <hr className="border-slate-800" />

              {/* Step 6: OpenSign Live Audit Trail Preview */}
              <AuditTrailView
                auditData={auditData}
                patient={patient}
                selectedPackage={selectedPackage}
                paymentMethod={paymentMethod}
              />

              {/* Validation Summary if any error */}
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-950/40 border border-red-500/50 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Atenção para concluir a formalização:</p>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px] text-red-300/90">
                      {Object.values(errors).map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#B38F24] hover:brightness-110 text-black font-black text-sm sm:text-base tracking-wider uppercase transition-all shadow-xl shadow-[#D4AF37]/25 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer tap-luxury"
                >
                  <Lock className="w-5 h-5 group-hover:scale-105 transition-transform" />
                  <span>ASSINAR DIGITALMENTE &amp; GARANTIR CONDIÇÃO BLACK FRIDAY</span>
                </button>

                <p className="text-center text-[11px] text-slate-400 mt-2.5 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Ao clicar, você gera o contrato auditado e é direcionada ao WhatsApp oficial da Dra. Paula.
                </p>
              </div>

            </form>
          </div>
        </section>
      </main>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        patient={patient}
        selectedPackage={selectedPackage}
        paymentMethod={paymentMethod}
        signatureDataUrl={signatureDataUrl}
        auditData={auditData}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
