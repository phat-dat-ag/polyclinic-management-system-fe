import type { FC } from "react";

const Footer: FC = () => {
    return (
        <footer className="bg-[#0f172a] text-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                <div>
                    <h3 className="text-lg font-semibold text-teal-400 mb-4">
                        Liên hệ
                    </h3>
                    <p className="text-sm mb-2">Hotline: 1900 999 999</p>
                    <p className="text-sm mb-4">Hỗ trợ: support@polyclinic.com</p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                        Copyright © 2017–Polyclinic Management System.
                        <br />
                        All rights reserved.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-teal-400 mb-4">
                        Dịch vụ
                    </h3>
                    <div className="text-sm space-y-2">
                        <p>Hẹn Bác Sĩ, Điều Dưỡng Đến Nhà</p>
                        <p>Nhà Thuốc Trực Tuyến</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-teal-400 mb-4">
                        Tìm Hiểu Thêm
                    </h3>
                    <div className="text-sm space-y-2">
                        <p>Đội Ngũ Bác Sĩ</p>
                        <p>Dịch Vụ Thăm Khám</p>
                        <p>Dành cho báo chí</p>
                        <p>Vị Trí Tuyển Dụng</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-teal-400 mb-4">
                        Hỗ Trợ Khách Hàng
                    </h3>
                    <div className="text-sm space-y-2">
                        <p>Câu Hỏi Thường Gặp</p>
                        <p>Chính Sách Bảo Mật</p>
                        <p>Chính Sách Hoạt Động</p>
                        <p>Chính sách giải quyết khiếu nại</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
                2025 Polyclinic Management System — Nền tảng chăm sóc sức khỏe toàn diện.
            </div>
        </footer>
    );
};

export default Footer;
