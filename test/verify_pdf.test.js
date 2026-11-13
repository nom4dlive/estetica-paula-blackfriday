import assert from 'node:assert';
import { generateContractPDF } from '../src/utils/pdfGenerator.js';
import { PACKAGES } from '../src/data/packages.js';

console.log('🧪 TESTANDO MOTOR REAL DE GERAÇÃO DE PDF (JSPDF + OPENSIGN)...');

const samplePatient = {
  name: 'Mariana Vasconcelos Ribeiro',
  cpf: '529.982.247-25',
  phone: '(11) 98608-1762',
  email: 'mariana.vasconcelos@gmail.com',
};

const sampleAudit = {
  docId: 'c8f7d912-34ab-4cde-8901-23456789abcd',
  sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
  timestamp: 'sexta-feira, 13 de novembro de 2026 às 11:30:00',
  timestampShort: '13/11/2026 11:30:00',
  ip: '189.120.45.10',
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)',
};

// 1x1 sample base64 PNG image simulating touch signature
const sampleSignature =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// Test 1: Generate PDF for Pix payment with signature
console.log('1. Testando geração de contrato com Pix e Assinatura Gráfica...');
const pixResult = await generateContractPDF({
  patient: samplePatient,
  selectedPackage: PACKAGES[0], // Bioestimulador
  paymentMethod: 'pix',
  signatureDataUrl: sampleSignature,
  auditData: sampleAudit,
});

assert.ok(pixResult.doc, 'jsPDF instance deve ser retornada');
assert.strictEqual(pixResult.doc.getNumberOfPages(), 2, 'Contrato deve ter exatamente 2 páginas');
assert.ok(pixResult.filename.includes('Mariana_Vasconcelos_Ribeiro'), 'Filename deve conter o nome formatado');
assert.ok(pixResult.filename.includes('.pdf'), 'Extensão deve ser .pdf');

const pixBuffer = pixResult.doc.output('arraybuffer');
assert.ok(pixBuffer.byteLength > 2000, `Buffer deve ser > 2KB (atual: ${pixBuffer.byteLength} bytes)`);

// Verify PDF header magic bytes %PDF
const header = Buffer.from(pixBuffer.slice(0, 5)).toString('ascii');
assert.strictEqual(header, '%PDF-', 'O buffer deve iniciar com o cabeçalho %PDF-');
console.log(`✅ Contrato Pix gerado com sucesso! Tamanho: ${pixBuffer.byteLength} bytes.`);

// Test 2: Generate PDF for Credit Card in 10x
console.log('2. Testando geração de contrato com Cartão em 10x...');
const cardResult = await generateContractPDF({
  patient: samplePatient,
  selectedPackage: PACKAGES[2], // Liporeductt
  paymentMethod: 'credit',
  signatureDataUrl: sampleSignature,
  auditData: sampleAudit,
});

assert.strictEqual(cardResult.doc.getNumberOfPages(), 2, 'Contrato Cartão deve ter exatamente 2 páginas');
const cardBuffer = cardResult.doc.output('arraybuffer');
assert.ok(cardBuffer.byteLength > 2000, `Buffer deve ser > 2KB (atual: ${cardBuffer.byteLength} bytes)`);
console.log(`✅ Contrato Cartão 10x gerado com sucesso! Tamanho: ${cardBuffer.byteLength} bytes.`);

// Test 3: Null signature fallback handling
console.log('3. Testando resiliência sem assinatura (fallback gracioso)...');
const nullSigResult = await generateContractPDF({
  patient: samplePatient,
  selectedPackage: PACKAGES[5], // Glúteo VIP
  paymentMethod: 'pix',
  signatureDataUrl: null,
  auditData: sampleAudit,
});

assert.strictEqual(nullSigResult.doc.getNumberOfPages(), 2, 'Deve gerar 2 páginas mesmo sem assinatura');
console.log('✅ Fallback sem assinatura testado e aprovado com sucesso!');

console.log('\n🎉 TODOS OS TESTES DO MOTOR DE PDF PASSARAM COM SUCESSO REAL!');
