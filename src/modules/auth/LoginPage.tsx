import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spin, message } from "antd";
import { login } from "../../services/auth.service";
import type { AxiosError } from "axios";
import type { LoginResponse } from "../../types/auth.types";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      const response = await login(data);
      const dataResponse: LoginResponse = response.data;

      localStorage.setItem("token", dataResponse.token);
      localStorage.setItem("user", JSON.stringify(dataResponse.user));

      switch (dataResponse.user.role) {
        case "admin":
          navigate("/admin", { replace: true });
          break;
        case "doctor":
          navigate("/doctor", { replace: true });
          break;
        default:
          navigate("/user", { replace: true });
          break;
      }

    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      message.error(error.response?.data.message || "Đã có lỗi khi đăng nhập, hãy thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/60 z-50">
          <Spin size="large" tip="Đang xử lý..." />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md border"
      >
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Đăng nhập hệ thống
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên đăng nhập
          </label>
          <input
            type="text"
            {...register("username", { required: "Vui lòng nhập tên đăng nhập" })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Nhập tên đăng nhập"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu",
              minLength: { value: 6, message: "Mật khẩu ít nhất 6 ký tự" },
            })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Nhập mật khẩu"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
