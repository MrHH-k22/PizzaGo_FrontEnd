import { Outlet } from "react-router-dom";
import StaffHeader from "../components/StaffHeader"; // Adjust the import path as necessary
import Footer from "../components/Footer"; // Adjust the import path as necessary

function StaffLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] mx-auto">
      <StaffHeader />
      <div className="">
        <main className="mx-auto max-w-7xl">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default StaffLayout;
