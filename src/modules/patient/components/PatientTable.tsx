import { Button, Popconfirm, Table, Tag } from "antd";
import type { Patient } from "../../../types/patient.types";

interface PatientTableProps {
    patients: Patient[];
    loading: boolean;
    onDelete: (id: string) => Promise<void>;
    onEdit: (patient: Patient) => void;
}

const PatientTable = ({ patients, loading, onDelete, onEdit }: PatientTableProps) => {
    const columns = [
        {
            title: "Mã bệnh nhân",
            dataIndex: "patientCode",
            key: "patientCode",
            render: (code: string) => <span className="font-semibold">{code}</span>,
        },
        {
            title: "Họ và tên",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            render: (gender: string) => (
                <Tag color={gender === "male" ? "blue" : gender === "female" ? "pink" : "purple"}>
                    {gender === "male" ? "Nam" : gender === "female" ? "Nữ" : "Khác"}
                </Tag>
            ),
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            render: (dob: string) => new Date(dob).toLocaleDateString("vi-VN"),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "CCCD",
            dataIndex: "idNumber",
            key: "idNumber",
        },
        {
            title: "Số BHYT",
            dataIndex: "insuranceNumber",
            key: "insuranceNumber",
            render: (val: string) => val || <i className="text-gray-400">Không có</i>,
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) =>
                new Date(date).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" }),
        },
        {
            title: "Cập nhật",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (date: string) =>
                new Date(date).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" }),
        },
        {
            title: "Thao tác",
            key: "actions",
            render: (_: unknown, record: Patient) => (
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => onEdit(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa bệnh nhân"
                        description="Bạn có chắc chắn muốn xóa bệnh nhân này không?"
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                        onConfirm={() => onDelete(record._id)}
                    >
                        <Button danger size="small">
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <Table
            dataSource={patients}
            columns={columns}
            rowKey="patientCode"
            loading={loading}
            pagination={{ pageSize: 8 }}
            bordered
        />
    );
};

export default PatientTable;
