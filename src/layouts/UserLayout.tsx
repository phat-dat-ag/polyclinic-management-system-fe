import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import UserHeader from "../components/UserHeader";

const UserLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <UserHeader />
            <main className="w-[80%] my-4 mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default UserLayout;
