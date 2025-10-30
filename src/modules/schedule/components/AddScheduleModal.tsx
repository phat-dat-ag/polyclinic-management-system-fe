import { useEffect, useState } from "react";
import {
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
    Button,
    InputNumber,
    Switch,
    Space,
    message,
} from "antd";
import type { TimeSlot, DoctorScheduleItem } from "../../../types/schedule.types";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export interface ScheduleForm {
    department: string;
    scheduleDate: Dayjs | string;
    shiftType: string;
    timeSlots: TimeSlot[];
}

interface AddScheduleModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ScheduleForm) => void;
    mode?: "create" | "view" | "edit";
    scheduleData?: DoctorScheduleItem | null;
}

const AddScheduleModal = ({
    open,
    onClose,
    onSubmit,
    mode = "create",
    scheduleData,
}: AddScheduleModalProps) => {
    const [form] = Form.useForm<ScheduleForm>();
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
        { start: "", end: "", duration: 30, maxPatients: 10, isAvailable: true },
    ]);

    const isReadOnly = mode === "view";

    useEffect(() => {
        if (scheduleData) {
            form.setFieldsValue({
                department: scheduleData.department,
                scheduleDate: dayjs(scheduleData.scheduleDate),
                shiftType: scheduleData.shiftType,
                timeSlots: scheduleData.timeSlots,
            });
            setTimeSlots(scheduleData.timeSlots);
        } else {
            form.resetFields();
            setTimeSlots([
                { start: "", end: "", duration: 30, maxPatients: 10, isAvailable: true },
            ]);
        }
    }, [scheduleData, open, form]);


    const handleAddSlot = () => {
        setTimeSlots((prev) => [
            ...prev,
            { start: "", end: "", duration: 30, maxPatients: 10, isAvailable: true },
        ]);
    };

    const handleRemoveSlot = (index: number) => {
        setTimeSlots((prev) => prev.filter((_, i) => i !== index));
    };

    const handleChangeSlot = <K extends keyof TimeSlot>(
        index: number,
        field: K,
        value: TimeSlot[K]
    ) => {
        setTimeSlots((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
    };

    const validateTimeSlots = (): boolean => {
        for (let i = 0; i < timeSlots.length; i++) {
            const slot = timeSlots[i];
            if (!slot.start || !slot.end) {
                message.error(`Ca ${i + 1}: Vui lòng nhập giờ bắt đầu và kết thúc`);
                return false;
            }
            if (slot.start >= slot.end) {
                message.error(`Ca ${i + 1}: Giờ bắt đầu phải nhỏ hơn giờ kết thúc`);
                return false;
            }
            const startTime = dayjs(slot.start, "HH:mm");
            const endTime = dayjs(slot.end, "HH:mm");
            const totalMinutes = endTime.diff(startTime, "minute");
            if (slot.duration <= 0 || slot.duration > totalMinutes) {
                message.error(
                    `Ca ${i + 1}: Thời lượng phải lớn hơn 0 và nhỏ hơn tổng thời gian (${totalMinutes} phút)`
                );
                return false;
            }
            if (slot.maxPatients < 1) {
                message.error(`Ca ${i + 1}: Số bệnh nhân tối đa phải ≥ 1`);
                return false;
            }
        }

        const sorted = [...timeSlots].sort((a, b) => a.start.localeCompare(b.start));
        for (let i = 0; i < sorted.length - 1; i++) {
            if (sorted[i].end > sorted[i + 1].start) {
                message.error(`Ca ${i + 1} và Ca ${i + 2} bị trùng thời gian`);
                return false;
            }
        }

        return true;
    };

    const handleOk = async () => {
        if (isReadOnly) {
            onClose();
            return;
        }

        try {
            const values = await form.validateFields();

            const scheduleDateDayjs: Dayjs =
                typeof values.scheduleDate === "string" ? dayjs(values.scheduleDate) : (values.scheduleDate as Dayjs);

            if (scheduleDateDayjs.isBefore(dayjs(), "day")) {
                message.error("Ngày trực không được nhỏ hơn ngày hôm nay");
                return;
            }

            if (!validateTimeSlots()) return;

            const payload: ScheduleForm = {
                department: values.department.trim(),
                scheduleDate: scheduleDateDayjs.format("YYYY-MM-DD"),
                shiftType: values.shiftType,
                timeSlots,
            };

            onSubmit(payload);
            message.success(mode === "edit" ? "Cập nhật lịch trực thành công 🎉" : "Thêm lịch trực thành công 🎉");

            if (mode === "create") {
                form.resetFields();
                setTimeSlots([{ start: "", end: "", duration: 30, maxPatients: 10, isAvailable: true }]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            title={mode === "view" ? "Xem chi tiết lịch trực" : mode === "edit" ? "Cập nhật lịch trực" : "Thêm lịch trực mới"}
            open={open}
            onCancel={onClose}
            onOk={handleOk}
            okText={isReadOnly ? "Đóng" : mode === "edit" ? "Cập nhật" : "Lưu"}
            cancelButtonProps={{ style: { display: isReadOnly ? "none" : "inline-block" } }}
            width={800}
        >
            <Form form={form} layout="vertical" initialValues={{ shiftType: "morning" }}>
                <Form.Item
                    label="Khoa"
                    name="department"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên khoa" },
                        { min: 2, message: "Tên khoa phải có ít nhất 2 ký tự" },
                    ]}
                >
                    <Input placeholder="Nhập tên khoa" disabled={isReadOnly} />
                </Form.Item>

                <Form.Item label="Ngày trực" name="scheduleDate" rules={[{ required: true, message: "Vui lòng chọn ngày trực" }]}>
                    <DatePicker
                        className="w-full"
                        format="YYYY-MM-DD"
                        disabledDate={(current) => current && current < dayjs().startOf("day")}
                        disabled={isReadOnly}
                    />
                </Form.Item>

                <Form.Item label="Ca trực" name="shiftType" rules={[{ required: true, message: "Vui lòng chọn ca trực" }]}>
                    <Select disabled={isReadOnly}>
                        <Select.Option value="morning">Sáng</Select.Option>
                        <Select.Option value="afternoon">Chiều</Select.Option>
                        <Select.Option value="evening">Tối</Select.Option>
                        <Select.Option value="night">Đêm</Select.Option>
                    </Select>
                </Form.Item>

                <div className="border-t pt-4 mt-2">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-base">Danh sách ca trong ngày</h3>
                        {!isReadOnly && <Button onClick={handleAddSlot}>+ Thêm ca</Button>}
                    </div>

                    {timeSlots.map((slot, index) => (
                        <div key={index} className="grid grid-cols-6 gap-2 p-3 border rounded-lg mb-2 bg-gray-50">
                            <Input
                                type="time"
                                value={slot.start}
                                onChange={(e) => handleChangeSlot(index, "start", e.target.value)}
                                disabled={isReadOnly}
                            />
                            <Input
                                type="time"
                                value={slot.end}
                                onChange={(e) => handleChangeSlot(index, "end", e.target.value)}
                                disabled={isReadOnly}
                            />
                            <InputNumber
                                min={10}
                                max={600}
                                value={slot.duration}
                                onChange={(v) => handleChangeSlot(index, "duration", v ?? 0)}
                                placeholder="Thời lượng (phút)"
                                className="w-full"
                                disabled={isReadOnly}
                            />
                            <InputNumber
                                min={1}
                                max={100}
                                value={slot.maxPatients}
                                onChange={(v) => handleChangeSlot(index, "maxPatients", v ?? 0)}
                                placeholder="Tối đa BN"
                                className="w-full"
                                disabled={isReadOnly}
                            />
                            <Space align="center">
                                <Switch
                                    checked={slot.isAvailable}
                                    onChange={(checked) => handleChangeSlot(index, "isAvailable", checked)}
                                    disabled={isReadOnly}
                                />
                                <span>{slot.isAvailable ? "Khả dụng" : "Nghỉ"}</span>
                            </Space>
                            {!isReadOnly && (
                                <Button danger onClick={() => handleRemoveSlot(index)}>
                                    Xóa
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </Form>
        </Modal>
    );
};

export default AddScheduleModal;
