import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message, Spin } from "antd";
import type { AxiosError } from "axios";
import type { Patient, PatientRequest } from "../../types/patient.types";
import PatientForm from "./components/PatientForm";
import { getPatientById, updatePatient } from "../../services/patient.service";

const EditPatientPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchPatient() {
            if (!id) {
                message.error("Không tìm thấy ID bệnh nhân.");
                navigate("/doctor/patient-management");
                return;
            }

            try {
                setLoading(true);
                const response = await getPatientById(id);

                const patientData = response?.data?.patient;
                if (!patientData) {
                    message.error("Không tìm thấy dữ liệu bệnh nhân.");
                    navigate("/doctor/patient-management");
                    return;
                }

                if (isMounted) {
                    setPatient(patientData);
                }
            } catch (err) {
                const error = err as AxiosError<{ message: string }>;
                message.error(error.response?.data?.message || "Không lấy được dữ liệu bệnh nhân");
                navigate("/doctor/patient-management");
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchPatient();

        return () => {
            isMounted = false;
        };
    }, [id, navigate]);

    const handleUpdate = async (data: PatientRequest) => {
        if (!id) return;
        try {
            await updatePatient(id, data);
            message.success("Cập nhật thông tin bệnh nhân thành công!");
            navigate("/doctor/patient-management");
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            message.error(error.response?.data?.message || "Không thể cập nhật bệnh nhân");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <Spin tip="Đang tải dữ liệu bệnh nhân..." />
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="flex justify-center items-center h-[80vh] text-gray-600">
                Không có dữ liệu bệnh nhân để hiển thị.
            </div>
        );
    }

    const defaultValues: PatientRequest = {
        fullName: patient.fullName,
        dateOfBirth: patient.dateOfBirth.split("T")[0],
        gender: patient.gender,
        phone: patient.phone,
        address: {
            street: patient.address?.street || "",
            ward: patient.address?.ward || "",
            province: patient.address?.province || "",
        },
        idNumber: patient.idNumber,
        insuranceNumber: patient.insuranceNumber || "",
    };

    return (
        <PatientForm
            title="Cập nhật thông tin bệnh nhân"
            submitLabel="Cập nhật"
            onSubmit={handleUpdate}
            defaultValues={defaultValues}
        />
    );
};

export default EditPatientPage;
