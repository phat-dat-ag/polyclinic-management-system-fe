import { Link, useLocation } from "react-router-dom";

const GuestHeader = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Trang Chủ" },
    { path: "/about", label: "Giới Thiệu" },
    { path: "/services", label: "Dịch Vụ" },
    { path: "/user/appointment", label: "Đăng Ký Khám" },
    { path: "/login", label: "Đăng Nhập" },
    { path: "/register", label: "Đăng Ký" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Polyclinic
        </Link>

        <nav className="space-x-6 text-sm font-medium text-gray-700">
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
        </nav>
      </div>
    </header>
  );
};

export default GuestHeader;
