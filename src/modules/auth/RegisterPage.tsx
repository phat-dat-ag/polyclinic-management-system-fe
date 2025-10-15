import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ tên";
        if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email không hợp lệ";

        if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
        else if (!/^[0-9]{9,11}$/.test(formData.phone))
            newErrors.phone = "Số điện thoại không hợp lệ";

        if (!formData.password.trim()) newErrors.password = "Vui lòng nhập mật khẩu";
        else if (formData.password.length < 6)
            newErrors.password = "Mật khẩu tối thiểu 6 ký tự";

        if (formData.confirmPassword !== formData.password)
            newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("Đăng ký thành công", formData);
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
                <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
                    Đăng ký tài khoản
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Họ và tên</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Đăng ký
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Đã có tài khoản?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Đăng nhập
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
