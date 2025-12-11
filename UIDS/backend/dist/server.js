"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sampleData_1 = require("./sampleData");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Utility function to normalize QR content to medicalQrId
function normalizeMedicalQrId(qrContent) {
    // If it's a URL like https://medical-id.example.com/p/MEDQR-0001, extract the ID
    if (qrContent.startsWith('http')) {
        const urlParts = qrContent.split('/');
        return urlParts[urlParts.length - 1];
    }
    // If it's already an ID like MEDQR-0001, return as is
    return qrContent;
}
// Route to get patient by medicalQrId
app.get('/api/patient/:medicalQrId', (req, res) => {
    try {
        const medicalQrId = normalizeMedicalQrId(req.params.medicalQrId);
        // Find patient in sample data
        const patient = sampleData_1.samplePatients.find(p => p.medicalQrId === medicalQrId);
        if (!patient) {
            return res.status(404).json({
                error: 'Patient not found',
                message: `No patient found with medical QR ID: ${medicalQrId}`
            });
        }
        res.json(patient);
    }
    catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred while fetching patient data'
        });
    }
});
// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Medical QR Scanner API is running' });
});
// Start server
app.listen(PORT, () => {
    console.log(`Medical QR Scanner backend running on port ${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/patient/:medicalQrId`);
});
