export interface TimeSlot {
  start: string;
  end: string;
  duration: string;
}

export interface AppointmentCreateRequest {
  fullName: string;
  phone: string;
  appointmentDate: string;
  timeSlot: TimeSlot;
}

export interface GetAppointmentParameter {
  page?: number;
  limit?: number;
  doctor?: string;
}

export interface Appointment {
  _id: string;
  appointmentCode: string;
  fullName: string;
  phone: string;
  appointmentDate: string;
  status: "scheduled" | "completed" | "cancelled" | string;
  source: "online" | "offline" | string;
  timeSlot: TimeSlot;
  doctor: string | null;
  doctorSchedule: string | null;
  patient: string | null;
  examination: string | null;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentData {
  appointments: Appointment[];
}
