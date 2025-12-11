# Medical QR Scanner Frontend

This is the frontend for the Medical QR Scanner Web App, built with React, TypeScript, and Vite.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Features

- Camera-based QR scanning using device camera
- Image upload for QR code scanning
- Responsive design suitable for mobile devices
- Clear display of patient medical information
- Error handling for invalid QR codes or missing patients

## Environment Variables

Create a `.env` file in the frontend root directory with the following:

```
VITE_API_BASE_URL=http://localhost:3001
```

## Sample QR Values for Testing

You can test with the following QR content values:

### Raw IDs:
- MEDQR-0001
- MEDQR-0002
- MEDQR-0003
- MEDQR-0004
- MEDQR-0005

### URL-encoded IDs:
- https://medical-id.example.com/p/MEDQR-0001
- https://medical-id.example.com/p/MEDQR-0002
- https://medical-id.example.com/p/MEDQR-0003
- https://medical-id.example.com/p/MEDQR-0004
- https://medical-id.example.com/p/MEDQR-0005