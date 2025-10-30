import { useEffect, useState } from "react";
import { Table, Tag, Tooltip, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { AxiosError } from "axios";
import type { Appointment } from "../../types/appointment.types";
import { getAppointments } from "../../services/appointment.service";

const DoctorAppointment = () => {
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const loadAppointments = async () => {
        setLoading(true);
        try {
            const response = await getAppointments({});
            const data = response.data;
            setAppointments(data.appointments);
        } catch (e) {
            const error = e as AxiosError<{ message: string }>;
            message.error(error.response?.data.message || "Đã có lỗi khi lấy lịch hẹn");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    const columns: ColumnsType<Appointment> = [
        {
            title: "Mã lịch hẹn",
            dataIndex: "appointmentCode",
            key: "appointmentCode",
            render: (code: string) => (
                <Tooltip title="Mã hệ thống tự sinh">
                    <span className="font-medium">{code}</span>
                </Tooltip>
            ),
        },
        {
            title: "Họ tên",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Ngày khám",
            dataIndex: "appointmentDate",
            key: "appointmentDate",
            render: (value: string) => dayjs(value).format("DD/MM/YYYY"),
        },
        {
            title: "Khung giờ",
            dataIndex: "timeSlot",
            key: "timeSlot",
            render: (slot) => (
                <Tag color="blue">
                    {slot.start} - {slot.end} ({slot.duration}p)
                </Tag>
            ),
        },
        {
            title: "Nguồn tạo",
            dataIndex: "source",
            key: "source",
            render: (source: string) => (
                <Tag color={source === "online" ? "green" : "orange"}>
                    {source.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const color =
                    status === "scheduled"
                        ? "blue"
                        : status === "completed"
                            ? "green"
                            : status === "cancelled"
                                ? "red"
                                : "default";
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (value: string) => dayjs(value).format("HH:mm DD/MM/YYYY"),
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Danh sách lịch hẹn khám bệnh</h2>
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={appointments}
                loading={loading}
                bordered
                pagination={false}
                size="middle"
            />
        </div>
    );
};

export default DoctorAppointment;