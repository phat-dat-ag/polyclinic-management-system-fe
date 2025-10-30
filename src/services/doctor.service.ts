import type {
  CreateScheduleRequest,
  GetScheduleParameter,
} from "../types/schedule.types";
import axiosClient from "../api/axiosClient";

export const addSchedule = (data: CreateScheduleRequest) => {
  return axiosClient.post("/api/v1/doctor-schedules", data);
};

export const getSchedule = (params: GetScheduleParameter) => {
  return axiosClient.get("/api/v1/doctor-schedules", { params });
};
