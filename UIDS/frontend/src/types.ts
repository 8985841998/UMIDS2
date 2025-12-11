export interface Patient {
  medicalQrId: string;
  fullName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
}