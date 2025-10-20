import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Users, CalendarDays, Activity, Settings } from "lucide-react";

export const AdminHome = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-blue-700">Chào mừng Quản trị viên 👋</h1>
            <p className="text-gray-600 mb-8">
                Đây là bảng điều khiển tổng quan giúp bạn quản lý người dùng, bác sĩ, lịch khám và cài đặt hệ thống.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-blue-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-600">
                            <Users size={20} /> Người dùng
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold text-blue-800">1,245</p>
                        <p className="text-sm text-gray-500">Tổng số người dùng</p>
                    </CardContent>
                </Card>

                <Card className="bg-green-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                            <CalendarDays size={20} /> Lịch khám
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold text-green-800">356</p>
                        <p className="text-sm text-gray-500">Lịch khám đang hoạt động</p>
                    </CardContent>
                </Card>

                <Card className="bg-yellow-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-600">
                            <Activity size={20} /> Hoạt động
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold text-yellow-800">87%</p>
                        <p className="text-sm text-gray-500">Tỷ lệ hoạt động hệ thống</p>
                    </CardContent>
                </Card>

                <Card className="bg-red-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600">
                            <Settings size={20} /> Cấu hình
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold text-red-800">12</p>
                        <p className="text-sm text-gray-500">Tùy chọn hệ thống</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="text-green-600" />
                        Hoạt động gần đây
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="text-gray-600 list-disc list-inside space-y-2">
                        <li>Bác sĩ <b>Nguyễn Văn A</b> đã thêm lịch khám mới lúc 9:00.</li>
                        <li>Người dùng <b>Trần Thị B</b> đặt lịch ngày 22/10.</li>
                        <li>Admin cập nhật chính sách khám bệnh.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};
