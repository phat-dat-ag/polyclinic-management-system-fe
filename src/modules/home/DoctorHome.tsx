import { Button } from "../../components/ui/Button";
import { Card, CardTitle, CardContent, CardHeader } from "../../components/ui/Card";
import { CalendarDays, UserCog, ClipboardCheck } from "lucide-react";

export const DoctorHome = () => {
    return (
        <div className="py-10">
            <h1 className="text-3xl font-bold text-green-600 mb-6">
                Xin chào bác sĩ 👨‍⚕️
            </h1>

            <p className="text-gray-600 mb-10">
                Trang dành riêng cho bác sĩ. Quản lý lịch hẹn, lịch trực và cập nhật hồ sơ cá nhân của bạn tại đây.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserCog className="text-green-500" />
                            Cập nhật thông tin cá nhân
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500 mb-4">
                            Chỉnh sửa hồ sơ cá nhân, thông tin chuyên khoa và liên hệ.
                        </p>
                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                            Cập nhật
                        </Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardCheck className="text-green-500" />
                            Quản lý lịch hẹn
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500 mb-4">
                            Xem danh sách các cuộc hẹn đã đặt, xác nhận và quản lý bệnh nhân.
                        </p>
                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                            Xem lịch hẹn
                        </Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarDays className="text-green-500" />
                            Lịch trực
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500 mb-4">
                            Theo dõi lịch trực và ca làm việc của bạn trong tuần.
                        </p>
                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                            Xem lịch trực
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
