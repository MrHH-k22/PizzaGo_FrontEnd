import BackToTopButton from "./BackToTopButton";

function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-center">
            <div className="flex justify-center mb-4">
              <img
                src="/imgs/Logo.png"
                alt="Pizza GO"
                className="h-50 object-contain"
              />
            </div>
          </div>
          {/* About Us Section */}
          <div className="text-center md:text-left px-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              About us
            </h3>
            <div className="text-gray-600">
              At Pizza GO, we're passionate about delivering delicious, freshly
              made pizzas right to your doorstep. Enjoy quick, easy, and
              reliable online ordering with us today!
            </div>
          </div>
          {/* Team Members Section */}
          <div className="text-center md:text-left px-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Thành viên nhóm
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Nguyễn Mai Huy Hoàng</li>
              <li>Nguyễn Nhật An</li>
              <li>Trần Trung Tín</li>
              <li>Mai Trọng Vũ</li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Pizza GO. Tất cả quyền được bảo
            lưu.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTopButton />
    </footer>
  );
}

export default Footer;
