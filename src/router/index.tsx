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
                element={
                    <ProtectedRoute allowedRoles={["user"]}>
                        <UserLayout />
                    </ProtectedRoute>
                }
            >
            </Route>

            <Route
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >

            </Route>

            <Route
                element={
                    <ProtectedRoute allowedRoles={["doctor"]}>
                        <DoctorLayout />
                    </ProtectedRoute>
                }
            >

            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;
