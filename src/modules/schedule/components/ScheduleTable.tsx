import { Table, Tag, Tooltip, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { DoctorScheduleItem, TimeSlot } from "../../../types/schedule.types";
import dayjs from "dayjs";

interface ScheduleTableProps {
    schedules: DoctorScheduleItem[];
    loading?: boolean;
    isAdminView?: boolean;
    onView?: (record: DoctorScheduleItem) => void;
    onEdit?: (record: DoctorScheduleItem) => void;
}

const ScheduleTable = ({
    schedules,
    loading,
    isAdminView = false,
    onView,
    onEdit,
}: ScheduleTableProps) => {
    const columns: ColumnsType<DoctorScheduleItem> = [
        ...(isAdminView
            ? [
                {
                    title: "Bác sĩ",
                    dataIndex: ["doctor", "fullName"],
                    key: "doctor",
                    render: (text: string, record: DoctorScheduleItem) => (
                        <Tooltip title={`Email: ${record.doctor.email}`}>
                            <span className="font-medium">{text}</span>
                        </Tooltip>
                    ),
                },
            ]
            : []),
        {
            title: "Khoa",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Ngày trực",
            dataIndex: "scheduleDate",
            key: "scheduleDate",
            render: (value: string) => dayjs(value).format("DD/MM/YYYY"),
        },
        {
            title: "Ca trực",
            dataIndex: "shiftType",
            key: "shiftType",
            render: (shift: string) => {
                const shiftMap: Record<string, string> = {
                    morning: "Sáng",
                    afternoon: "Chiều",
                    evening: "Tối",
                    night: "Đêm",
                };
                return shiftMap[shift] || shift;
            },
        },
        {
            title: "Các khung giờ",
            dataIndex: "timeSlots",
            key: "timeSlots",
            render: (slots: TimeSlot[]) => (
                <div className="flex flex-col gap-1">
                    {slots.map((slot) => (
                        <Tag key={slot._id} color={slot.isAvailable ? "green" : "red"}>
                            {slot.start} - {slot.end} ({slot.duration}p)
                        </Tag>
                    ))}
                </div>
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
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => onView?.(record)}>
                        Xem
                    </Button>
                    <Button size="small" type="primary" onClick={() => onEdit?.(record)}>
                        Sửa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            rowKey="_id"
            columns={columns}
            dataSource={schedules}
            loading={loading}
            pagination={false}
            bordered
            size="middle"
        />
    );
};

export default ScheduleTable;
