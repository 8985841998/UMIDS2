import React, { useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import type { Patient } from './types';
import { normalizeMedicalQrId } from './utils';
import PatientDetailsCard from './PatientDetailsCard';

const QrScannerPage: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

  // Function to fetch patient data
  const fetchPatientData = async (medicalQrId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/patient/${medicalQrId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Patient not found. Please check the QR code and try again.');
        } else {
          throw new Error('Failed to fetch patient data. Please try again.');
        }
      }
      const patientData: Patient = await response.json();
      setPatient(patientData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setPatient(null);
    } finally {
      setLoading(false);
    }
  };

  // Start camera scanning
  const startCameraScan = () => {
    setScanning(true);
    setPatient(null);
    setError(null);

    // Clean up any existing scanner
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.stop().catch(console.error);
      html5QrCodeRef.current = null;
    }

    // Create new scanner
    html5QrCodeRef.current = new Html5Qrcode("reader");
    
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
    html5QrCodeRef.current.start(
      { facingMode: "environment" },
      config,
      (decodedText) => {
        // Success callback
        const medicalQrId = normalizeMedicalQrId(decodedText);
        fetchPatientData(medicalQrId);
        // Stop scanning after successful read
        if (html5QrCodeRef.current) {
          html5QrCodeRef.current.stop().catch(console.error);
          html5QrCodeRef.current = null;
        }
        setScanning(false);
      },
      (_errorMessage) => {
        // Error callback - we ignore this as it's called frequently during scanning
      }
    ).catch((err) => {
      setError('Failed to start camera: ' + err);
      setScanning(false);
    });
  };

  // Handle image upload for QR scanning
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPatient(null);
    setError(null);
    setLoading(true);

    try {
      const html5QrCode = new Html5Qrcode("reader-placeholder");
      const decodedText = await html5QrCode.scanFile(file, true);
      const medicalQrId = normalizeMedicalQrId(decodedText);
      await fetchPatientData(medicalQrId);
    } catch (err) {
      setError('Failed to decode QR code from image. Please try another image.');
    } finally {
      setLoading(false);
    }
  };

  // Stop camera scanning
  const stopCameraScan = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.stop().catch(console.error);
      html5QrCodeRef.current = null;
    }
    setScanning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Scan Medical QR ID – Emergency Use</h1>
          <p className="text-gray-600">
            Scan a patient's medical QR code to instantly access their critical medical information
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 rounded">
          <p className="font-medium">For emergency clinical use. Data is sample/demo only.</p>
        </div>

        {!patient && !loading && (
          <div className="space-y-8">
            {/* Camera Scanning Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Live Camera Scan</h2>
              
              {!scanning ? (
                <button
                  onClick={startCameraScan}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                >
                  Start Camera Scan
                </button>
              ) : (
                <div className="space-y-4">
                  <div id="reader" className="w-full max-w-md mx-auto"></div>
                  <button
                    onClick={stopCameraScan}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                  >
                    Stop Camera Scan
                  </button>
                </div>
              )}
            </div>

            {/* Image Upload Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Upload Image Scan</h2>
              <div className="flex flex-col items-start">
                <label className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg cursor-pointer transition duration-200">
                  Select QR Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="mt-2 text-gray-600 text-sm">
                  Upload an image containing a medical QR code
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Fetching patient data...</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* Patient Details Display */}
        {patient && <PatientDetailsCard patient={patient} />}

        {/* Hidden placeholder for image scanning */}
        <div id="reader-placeholder" className="hidden"></div>
      </div>
    </div>
  );
};

export default QrScannerPage;