import axiosClient from "../api/axiosClient";
import type { PatientRequest } from "../types/patient.types";

export const createPatient = (data: PatientRequest) => {
  return axiosClient.post("/api/v1/patients", data);
};

export const getPatients = () => {
  return axiosClient.get("/api/v1/patients/search");
};

export const getPatientById = (id: string) => {
  return axiosClient.get(`/api/v1/patients/${id}`);
};

export const updatePatient = (id: string, data: PatientRequest) => {
  return axiosClient.put(`/api/v1/patients/${id}`, data);
};

export const deletePatient = (id: string) => {
  return axiosClient.delete(`/api/v1/patients/${id}`);
};
