const services = [
    {
        name: "Hẹn Bác Sĩ, Điều Dưỡng Đến Nhà",
        desc: "Đặt lịch hẹn bác sĩ hoặc điều dưỡng đến tận nhà để khám và tư vấn điều trị, nhanh chóng và an toàn.",
    },
    {
        name: "Nhà Thuốc Trực Tuyến",
        desc: "Cung cấp các loại thuốc chính hãng, hỗ trợ đặt mua và giao tận nơi chỉ trong vài giờ.",
    },
    {
        name: "Gói Chăm Sóc Sức Khỏe",
        desc: "Tham gia chương trình Jio Prime để nhận nhiều ưu đãi trong khám chữa bệnh và mua thuốc.",
    },
    {
        name: "Khám Sức Khỏe Tổng Quát",
        desc: "Dịch vụ khám tổng quát giúp phát hiện sớm các bệnh lý và theo dõi sức khỏe định kỳ.",
    },
];

const ServicesPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">
                Dịch vụ tại Polyclinic Management System
            </h1>

            <p className="text-gray-700 mb-8 leading-relaxed">
                Chúng tôi mang đến các dịch vụ y tế toàn diện, hiện đại, giúp bạn và gia đình
                chăm sóc sức khỏe một cách chủ động và thuận tiện nhất.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service) => (
                    <div
                        key={service.name}
                        className="bg-white rounded-xl shadow-md border hover:shadow-lg p-5 transition-all"
                    >
                        <h3 className="font-semibold text-lg text-blue-600 mb-2">
                            {service.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{service.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;
