import { message } from "antd";
import { useNavigate } from "react-router-dom";
import type { PatientRequest } from "../../types/patient.types";
import { createPatient } from "../../services/patient.service";
import PatientForm from "./components/PatientForm";

const AddPatientPage = () => {
    const navigate = useNavigate();
    const handleAddPatient = async (data: PatientRequest) => {
        await createPatient(data);
        message.success("Đã thêm bệnh nhân thành công!");
        navigate("/doctor/patient-management");
    };

    return (
        <PatientForm title="Thêm bệnh nhân mới" submitLabel="Lưu bệnh nhân" onSubmit={handleAddPatient} />
    );
};

export default AddPatientPage;
