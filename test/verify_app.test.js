import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 INICIANDO BATERIA DE TESTES DE INTEGRIDADE: ESTÉTICA PAULA BLACK FRIDAY...\n');

// 1. Test Package Data
import { PACKAGES } from '../src/data/packages.js';

console.log('1. Testando integridade do Catálogo de Pacotes...');
assert.strictEqual(PACKAGES.length, 6, 'Devem existir exatamente 6 pacotes');

const requiredPackageIds = [
  'bioestimulador',
  'botox',
  'liporeductt',
  'criolipolise',
  'body-harmony',
  'gluteo-vip',
];

PACKAGES.forEach((pkg) => {
  assert.ok(requiredPackageIds.includes(pkg.id), `ID do pacote desconhecido: ${pkg.id}`);
  assert.ok(pkg.title, `Pacote ${pkg.id} deve ter título`);
  assert.ok(pkg.pixPrice > 0, `Pacote ${pkg.id} deve ter preço Pix > 0`);
  assert.ok(pkg.originalPrice > pkg.pixPrice, `Preço original deve ser maior que o promocional`);
  assert.strictEqual(pkg.installments.count, 10, `Pacote ${pkg.id} deve ter opção de 10x`);
  assert.ok(pkg.installments.value > 0, `Valor da parcela deve ser > 0`);
  assert.ok(pkg.benefits.length >= 4, `Pacote deve ter pelo menos 4 benefícios listados`);
  
  // Verify image file exists
  const imageDiskPath = path.join(rootDir, 'public', pkg.image.replace(/^\//, ''));
  assert.ok(fs.existsSync(imageDiskPath), `Arquivo de imagem não encontrado no disco: ${imageDiskPath}`);
});
console.log('✅ Catálogo de 6 pacotes 100% íntegro e imagens validadas no disco!\n');

// 2. Test Input Masks & CPF Validator
import { maskCPF, maskPhone, isValidCPF } from '../src/utils/masks.js';

console.log('2. Testando Máscaras e Validador de CPF...');
assert.strictEqual(maskCPF('12345678901'), '123.456.789-01');
assert.strictEqual(maskCPF('12345'), '123.45');
assert.strictEqual(maskPhone('11986081762'), '(11) 98608-1762');
assert.strictEqual(maskPhone('1133334444'), '(11) 3333-4444');

// Valid CPF test
assert.strictEqual(isValidCPF('52998224725'), true, 'CPF 52998224725 deve ser válido');
assert.strictEqual(isValidCPF('11111111111'), false, 'CPF com dígitos repetidos deve ser inválido');
assert.strictEqual(isValidCPF('12345678900'), false, 'CPF com dígito verificador incorreto deve ser inválido');
assert.strictEqual(isValidCPF(''), false, 'CPF vazio deve ser inválido');
assert.strictEqual(isValidCPF('123'), false, 'CPF incompleto deve ser inválido');
console.log('✅ Máscaras e algoritmo de validação de CPF verificados com sucesso!\n');

// 3. Test Crypto & OpenSign Trail
import { generateUUID, computeSHA256, getBrasiliaTimestamp } from '../src/utils/crypto.js';

console.log('3. Testando Motor Criptográfico e Trilha de Auditoria OpenSign...');
const uuid = generateUUID();
assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, 'UUID deve estar no formato v4 RFC4122');

const hash = await computeSHA256('PAULA_FELICIANO_BLACK_FRIDAY_2026_LEGAL_CONTRACT');
assert.strictEqual(hash.length, 64, 'Hash SHA-256 deve ter 64 caracteres hexadecimais');
assert.match(hash, /^[0-9a-f]{64}$/, 'Hash SHA-256 deve ser hexadecimal válido');

const ts = getBrasiliaTimestamp();
assert.ok(ts.includes('2026') || ts.includes(new Date().getFullYear().toString()), 'Carimbo temporal deve conter o ano atual');
console.log(`✅ UUID: ${uuid}`);
console.log(`✅ SHA-256 Hash Digest: ${hash}`);
console.log(`✅ Carimbo de Data/Hora: ${ts}\n`);

// 4. Test WhatsApp Message Generator
import { CLINIC_PHONE, createWhatsAppMessage, getWhatsAppUrl } from '../src/utils/whatsapp.js';

console.log('4. Testando Geração de Mensagem e Link de WhatsApp...');
assert.strictEqual(CLINIC_PHONE, '5511986081762', 'Telefone da clínica deve ser +5511986081762');

const samplePatient = {
  name: 'Juliana Ferreira Mendes',
  cpf: '529.982.247-25',
  phone: '(11) 98765-4321',
  email: 'juliana.mendes@gmail.com',
};

const sampleAudit = {
  docId: uuid,
  sha256: hash,
  timestamp: ts,
  ip: '187.19.224.12',
};

const msgPix = createWhatsAppMessage({
  patient: samplePatient,
  selectedPackage: PACKAGES[0],
  paymentMethod: 'pix',
  auditData: sampleAudit,
});

assert.ok(msgPix.includes('Juliana Ferreira Mendes'), 'Mensagem deve conter o nome do paciente');
assert.ok(msgPix.includes('Bioestimulador de Colágeno Facial'), 'Mensagem deve conter o nome do pacote');
assert.ok(msgPix.includes('799,00'), 'Mensagem deve conter o valor Pix correto');
assert.ok(msgPix.includes(uuid), 'Mensagem deve conter o Document ID');
assert.ok(msgPix.includes(hash), 'Mensagem deve conter o hash SHA-256 completo de 64 chars');
assert.ok(msgPix.includes('2026'), 'Mensagem deve ressaltar a realização em 2026');

const msgCard = createWhatsAppMessage({
  patient: samplePatient,
  selectedPackage: PACKAGES[2],
  paymentMethod: 'credit',
  auditData: sampleAudit,
});
assert.ok(msgCard.includes('10x de R$ 96,98'), 'Mensagem de cartão deve conter o valor parcelado');
assert.ok(msgCard.includes('link seguro da maquininha'), 'Mensagem de cartão deve solicitar link da maquininha');

const waUrl = getWhatsAppUrl({
  patient: samplePatient,
  selectedPackage: PACKAGES[0],
  paymentMethod: 'pix',
  auditData: sampleAudit,
});

assert.ok(waUrl.startsWith('https://wa.me/5511986081762?text='), 'URL deve apontar para o WhatsApp oficial');
console.log('✅ Mensagem formatada e URL do WhatsApp validadas com sucesso!\n');

// 5. Test Build Artifacts in dist/
console.log('5. Testando Artefatos do Build de Produção em dist/...');
const distDir = path.join(rootDir, 'dist');
assert.ok(fs.existsSync(distDir), 'Diretório dist/ deve existir');
assert.ok(fs.existsSync(path.join(distDir, 'index.html')), 'dist/index.html deve existir');

const htmlContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
assert.ok(htmlContent.includes('Black Friday VIP 2026'), 'HTML deve conter título da Black Friday');
assert.ok(htmlContent.includes('assets/'), 'HTML deve referenciar bundles compilados');

console.log('✅ Artefatos estáticos prontos para Cloudflare Pages a custo zero!\n');
console.log('🎉 TODOS OS TESTES PASSARAM COM 100% DE SUCESSO!');
