export const CLINIC_PHONE = '5511986081762';

export function createWhatsAppMessage({ patient, selectedPackage, paymentMethod, auditData }) {
  const isPix = paymentMethod === 'pix';
  const paymentText = isPix
    ? `PIX com Desconto Especial (R$ ${selectedPackage.pixPrice.toFixed(2).replace('.', ',')} à vista)`
    : `Cartão de Crédito em 10x de R$ ${selectedPackage.installments.value.toFixed(2).replace('.', ',')} (Total: R$ ${selectedPackage.installments.total.toFixed(2).replace('.', ',')})`;

  const message = `✨ *NOVO CONTRATO ASSINADO — BLACK FRIDAY 2026* ✨
_Dra. Paula Feliciano — Estética Avançada_

Olá, Dra. Paula! Acabei de formalizar e assinar digitalmente o meu contrato da Black Friday pelo site oficial.

👤 *DADOS DA PACIENTE:*
• *Nome:* ${patient.name}
• *CPF:* ${patient.cpf}
• *WhatsApp:* ${patient.phone}
• *E-mail:* ${patient.email}

📦 *PACOTE CONTRATADO:*
• *Procedimento:* ${selectedPackage.title}
• *Sessões:* ${selectedPackage.sessions}
• *Condição de Pagamento:* ${paymentText}

🛡️ *TRILHA DE AUDITORIA DIGITAL (OpenSign):*
• *Document ID:* \`${auditData.docId}\`
• *Hash SHA-256:* \`${auditData.sha256}\`
• *Carimbo:* ${auditData.timestamp}
• *Aceite Vigência 2026:* Confirmado (Sessões agendadas e concluídas em 2026)

Por favor, pode me enviar ${isPix ? 'a *chave / QR Code Pix* com o desconto' : 'o *link seguro da maquininha* para parcelamento em 10x'} para confirmação da vaga e podermos já agendar a primeira sessão?

Muito obrigada! 💖`;

  return message;
}

export function getWhatsAppUrl(params) {
  const message = createWhatsAppMessage(params);
  return `https://wa.me/${CLINIC_PHONE}?text=${encodeURIComponent(message)}`;
}
