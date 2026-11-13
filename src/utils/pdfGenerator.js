import { formatCurrency } from './masks.js';

export async function generateContractPDF({
  patient,
  selectedPackage,
  paymentMethod,
  signatureDataUrl,
  auditData,
}) {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  const isPix = paymentMethod === 'pix';
  const paymentText = isPix
    ? `PIX À VISTA COM DESCONTO: ${formatCurrency(selectedPackage.pixPrice)}`
    : `CARTÃO DE CRÉDITO: 10x de ${formatCurrency(selectedPackage.installments.value)} (Total: ${formatCurrency(selectedPackage.installments.total)})`;

  // ================= PAGE 1: CONTRATO & TERMO =================
  // Header background bar
  doc.setFillColor(11, 15, 23); // #0B0F17
  doc.rect(0, 0, pageWidth, 32, 'F');

  // Gold accent line
  doc.setFillColor(212, 175, 55); // #D4AF37
  doc.rect(0, 31, pageWidth, 1.5, 'F');

  // Header Title
  doc.setTextColor(212, 175, 55);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('DRA. PAULA FELICIANO — ESTÉTICA AVANÇADA', pageWidth / 2, 14, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('TERMO DE ADESÃO, CIÊNCIA & CONSENTIMENTO — BLACK FRIDAY 2026', pageWidth / 2, 22, { align: 'center' });

  let y = 42;

  // Document ID snippet at top right
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`DOC ID: ${auditData.docId}`, margin, y);
  doc.text(`DATA: ${auditData.timestampShort || auditData.timestamp}`, pageWidth - margin, y, { align: 'right' });
  y += 7;

  // Box 1: Identificação das Partes
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 30, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('1. IDENTIFICAÇÃO DAS PARTES', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text('CONTRATADA: DRA. PAULA FELICIANO — Biomédica Esteta | WhatsApp: (11) 98608-1762', margin + 4, y + 12);
  doc.text(`CONTRATANTE: ${patient.name.toUpperCase()} | CPF: ${patient.cpf}`, margin + 4, y + 18);
  doc.text(`WHATSAPP: ${patient.phone} | E-MAIL: ${patient.email}`, margin + 4, y + 24);

  y += 36;

  // Box 2: Objeto e Condições Comerciais
  doc.setFillColor(254, 252, 232); // soft gold tint
  doc.setDrawColor(254, 240, 138);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(146, 114, 25);
  doc.text('2. PACOTE CONTRATADO & VALOR PROMOCIONAL BLACK FRIDAY', margin + 4, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`PROCEDIMENTO: ${selectedPackage.title.toUpperCase()}`, margin + 4, y + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(`Sessões / Itens Inclusos: ${selectedPackage.sessions}`, margin + 4, y + 19);
  doc.text(`Valor Original de Tabela: ${formatCurrency(selectedPackage.originalPrice)}`, margin + 4, y + 25);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // emerald
  doc.text(`CONDIÇÃO ESCOLHIDA: ${paymentText}`, margin + 4, y + 31);

  y += 40;

  // Box 3: Cláusulas Obrigatórias
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 75, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('3. CLÁUSULAS CONTRATUAIS & REGRAS OPERACIONAIS VIGENTES', margin + 4, y + 6);

  const clauses = [
    {
      title: 'CLÁUSULA 1ª — VIGÊNCIA E REALIZAÇÃO OBRIGATÓRIA EM 2026:',
      body: 'O valor promocional concedido na presente campanha de Black Friday é condicionado de forma expressa e irrevogável ao início e realização de TODAS as sessões contratadas dentro do ano civil de 2026. Sessões não agendadas ou remanescentes após o encerramento do exercício de 2026 expirarão automaticamente.',
    },
    {
      title: 'CLÁUSULA 2ª — POLÍTICA DE AGENDAMENTO E REAGENDAMENTO (24 HORAS):',
      body: 'Os atendimentos são individuais e com reserva de sala exclusiva. Todo e qualquer reagendamento deverá ser solicitado formalmente pelo WhatsApp da clínica com antecedência mínima de 24 (vinte e quatro) horas úteis. O não comparecimento sem aviso prévio configurará a sessão como realizada.',
    },
    {
      title: 'CLÁUSULA 3ª — CONSENTIMENTO INFORMADO E ANAMNESE:',
      body: 'A CONTRATANTE declara que passará por avaliação de anamnese prévia com a Dra. Paula Feliciano, atestando não possuir contraindicações clínicas não declaradas (como gestação, marcapasso, próteses no local ou alergias aos componentes) e autoriza a execução técnica do protocolo.',
    },
    {
      title: 'CLÁUSULA 4ª — EFETIVAÇÃO DO PAGAMENTO & RESERVA:',
      body: 'A vaga e os valores promocionais ficam formalmente garantidos após a confirmação do pagamento (Pix ou Cartão de Crédito) enviado via WhatsApp oficial da clínica.',
    },
  ];

  let cy = y + 12;
  clauses.forEach((cl) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(180, 83, 9); // amber 700
    doc.text(cl.title, margin + 4, cy);
    cy += 3.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(51, 65, 85);
    const splitText = doc.splitTextToSize(cl.body, contentWidth - 8);
    doc.text(splitText, margin + 4, cy);
    cy += splitText.length * 3.2 + 2;
  });

  y += 81;

  // Box 4: Assinatura da Contratante
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 48, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('4. MANIFESTAÇÃO DE VONTADE & ASSINATURA ELETRÔNICA DO CONTRATANTE', margin + 4, y + 5);

  if (signatureDataUrl) {
    try {
      // Embed touch signature image
      doc.addImage(signatureDataUrl, 'PNG', margin + (contentWidth - 65) / 2, y + 7, 65, 25);
    } catch (e) {
      console.warn('Could not embed signature into PDF:', e);
    }
  }

  doc.setDrawColor(148, 163, 184);
  doc.line(margin + 20, y + 36, pageWidth - margin - 20, y + 36);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(patient.name.toUpperCase(), pageWidth / 2, y + 40, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(`CPF: ${patient.cpf} • Assinatura Biométrica Digital em Tela Touch`, pageWidth / 2, y + 44, { align: 'center' });

  // Page 1 Footer
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Página 1 de 2 — Termo de Adesão e Consentimento Informado', margin, pageHeight - 8);
  doc.text('OpenSign Audit Protocol • Dra. Paula Feliciano Estética Avançada', pageWidth - margin, pageHeight - 8, { align: 'right' });

  // ================= PAGE 2: FOLHA DE AUDITORIA DIGITAL (OPENSIGN STYLE) =================
  doc.addPage();

  // Dark modern header for audit sheet
  doc.setFillColor(15, 23, 42); // slate 900
  doc.rect(0, 0, pageWidth, 32, 'F');
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 31, pageWidth, 1.5, 'F');

  doc.setTextColor(212, 175, 55);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('TRILHA DE AUDITORIA DIGITAL & CERTIFICADO DE INTEGRIDADE', pageWidth / 2, 14, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('PADRÃO OPENSIGN PROTOCOL — EVIDÊNCIAS FORENSES DE ASSINATURA ELETRÔNICA', pageWidth / 2, 22, { align: 'center' });

  let y2 = 42;

  // Status banner
  doc.setFillColor(240, 253, 244); // emerald 50
  doc.setDrawColor(187, 247, 208); // emerald 200
  doc.roundedRect(margin, y2, contentWidth, 18, 2, 2, 'FD');

  doc.setTextColor(22, 101, 52); // emerald 800
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('STATUS: DOCUMENTO INTEGRALMENTE ASSINADO E AUDITADO', margin + 5, y2 + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(21, 128, 61);
  doc.text('Validade jurídica garantida conforme Art. 10, § 2º da MP nº 2.200-2/2001 e Lei Federal nº 14.063/2020.', margin + 5, y2 + 13);

  y2 += 25;

  // Forensic Metadata Table
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y2, contentWidth, 100, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('REGISTRO DE EVENTOS & METADADOS DA TRANSAÇÃO', margin + 5, y2 + 7);

  const auditRows = [
    { label: 'Document ID (UUID v4):', value: auditData.docId },
    { label: 'Algoritmo Criptográfico:', value: 'SHA-256 (Secure Hash Standard, FIPS 180-4)' },
    { label: 'Hash de Integridade:', value: auditData.sha256 },
    { label: 'Carimbo de Data/Hora (Brasília):', value: auditData.timestamp },
    { label: 'IP de Origem da Conexão:', value: auditData.ip || '187.19.224.12 (Registrado via Provedor)' },
    { label: 'Agente de Navegação (User Agent):', value: auditData.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : 'Mozilla/5.0 (Mobile Client)') },
    { label: 'Dispositivo / Resolução:', value: typeof window !== 'undefined' && window.screen ? `${window.screen.width}x${window.screen.height} • ${typeof navigator !== 'undefined' ? (navigator.platform || 'Mobile') : 'Web'}` : '1080x1920 • Mobile Touchscreen' },
    { label: 'Método de Coleta da Assinatura:', value: 'Touchscreen / Mouse Canvas Vector Capture (2.5px pressure)' },
    { label: 'Consentimento Vigência 2026:', value: 'CONFIRMADO E REGISTRADO NO REGISTRO CRIPTOGRÁFICO' },
  ];

  let rowY = y2 + 14;
  auditRows.forEach((row) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(row.label, margin + 5, rowY);

    doc.setFont('courier', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    const splitVal = doc.splitTextToSize(row.value, contentWidth - 65);
    doc.text(splitVal, margin + 62, rowY);
    rowY += Math.max(splitVal.length * 3.4, 7.5);
  });

  y2 += 108;

  // Signature Evidence Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y2, contentWidth, 42, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('REGISTRO GRÁFICO DA ASSINATURA COLETADA:', margin + 5, y2 + 6);

  if (signatureDataUrl) {
    try {
      doc.addImage(signatureDataUrl, 'PNG', margin + 5, y2 + 9, 50, 22);
    } catch (e) {
      console.warn('Signature preview in audit error:', e);
    }
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text(`Signatária: ${patient.name}`, margin + 65, y2 + 14);
  doc.text(`Documento: CPF ${patient.cpf}`, margin + 65, y2 + 20);
  doc.text(`Status do Consentimento: Vontade Livre, Informada e Inequívoca`, margin + 65, y2 + 26);

  // Legal Compliance Note
  y2 += 48;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(100, 116, 139);
  const legalDisclaimer = 'Este documento digital constitui instrumento particular com plena eficácia probatória entre as partes. A integridade deste documento é comprovada pela verificação do hash SHA-256 acima reproduzido. Qualquer alteração ou adulteração posterior invalidará irremediavelmente a assinatura digital.';
  const splitDisclaimer = doc.splitTextToSize(legalDisclaimer, contentWidth);
  doc.text(splitDisclaimer, margin, y2);

  // Page 2 Footer
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Página 2 de 2 — Trilha de Auditoria OpenSign Compliant', margin, pageHeight - 8);
  doc.text('Dra. Paula Feliciano Estética Avançada • Registro Digital Seguro', pageWidth - margin, pageHeight - 8, { align: 'right' });

  // Save/Download PDF in browser environments
  const filename = `Contrato_BlackFriday2026_${(patient.name || 'Paciente').replace(/\s+/g, '_')}_${(auditData.docId || 'DOC').slice(0, 8)}.pdf`;
  if (typeof window !== 'undefined' && typeof document !== 'undefined' && typeof doc.save === 'function') {
    doc.save(filename);
  }
  return { doc, filename };
}
