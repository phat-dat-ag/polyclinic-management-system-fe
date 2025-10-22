import { useForm, type SubmitHandler } from "react-hook-form";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { AxiosError } from "axios";
import type { PatientRequest } from "../../../types/patient.types";

interface PatientFormProps {
    onSubmit: (data: PatientRequest) => Promise<void>;
    defaultValues?: PatientRequest;
    showCancelButton?: boolean;
    title?: string;
    submitLabel?: string;
}

const PatientForm = ({
    onSubmit,
    defaultValues,
    showCancelButton = true,
    title = "Thông tin bệnh nhân",
    submitLabel = "Lưu bệnh nhân",
}: PatientFormProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PatientRequest>({
        defaultValues: defaultValues || {
            fullName: "",
            dateOfBirth: "",
            gender: "male",
            phone: "",
            address: { street: "", ward: "", province: "" },
            idNumber: "",
            insuranceNumber: "",
        },
    });

    const handleFormSubmit: SubmitHandler<PatientRequest> = async (data) => {
        try {
            setLoading(true);
            await onSubmit(data);
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            message.error(error.response?.data?.message || "Đã xảy ra lỗi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg">
            {title && (
                <h2 className="text-2xl font-bold text-blue-700 mb-6">{title}</h2>
            )}

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Họ và tên *</label>
                    <input
                        {...register("fullName", {
                            required: "Vui lòng nhập họ tên",
                            pattern: {
                                value: /^[A-Za-zÀ-ỹ\s]+$/,
                                message: "Họ tên chỉ được chứa chữ cái và khoảng trắng",
                            },
                            minLength: { value: 3, message: "Tên quá ngắn" },
                            maxLength: { value: 50, message: "Tên quá dài" },
                        })}
                        className="border rounded-lg px-3 py-2 w-full"
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Ngày sinh *</label>
                        <input
                            type="date"
                            {...register("dateOfBirth", {
                                required: "Vui lòng chọn ngày sinh",
                                validate: (value) =>
                                    new Date(value) < new Date() ||
                                    "Ngày sinh không hợp lệ",
                            })}
                            className="border rounded-lg px-3 py-2 w-full"
                        />
                        {errors.dateOfBirth && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.dateOfBirth.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Giới tính *</label>
                        <select
                            {...register("gender", {
                                required: "Vui lòng chọn giới tính",
                            })}
                            className="border rounded-lg px-3 py-2 w-full"
                        >
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                        {errors.gender && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.gender.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1">Số điện thoại *</label>
                    <input
                        {...register("phone", {
                            required: "Vui lòng nhập số điện thoại",
                            pattern: {
                                value: /^(?:\+84|0)[0-9]{9,10}$/,
                                message: "Số điện thoại không hợp lệ",
                            },
                        })}
                        className="border rounded-lg px-3 py-2 w-full"
                        placeholder="+84987654321 hoặc 0987654321"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block font-medium mb-2">Địa chỉ</label>
                    <div className="grid grid-cols-3 gap-3">
                        <input
                            placeholder="Số nhà / Đường"
                            {...register("address.street")}
                            className="border rounded-lg px-3 py-2 w-full"
                        />
                        <input
                            placeholder="Phường / Xã"
                            {...register("address.ward")}
                            className="border rounded-lg px-3 py-2 w-full"
                        />
                        <input
                            placeholder="Tỉnh / Thành phố"
                            {...register("address.province")}
                            className="border rounded-lg px-3 py-2 w-full"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">CCCD *</label>
                        <input
                            {...register("idNumber", {
                                required: "Vui lòng nhập CCCD",
                                pattern: {
                                    value: /^[0-9]{9,12}$/,
                                    message: "CCCD phải từ 9 đến 12 chữ số",
                                },
                            })}
                            className="border rounded-lg px-3 py-2 w-full"
                            placeholder="0123456789"
                        />
                        {errors.idNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.idNumber.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Số BHYT</label>
                        <input
                            {...register("insuranceNumber", {
                                pattern: {
                                    value: /^[A-Za-z0-9]{5,15}$/,
                                    message: "BHYT chỉ chứa chữ và số (5–15 ký tự)",
                                },
                            })}
                            className="border rounded-lg px-3 py-2 w-full"
                            placeholder="BH123456789"
                        />
                        {errors.insuranceNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.insuranceNumber.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    {showCancelButton && (
                        <button
                            type="button"
                            onClick={() => navigate("/doctor/patient-management")}
                            className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
                        >
                            Hủy
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        {loading ? "Đang lưu..." : submitLabel}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;
