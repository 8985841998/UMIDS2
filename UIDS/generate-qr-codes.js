const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Create directory for QR codes
const qrDir = path.join(__dirname, 'qr-codes');
if (!fs.existsSync(qrDir)) {
  fs.mkdirSync(qrDir, { recursive: true });
}

// Sample medical QR IDs
const sampleIds = [
  'MEDQR-0001',
  'MEDQR-0002',
  'MEDQR-0003',
  'MEDQR-0004',
  'MEDQR-0005'
];

// Base URL for URL-encoded versions
const baseUrl = 'https://medical-id.example.com/p/';

// Generate QR codes for each sample ID
async function generateQRCodes() {
  console.log('Generating QR codes...');
  
  for (const id of sampleIds) {
    try {
      // Generate QR code for raw ID
      const rawQRPath = path.join(qrDir, `${id}-raw.png`);
      await QRCode.toFile(rawQRPath, id);
      console.log(`Generated QR code for raw ID: ${id}`);
      
      // Generate QR code for URL-encoded ID
      const urlId = `${baseUrl}${id}`;
      const urlQRPath = path.join(qrDir, `${id}-url.png`);
      await QRCode.toFile(urlQRPath, urlId);
      console.log(`Generated QR code for URL ID: ${urlId}`);
    } catch (err) {
      console.error(`Error generating QR code for ${id}:`, err);
    }
  }
  
  console.log('\nQR code generation complete!');
  console.log(`QR codes saved to: ${qrDir}`);
  console.log('\nGenerated QR codes:');
  sampleIds.forEach(id => {
    console.log(`- ${id}-raw.png (Raw ID: ${id})`);
    console.log(`- ${id}-url.png (URL: ${baseUrl}${id})`);
  });
}

generateQRCodes();