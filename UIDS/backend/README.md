# Medical QR Scanner Backend

This is the backend server for the Medical QR Scanner Web App, built with Node.js, Express, and TypeScript.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Build the project:
   ```
   npm run build
   ```

3. Start the server:
   ```
   npm start
   ```

   Or for development with auto-reload:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/patient/:medicalQrId` - Get patient details by medical QR ID

## Environment Variables

- `PORT` - Port to run the server on (default: 3001)

## Sample Medical QR IDs

- MEDQR-0001 - Arun Kumar
- MEDQR-0002 - Sneha Reddy
- MEDQR-0003 - Ravi Verma
- MEDQR-0004 - Lakshmi Nair
- MEDQR-0005 - Imran Shaikh