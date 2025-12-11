// Utility function to normalize QR content to medicalQrId
export function normalizeMedicalQrId(qrContent: string): string {
  // If it's a URL like https://medical-id.example.com/p/MEDQR-0001, extract the ID
  if (qrContent.startsWith('http')) {
    const urlParts = qrContent.split('/');
    return urlParts[urlParts.length - 1];
  }
  // If it's already an ID like MEDQR-0001, return as is
  return qrContent;
}