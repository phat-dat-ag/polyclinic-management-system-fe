export interface TimeSlot {
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
