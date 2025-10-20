import { Button } from "../../components/ui/Button";
import { Card, CardTitle, CardContent, CardHeader } from "../../components/ui/Card";
import { Calendar, User, ClipboardList } from "lucide-react";

export const UserHome = () => {
    return (
        <div className="py-10">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">
                Chào quý khách đến với hệ thống đặt lịch khám bệnh 👋
            </h1>

            <p className="text-gray-600 mb-10">
                Tại đây bạn có thể quản lý thông tin cá nhân, đăng ký lịch khám và xem các dịch vụ dành cho bạn.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="text-blue-500" />
                            Cập nhật thông tin
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500 mb-4">
                            Xem và chỉnh sửa thông tin tài khoản của bạn.
                        </p>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            Cập nhật
                        </Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="text-blue-500" />
                            Đăng ký khám
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500 mb-4">
                            Đặt lịch khám nhanh chóng, tiện lợi, hiện đại.
                        </p>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            Đăng ký
                        </Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardList className="text-blue-500" />
                            Lịch sử đăng ký
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500 mb-4">
                            Xem lại các lịch hẹn và kết quả khám trước đây.
                        </p>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            Xem lịch sử
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
