import type { CreateScheduleRequest } from "../types/schedule.types";
import axiosClient from "../api/axiosClient";

export const addSchedule = (data: CreateScheduleRequest) => {
  return axiosClient.post("/api/v1/doctor-schedules", data);
};
