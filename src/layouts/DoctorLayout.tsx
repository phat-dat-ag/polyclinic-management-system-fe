import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const DoctorLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="w-[80%] mx-auto">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default DoctorLayout;
