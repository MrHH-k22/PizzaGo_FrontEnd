import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import SideBar from "../components/SideBar";

function StaffLayout({ menuItems }) {
  return (
    <div className="grid h-screen grid-cols-[250px_1fr] mx-auto">
      <SideBar menuItems={menuItems} className="h-full" />
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <main className="mx-auto w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

StaffLayout.propTypes = {
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
};

export default StaffLayout;
