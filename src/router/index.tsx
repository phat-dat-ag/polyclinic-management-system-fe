import { Routes, Route, Navigate } from "react-router-dom";

import GuestLayout from "../layouts/GuestLayout";
import ProtectedRoute from "./ProtectedRoute";
import UserLayout from "../layouts/UserLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../modules/information/HomePage";
import AboutPage from "../modules/information/AboutPage";
import ServicesPage from "../modules/information/ServicePage";
import LoginPage from "../modules/auth/LoginPage";
import RegisterPage from "../modules/auth/RegisterPage";
import { UserHome } from "../modules/home/UserHome";
import { DoctorHome } from "../modules/home/DoctorHome";
import DoctorAppointment from "../modules/appointment/DoctorAppointment";
import UserAppointment from "../modules/appointment/UserAppointment";
import DoctorSchedule from "../modules/schedule/DoctorSchedule";
import UserProfile from "../modules/profile/UserProfile";
import { AdminHome } from "../modules/home/AdminHome";
import PatientManagementPage from "../modules/patient/PatientManagementPage";
import AddPatientPage from "../modules/patient/AddPatientPage";
import EditPatientPage from "../modules/patient/EditPatientPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<GuestLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route
                path="/user"
                element={
                    <ProtectedRoute allowedRoles={["user"]}>
                        <UserLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<UserHome />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="appointment" element={<UserAppointment />} />
                <Route path="profile" element={<UserProfile />} />
            </Route>

            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdminHome />} />

            </Route>

            <Route
                path="/doctor"
                element={
                    <ProtectedRoute allowedRoles={["doctor"]}>
                        <DoctorLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DoctorHome />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="patient-management" element={<PatientManagementPage />} />
                <Route path="patient-management/add" element={<AddPatientPage />} />
                <Route path="patient-management/edit/:id" element={<EditPatientPage />} />
                <Route path="appointment" element={<DoctorAppointment />} />
                <Route path="schedule" element={<DoctorSchedule />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;
