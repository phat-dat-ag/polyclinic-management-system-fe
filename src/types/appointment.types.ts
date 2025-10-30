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
