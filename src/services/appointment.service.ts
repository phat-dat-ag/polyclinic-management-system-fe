import axiosClient from "../api/axiosClient";
import type { AppointmentCreateRequest } from "../types/appointment.types";

export const addAnAppointment = (data: AppointmentCreateRequest) => {
  return axiosClient.post("/api/v1/appointments", data);
};
