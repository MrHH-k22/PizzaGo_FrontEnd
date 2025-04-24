import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function StaffHeader() {
  return (
    <header className="relative rounded-b-3xl mx-auto w-full max-w-screen-xl flex items-center justify-between px-12 py-14 bg-white shadow-sm h-24">
      {/* Staff Title */}
      <div className="flex flex-col text-xl text-gray-700">
        <span className="font-semibold">Staff Dashboard</span>
      </div>

      {/* Logo Section */}
      <Link
        to="/staff"
        className="absolute left-1/2 transform -translate-x-1/2"
      >
        <img
          src="/imgs/Logo.png"
          alt="Pizza Go Logo"
          className="h-24 object-contain"
        />
      </Link>

      {/* Logout Button */}
      <div className="flex items-center gap-6 text-xl">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 py-3 px-6 border-2 border-red-600 bg-red-600 text-white rounded-full text-base hover:bg-white hover:text-red-600 transition duration-300 ease-in-out"
        >
          <span className="font-semibold">Logout</span>
          <FiLogOut size={18} />
        </Link>
      </div>
    </header>
  );
}

export default StaffHeader;
