import axiosClient from "../api/axiosClient";
import type {
  AppointmentCreateRequest,
  GetAppointmentParameter,
} from "../types/appointment.types";

export const addAnAppointment = (data: AppointmentCreateRequest) => {
  return axiosClient.post("/api/v1/appointments", data);
};

export const getAppointments = (params: GetAppointmentParameter) => {
  return axiosClient.get("/api/v1/appointments", { params });
};
