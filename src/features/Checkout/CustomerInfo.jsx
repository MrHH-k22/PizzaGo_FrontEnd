import { useState } from "react";

function CustomerInfo() {
  const [customerName, setCustomerName] = useState("MrHH");
  const [phoneNumber, setPhoneNumber] = useState("84338866561");
  const [email, setEmail] = useState("nguyenmaihuyhoang156@gmail.com");

  return (
    <div className="px-8 py-6 md-min-h-fit bg-white md:border border-gray-300 md:rounded-2xl">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5">Người đặt hàng</h2>

        <div className="mb-4">
          <label
            htmlFor="customerName"
            className="block text-sm text-gray-700 mb-1"
          >
            Họ và tên
          </label>
          <input
            id="customerName"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm text-gray-700 mb-1"
          >
            Số điện thoại
          </label>
          <input
            id="phoneNumber"
            type="tel"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="mb-1">
          <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
