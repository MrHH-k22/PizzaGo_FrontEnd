import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function SideBar({ menuItems, children }) {
  const location = useLocation();

  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-red-600"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Logo Section */}
          <div className="flex justify-center mb-6">
            <img
              src="/imgs/Logo.png"
              alt="PizzaGo Logo"
              className="h-32 object-contain"
            />
          </div>

          {/* Menu Items */}
          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`flex items-center p-2 rounded-lg text-white hover:bg-red-700 transition ${
                    location.pathname === item.href ? "bg-red-800" : ""
                  }`}
                >
                  {item.icon && (
                    <svg
                      className="shrink-0 w-5 h-5 text-white transition duration-75"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox={item.icon.viewBox}
                    >
                      <path d={item.icon.path} />
                    </svg>
                  )}
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium ${item.badge.className}`}
                    >
                      {item.badge.text}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="p-4 rounded-lg">{children}</div>
    </div>
  );
}

SideBar.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.shape({
        viewBox: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      }),
      badge: PropTypes.shape({
        text: PropTypes.string,
        className: PropTypes.string,
      }),
    })
  ).isRequired,
  children: PropTypes.node,
};

export default SideBar;
