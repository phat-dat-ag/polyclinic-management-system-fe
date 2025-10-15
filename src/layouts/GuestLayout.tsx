import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import GuestHeader from "../components/GuestHeader";

const GuestLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <GuestHeader />

            <main className="w-[80%] mx-auto">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default GuestLayout;
