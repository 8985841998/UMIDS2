import React from 'react';
import type { Patient } from './types';

interface PatientDetailsCardProps {
  patient: Patient;
}

const PatientDetailsCard: React.FC<PatientDetailsCardProps> = ({ patient }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{patient.fullName}</h2>
        <div className="flex flex-wrap gap-4 mt-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Age: {patient.age}
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Gender: {patient.gender}
          </span>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            Blood: {patient.bloodGroup}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Medical Conditions</h3>
          {patient.conditions.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {patient.conditions.map((condition, index) => (
                <li key={index} className="text-gray-600">{condition}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No known conditions</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Allergies</h3>
          {patient.allergies.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {patient.allergies.map((allergy, index) => (
                <li key={index} className="text-red-600 font-medium">{allergy}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No known allergies</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Medications</h3>
          {patient.medications.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {patient.medications.map((medication, index) => (
                <li key={index} className="text-gray-600">{medication}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No current medications</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Emergency Contact</h3>
          <p className="text-gray-600">
            <span className="font-medium">Name:</span> {patient.emergencyContactName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Phone:</span> {patient.emergencyContactPhone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsCard;