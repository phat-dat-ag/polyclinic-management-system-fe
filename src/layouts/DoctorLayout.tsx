import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import DoctorHeader from "../components/DoctorHeader";

const DoctorLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <DoctorHeader />
            <main className="w-[80%] my-4 mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default DoctorLayout;
