const HomePage = () => {
    return (
        <div className="max-w-6xl mx-auto py-16 px-6 text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">
                Chào mừng đến với Polyclinic
            </h1>
            <p className="text-gray-700 text-lg mb-8">
                Nền tảng chăm sóc sức khỏe thông minh — Đặt lịch khám, tư vấn và mua thuốc ngay hôm nay.
            </p>
            <a
                href="/login"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Đăng nhập để bắt đầu
            </a>
        </div>
    );
};

export default HomePage;
