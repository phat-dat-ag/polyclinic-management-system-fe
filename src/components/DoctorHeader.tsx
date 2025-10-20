import { Link, useLocation, useNavigate } from "react-router-dom";

const DoctorHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login", { replace: true });
    };

    const navItems = [
        { path: "/doctor", label: "Trang Chủ" },
        { path: "/doctor/about", label: "Giới Thiệu" },
        { path: "/doctor/services", label: "Dịch Vụ" },
        { path: "/doctor/appointment", label: "Xem lịch hẹn" },
        { path: "/doctor/schedule", label: "Xem lịch trực" },
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link
                    to="/doctor"
                    className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                    Polyclinic
                </Link>

                <nav className="space-x-6 text-sm font-medium text-gray-700 flex items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`transition-colors ${location.pathname === item.path
                                ? "text-blue-600 font-semibold"
                                : "hover:text-blue-600"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <span className="text-gray-600 ml-4 border-l pl-4">
                        Xin chào, <span className="font-semibold text-blue-600">Bác sĩ</span>
                    </span>

                    <button
                        onClick={handleLogout}
                        className="ml-6 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
                    >
                        Đăng Xuất
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default DoctorHeader;
