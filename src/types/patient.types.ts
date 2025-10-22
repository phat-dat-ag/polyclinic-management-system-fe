import type { Address } from "./address.types";

export interface PatientRequest {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address: Address;
  idNumber: string;
  insuranceNumber: string;
}

export interface Patient {
  _id: string;
  patientCode: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address: Address;
  idNumber: string;
  insuranceNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientResponse {
  patients: Patient[];
}
