import { Bell, User, LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AdminHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login", { replace: true });
    };

    return (
        <header className="flex items-center justify-between bg-white px-6 py-3 shadow-sm border-b">
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-blue-700">Bảng điều khiển</h1>
            </div>

            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-80">
                <Search size={18} className="text-gray-500" />
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="bg-transparent outline-none px-2 w-full text-sm text-gray-700"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="relative hover:text-blue-600">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="hover:text-blue-600 flex items-center gap-2">
                    <User size={20} />
                    <span>Admin</span>
                </button>
                <button className="hover:text-red-600 flex items-center gap-2" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </header>
    );
};
