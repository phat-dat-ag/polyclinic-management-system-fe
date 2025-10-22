import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePatient, getPatients } from "../../services/patient.service";
import { message, Spin } from "antd";
import type { Patient, PatientResponse } from "../../types/patient.types";
import type { AxiosError } from "axios";
import PatientTable from "./components/PatientTable";

const PatientManagementPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);
    async function fetchPatients() {
        try {
            setLoading(true);
            const response = await getPatients();
            const dataResponse: PatientResponse = response.data;
            setPatients(dataResponse.patients);
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            message.error(error.response?.data?.message || "Có lỗi khi lấy danh sách bệnh nhân");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPatients();
    }, [])

    async function handleDeletePatient(id: string) {
        try {
            setLoading(true);
            await deletePatient(id);
            fetchPatients();
            message.success("Đã xóa bệnh nhân");
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            message.error(error.response?.data?.message || "Có lỗi khi xóa bệnh nhân");
        } finally {
            setLoading(false);
        }
    }

    function handleEditPatient(patient: Patient) {
        navigate(`/doctor/patient-management/edit/${patient._id}`, {
            state: { patient },
        });
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-white/60 z-50">
                        <Spin fullscreen tip="Đang xử lý" />
                    </div>
                )}
                <h2 className="text-2xl font-bold text-blue-700">
                    Quản lý bệnh nhân
                </h2>
                <button
                    onClick={() => navigate("/doctor/patient-management/add")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    + Thêm bệnh nhân
                </button>
            </div>

            {patients.length === 0 ? (
                <p className="text-gray-500 italic text-center mt-10">
                    Chưa có bệnh nhân nào trong danh sách
                </p>
            ) : (
                <PatientTable patients={patients} loading={loading} onDelete={handleDeletePatient} onEdit={handleEditPatient} />
            )}
        </div>
    );
};

export default PatientManagementPage;
