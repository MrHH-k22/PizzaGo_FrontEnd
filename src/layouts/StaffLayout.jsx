import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import SideBar from "../components/SideBar";

function StaffLayout({ menuItems }) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] mx-auto">
      <img
        src="/imgs/Logo.png"
        alt="Pizza Go Logo"
        className="h-24 object-contain"
      />
      <SideBar menuItems={menuItems}>
        <div className="flex-1">
          <main className="mx-auto max-w-7xl">
            <Outlet />
          </main>
        </div>
      </SideBar>
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
