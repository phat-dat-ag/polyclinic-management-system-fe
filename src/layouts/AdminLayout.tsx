import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { AdminHeader } from "../components/AdminHeader";

const AdminLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminHeader />
            <main className="w-[80%] my-4 mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default AdminLayout;
