import { useEffect, useState } from "react";
import { Button, message, Spin } from "antd";
import AddScheduleModal, { type ScheduleForm } from "./components/AddScheduleModal";
import type { User } from "../../types/user.types";
import type { CreateScheduleRequest, DoctorScheduleData, DoctorScheduleItem, ShiftType } from "../../types/schedule.types";
import dayjs from "dayjs";
import type { AxiosError } from "axios";
import { addSchedule, getSchedule } from "../../services/doctor.service";
import ScheduleTable from "./components/ScheduleTable";

const DoctorSchedule = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [schedules, setSchedules] = useState<DoctorScheduleItem[]>([]);

    async function loadSchedule() {
        setLoading(true);
        try {
            const userString = localStorage.getItem("user");
            const user: User | null = userString ? JSON.parse(userString) : null;
            if (!user) {
                message.error("Lỗi lấy lịch hẹn cho bác sĩ: Không thấy tài khoản bác sĩ");
                return;
            }
            const response = await getSchedule({ doctor: user._id });
            const data: DoctorScheduleData = response.data;
            setSchedules(data.schedules);
        } catch (e) {
            const error = e as AxiosError<{ message: string }>;
            message.error(error.response?.data.message || "Đã có lỗi khi lấy lịch trực");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSchedule();
    }, [])

    const handleSubmit = async (formValues: ScheduleForm) => {
        setLoading(true);
        try {
            const userString = localStorage.getItem("user");
            const user: User | null = userString ? JSON.parse(userString) : null;
            if (!user) {
                message.error("Lỗi thêm lịch hẹn: Không thấy tài khoản bác sĩ");
                return;
            }
            const payload: CreateScheduleRequest = {
                doctor: user._id,
                department: formValues.department,
                scheduleDate: dayjs(formValues.scheduleDate).format("YYYY-MM-DD"),
                shiftType: formValues.shiftType as ShiftType,
                timeSlots: formValues.timeSlots,
            };

            await addSchedule(payload);
            await loadSchedule();

            setOpen(false);
        } catch (e) {
            const error = e as AxiosError<{ message: string }>;
            message.error(error.response?.data.message || "Đã có lỗi khi tạo lịch trực");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-white/60 z-50">
                    <Spin fullscreen tip="Đang xử lý..." />
                </div>
            )}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Quản lý lịch trực</h2>
                <Button type="primary" onClick={() => setOpen(true)}>
                    Thêm lịch trực
                </Button>
            </div>

            <ScheduleTable schedules={schedules} loading={loading} />

            <AddScheduleModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default DoctorSchedule;