const AboutPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 text-gray-700">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">
                Giới thiệu về Polyclinic Management System
            </h1>

            <p className="mb-4 leading-relaxed">
                <strong>Polyclinic Management System</strong> là nền tảng công nghệ
                hỗ trợ quản lý và đặt lịch khám bệnh hiện đại, được phát triển nhằm
                giúp kết nối giữa bệnh nhân và đội ngũ bác sĩ một cách nhanh chóng,
                tiện lợi và chính xác. Với sứ mệnh nâng cao chất lượng chăm sóc sức khỏe
                và tối ưu quy trình khám chữa bệnh, hệ thống mang đến trải nghiệm
                liền mạch cho cả bệnh nhân lẫn nhân viên y tế.
            </p>

            <p className="mb-4 leading-relaxed">
                Được thành lập tại <strong>Ninh Kiều, Cần Thơ</strong>, Polyclinic
                không chỉ tập trung vào công nghệ, mà còn đặt con người vào trung tâm —
                nơi mọi bệnh nhân đều được chăm sóc tận tình và chu đáo. Chúng tôi tự
                hào là cầu nối giữa y học hiện đại và sự tiện lợi của thời đại số.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3 text-blue-500">
                Tầm nhìn & Sứ mệnh
            </h2>
            <ul className="list-disc list-inside space-y-2">
                <li>
                    Mang đến giải pháp y tế thông minh giúp người dân tiếp cận dịch vụ
                    chăm sóc sức khỏe dễ dàng hơn.
                </li>
                <li>
                    Hỗ trợ đội ngũ y bác sĩ, điều dưỡng, nhân viên y tế trong việc quản lý
                    thông tin và lịch làm việc hiệu quả.
                </li>
                <li>
                    Xây dựng cộng đồng y tế thân thiện, hiện đại và đáng tin cậy tại khu
                    vực Đồng bằng sông Cửu Long.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3 text-blue-500">
                Giá trị cốt lõi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {[
                    { title: "Tận tâm", desc: "Luôn đặt sức khỏe của bệnh nhân lên hàng đầu." },
                    { title: "Chuyên nghiệp", desc: "Đội ngũ bác sĩ và nhân viên được đào tạo bài bản." },
                    { title: "Hiện đại", desc: "Ứng dụng công nghệ vào mọi quy trình y tế." },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition-all"
                    >
                        <h3 className="font-semibold text-lg text-blue-600 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutPage;
