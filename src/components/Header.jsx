import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import DropDownLink from "./DropDownLink";
import { useAuth } from "../hooks/useAuth";
import useGetCart from "../hooks/useGetCart";

function Header() {
  const [tabOpen, setTabOpen] = useState(null);

  const { user } = useAuth();

  // Dynamic menu items based on authentication status
  const getMenuItems = () => {
    // Base menu items for guests
    if (!user) {
      return [
        { name: "Log in", link: "/login" },
        { name: "Sign up", link: "/signup" },
        { name: "hr", link: "/" },
        { name: "Order Tracking", link: "/" },
      ];
    }

    // Role-specific menu configurations
    const menuByRole = {
      Manager: [
        { name: "Account", link: "/account" },
        { name: "Manager Dashboard", link: "/manager/manageusers" },
      ],
      Staff: [
        { name: "Account", link: "/account" },
        { name: "Staff Manager", link: "/staff/updateorderstatus" },
      ],
      Customer: [
        { name: "Account", link: "/account" },
        { name: "Order Tracking", link: "/customer/trackorder" },
      ],
    };

    // Get menu items for current role (default to Customer if role doesn't match)
    const roleSpecificItems = menuByRole[user.role] || menuByRole.Customer;

    // Add common items for all logged-in users
    return [
      ...roleSpecificItems,
      { name: "hr", link: "/" },
      { name: "Sign out", link: "/logout" },
    ];
  };

  return (
    <header className="relative rounded-b-3xl mx-auto w-full max-w-screen-xl flex items-center justify-between px-12 py-14 bg-white shadow-sm h-24 ">
      {/* Name Section */}
      <div className="flex flex-col text-xl text-gray-700">
        <span className="">
          {user ? `Hello, ${user.name}` : "Hello, Guest"}
        </span>
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
        <Link
          to="/customer/cart"
          className="flex items-center justify-center gap-2 py-3 px-7 border-2 border-red-600 bg-red-600 text-white rounded-full text-base hover:bg-white hover:text-red-600 transition duration-300 ease-in-out"
        >
          <FaCartShopping size={20} />
        </Link>

        <DropDownLink
          title="DropdownMenu"
          items={getMenuItems()}
          tabOpen={tabOpen}
          setTabOpen={setTabOpen}
          icon={<FiMenu size={20} />}
        />
      </div>
    </header>
  );
}

export default Header;
