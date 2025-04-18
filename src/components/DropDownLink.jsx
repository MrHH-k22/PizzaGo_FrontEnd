import React, { useRef } from "react";
import { Link } from "react-router";

function DropDownLink({ title, items, tabOpen, setTabOpen, icon = null }) {
  const timeoutRef = useRef(null);

  // Hover vào: mở dropdown và hủy timeout
  function handleMouseEnter() {
    clearTimeout(timeoutRef.current);
    setTabOpen(title);
  }

  // Hover ra: lên lịch đóng dropdown sau 2s
  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setTabOpen(null);
    }, 500);
  }

  function handleLinkClick() {
    setTabOpen(null);
  }

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Nút chính giống trong hình */}
      <div
        className={`flex items-center justify-center gap-2 py-3 px-7 border-2 border-gray-500 rounded-full cursor-pointer transition-all duration-200
          ${tabOpen === title ? "text-red-600 border-red-600" : "bg-white"}
        `}
      >
        {icon ? icon : title}
      </div>

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-200 origin-top-right
          ${
            tabOpen === title
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            onClick={handleLinkClick}
            className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-100"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DropDownLink;
