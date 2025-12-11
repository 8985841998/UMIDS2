# Medical QR Scanner Web App

A complete web application for emergency medical situations that allows healthcare professionals to scan a patient's QR-based universal medical ID and instantly access their critical medical details.

## Features

- **QR Code Scanning**: Supports both live camera scanning and image upload
- **Patient Information Display**: Clearly shows critical medical information
- **Responsive Design**: Works on both mobile and desktop devices
- **Sample Data**: Pre-loaded with 5 sample patient records for demonstration

## Tech Stack

### Frontend
- React + TypeScript + Vite
- Tailwind CSS for styling
- html5-qrcode library for QR scanning
- Mobile-first responsive design

### Backend
- Node.js + Express + TypeScript
- In-memory sample data (no database required)
- CORS-enabled API

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── sampleData.ts    # Sample patient records
│   │   └── server.ts        # Express server implementation
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── types.ts         # TypeScript interfaces
│   │   └── utils.ts         # Utility functions
│   ├── package.json
│   └── README.md
│
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm run build
   npm start
   ```

4. The backend will run on `http://localhost:3001` by default.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the API base URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:5173`

## Sample QR Codes for Testing

Actual QR code images have been generated and are available in the [qr-codes](qr-codes) directory.

You can test the application with the following QR code values:

### Raw IDs:
- `MEDQR-0001` - Arun Kumar (B+, Type 2 Diabetes, Hypertension)
- `MEDQR-0002` - Sneha Reddy (O+, Asthma, NSAIDs allergy)
- `MEDQR-0003` - Ravi Verma (A-, Epilepsy)
- `MEDQR-0004` - Lakshmi Nair (AB+, Pregnancy, Hypothyroidism)
- `MEDQR-0005` - Imran Shaikh (O-, Nut allergy)

### URL-encoded IDs:
- `https://medical-id.example.com/p/MEDQR-0001`
- `https://medical-id.example.com/p/MEDQR-0002`
- `https://medical-id.example.com/p/MEDQR-0003`
- `https://medical-id.example.com/p/MEDQR-0004`
- `https://medical-id.example.com/p/MEDQR-0005`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/patient/:medicalQrId` - Get patient details by medical QR ID

## Disclaimer

This is a prototype application for demonstration purposes only. The patient data is sample data and not real medical information.