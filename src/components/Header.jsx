import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import DropDownLink from "./DropDownLink";

const servicesAndProducts = [
  { name: "Order Tracking", link: "/" },
  { name: "Account", link: "/" },
  { name: "Sign out", link: "/" },
];

function Header() {
  const [tabOpen, setTabOpen] = useState(null);

  return (
    <header className="relative rounded-b-3xl mx-auto w-full max-w-screen-xl flex items-center justify-between px-12 py-14 bg-white shadow-sm h-24 ">
      {/* Delivery Address Section */}
      <div className="flex flex-col text-xl text-gray-700">
        <span className="">Hello, Nguyễn Mai Huy Hoàng</span>
      </div>

      {/* Logo Section */}
      <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
        <img
          src="/imgs/Logo.png"
          alt="Pizza Hut Logo"
          className="h-24 object-contain"
        />
      </Link>

      {/* Action Buttons Section */}
      <div className="flex items-center gap-6 text-xl">
        <button className="flex items-center justify-center gap-2 py-3 px-6 border-2 border-red-600 bg-red-600 text-white rounded-full text-base">
          <span className="font-semibold">1</span>
          <FaCartShopping size={18} />
        </button>

        {/* <FiMenu /> */}
        <DropDownLink
          title="DropdownMenu"
          items={servicesAndProducts}
          tabOpen={tabOpen}
          setTabOpen={setTabOpen}
          icon={<FiMenu />}
        />
      </div>
    </header>
  );
}

export default Header;
