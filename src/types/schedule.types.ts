export interface TimeSlot {
  _id?: string;
  start: string;
  end: string;
  duration: number;
  maxPatients: number;
  isAvailable: boolean;
}

export type ShiftType = "morning" | "afternoon" | "evening" | "night";

export interface CreateScheduleRequest {
  doctor: string;
  department: string;
  scheduleDate: string;
  shiftType: ShiftType;
  timeSlots: TimeSlot[];
}

export interface GetScheduleParameter {
  page?: number;
  limit?: number;
  doctor?: string;
}

export interface DoctorInfo {
  isAvailable: boolean;
}

export interface Doctor {
  _id: string;
  email: string;
  fullName: string;
  phone: string;
  doctorInfo: DoctorInfo;
}

export interface CreatedBy {
  _id: string;
  username: string;
  fullName: string;
}

export interface DoctorScheduleItem {
  _id: string;
  doctor: Doctor;
  department: string;
  scheduleDate: string;
  shiftType: ShiftType;
  timeSlots: TimeSlot[];
  status: string;
  createdBy: CreatedBy;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pagination {
  current: number;
  pages: number;
  total: number;
}

export interface DoctorScheduleData {
  schedules: DoctorScheduleItem[];
  pagination: Pagination;
}
