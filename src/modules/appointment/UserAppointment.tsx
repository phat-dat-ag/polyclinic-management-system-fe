import { useState } from "react";
import { Form, Input, DatePicker, TimePicker, Button, Card, message, Spin } from "antd";
import dayjs from "dayjs";
import { AxiosError } from "axios";
import type { AppointmentCreateRequest } from "../../types/appointment.types";
import { addAnAppointment } from "../../services/appointment.service";

const UserAppointment = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const values = await form.validateFields();

            const { fullName, phone, appointmentDate, timeSlot } = values;

            const phonePattern = /^(?:\+84|0)\d{9}$/;
            if (!phonePattern.test(phone.trim())) {
                message.error("Số điện thoại không hợp lệ");
                return;
            }

            const payload: AppointmentCreateRequest = {
                fullName: fullName.trim(),
                phone: phone.trim(),
                appointmentDate: appointmentDate.format("YYYY-MM-DD"),
                timeSlot: {
                    start: timeSlot[0].format("HH:mm"),
                    end: timeSlot[1].format("HH:mm"),
                    duration: String(dayjs(timeSlot[1]).diff(timeSlot[0], "minute")),
                },
            };

            await addAnAppointment(payload);
            message.success("Đặt lịch khám thành công");
            form.resetFields();
        } catch (e) {
            const error = e as AxiosError<{ message: string }>;
            message.error(error.response?.data?.message || "Đã có lỗi khi tạo lịch trực");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center px-4">
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-white/60 z-50">
                    <Spin fullscreen tip="Đang xử lý..." />
                </div>
            )}
            <Card
                title="Đăng ký khám bệnh"
                className="w-full max-w-lg shadow-lg rounded-2xl"
                bordered={false}
            >
                <p className="text-gray-600 mb-6 text-center">
                    Quý khách vui lòng điền thông tin bên dưới để đặt lịch khám
                </p>

                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[
                            { required: true, message: "Vui lòng nhập họ tên" },
                            { min: 2, message: "Tên phải có ít nhất 2 ký tự" },
                        ]}
                    >
                        <Input placeholder="Nhập họ tên bệnh nhân" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            { required: true, message: "Vui lòng nhập số điện thoại" },
                            {
                                pattern: /^(0[1-9][0-9]{8})$/,
                                message: "Số điện thoại không hợp lệ",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại (VD: 0987654321)" />
                    </Form.Item>

                    <Form.Item
                        label="Ngày khám"
                        name="appointmentDate"
                        rules={[{ required: true, message: "Vui lòng chọn ngày khám" }]}
                    >
                        <DatePicker
                            className="w-full"
                            format="YYYY-MM-DD"
                            disabledDate={(current) => current && current < dayjs().startOf("day")}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Khung giờ khám"
                        name="timeSlot"
                        rules={[{ required: true, message: "Vui lòng chọn khung giờ" }]}
                    >
                        <TimePicker.RangePicker
                            className="w-full"
                            format="HH:mm"
                            minuteStep={15}
                            showNow={false}
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full mt-4"
                    >
                        Xác nhận đặt lịch
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default UserAppointment;