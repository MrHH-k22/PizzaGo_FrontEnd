import { useState } from "react";

function DeliveryInfo() {
  const [note, setNote] = useState("");
  const [timeOption, setTimeOption] = useState("Ngay lập tức");
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  const timeOptions = ["Ngay lập tức", "Hôm nay", "Ngày mai", "Tùy chỉnh"];

  return (
    <div className="px-8 py-6 md-min-h-fit bg-white md:border border-gray-300 rounded-2xl mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Giao đến</h2>
      </div>

      <div className="mb-4">
        <p className="text-gray-800 mb-1">
          30 Đường 16, Khu phố 5, Thủ Đức, Hồ Chí Minh, Việt Nam
        </p>
        <p className="text-sm text-gray-500">Ghi chú</p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Ghi chú cho giao hàng, ví dụ: tầng, phòng..."
          className="w-full p-3 border border-gray-300 rounded-md text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-2">Thời gian nhận</p>
        <div className="relative">
          <button
            className="w-full p-3 border border-gray-300 rounded-md text-left text-gray-800 flex justify-between items-center"
            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
          >
            <span>{timeOption}</span>
            {/* <ChevronRight
              className={`transform transition-transform duration-200 ${isTimeDropdownOpen ? "rotate-90" : ""}`}
            /> */}
          </button>

          {isTimeDropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {timeOptions.map((option) => (
                <div
                  key={option}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setTimeOption(option);
                    setIsTimeDropdownOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeliveryInfo;
