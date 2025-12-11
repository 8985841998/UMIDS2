import express, { Request, Response } from 'express';
import cors from 'cors';
import { samplePatients, Patient } from './sampleData';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Utility function to normalize QR content to medicalQrId
function normalizeMedicalQrId(qrContent: string): string {
  // If it's a URL like https://medical-id.example.com/p/MEDQR-0001, extract the ID
  if (qrContent.startsWith('http')) {
    const urlParts = qrContent.split('/');
    return urlParts[urlParts.length - 1];
  }
  // If it's already an ID like MEDQR-0001, return as is
  return qrContent;
}

// Route to get patient by medicalQrId
app.get('/api/patient/:medicalQrId', (req: Request, res: Response) => {
  try {
    const medicalQrId = normalizeMedicalQrId(req.params.medicalQrId);
    
    // Find patient in sample data
    const patient = samplePatients.find(p => p.medicalQrId === medicalQrId);
    
    if (!patient) {
      return res.status(404).json({
        error: 'Patient not found',
        message: `No patient found with medical QR ID: ${medicalQrId}`
      });
    }
    
    res.json(patient);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while fetching patient data'
    });
  }
});

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Medical QR Scanner API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Medical QR Scanner backend running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/patient/:medicalQrId`);
});