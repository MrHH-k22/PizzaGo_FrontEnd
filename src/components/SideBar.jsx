import React from "react";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";
import { 
  Search, 
  Edit2, 
  Trash2, 
  Plus, 
  X, 
  User, 
  Mail, 
  MapPin, 
  AlertCircle,
  ChevronRight
} from "lucide-react";

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
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gradient-to-b from-red-600 to-red-700 shadow-xl"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col justify-between">
          <div className="px-4 py-5 overflow-y-auto">
            {/* Logo Section with enhanced styling */}
            <div className="flex justify-center mb-8">
              <div className="bg-white p-2 rounded-xl shadow-md">
                <img
                  src="/imgs/Logo.png"
                  alt="PizzaGo Logo"
                  className="h-24 object-contain"
                />
              </div>
            </div>
            
            {/* Divider */}
            <div className="border-t border-red-400/30 mb-6"></div>

            {/* Menu Items with enhanced styling */}
            <ul className="space-y-1.5 font-medium">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className={`flex items-center p-3 rounded-xl text-white hover:bg-red-500/40 transition-all duration-200 group relative ${
                      location.pathname === item.href 
                        ? "bg-white/20 shadow-sm backdrop-blur-sm font-semibold"
                        : "hover:translate-x-1"
                    }`}
                  >
                    {location.pathname === item.href && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-full"></span>
                    )}
                    <div className={`flex items-center justify-center w-7 h-7 shrink-0 rounded-lg ${location.pathname === item.href ? "bg-white/30" : "bg-white/10"}`}>
                      {item.icon && (
                        <svg
                          className="w-4 h-4 text-white transition duration-75"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox={item.icon.viewBox}
                        >
                          <path d={item.icon.path} />
                        </svg>
                      )}
                    </div>
                    
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {item.label}
                    </span>
                    
                    {item.badge && (
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 ms-2 text-xs font-semibold rounded-full ${item.badge.className || "bg-red-900 text-white"}`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                    
                    <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${location.pathname === item.href ? "opacity-100" : ""}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Footer */}
          <div className="mt-auto p-4 text-center text-white/70 border-t border-red-400/30 text-xs">
            <p>PizzaGo Staff Portal</p>
            <p className="mt-1">&copy; {new Date().getFullYear()} PizzaGo</p>
          </div>
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