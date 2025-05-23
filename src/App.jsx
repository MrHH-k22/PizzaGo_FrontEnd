import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./features/Homepage";
import LogIn from "./features/LogIn/Login";
import SignUp from "./features/SignUp/Signup";
import Cart from "./features/Cart/Cart";
import TrackOrder from "./features/TrackOrder/TrackOrder";
import Account from "./features/Account/Account";
import StaffLayout from "./layouts/StaffLayout";
import UpdateOrderStatus from "./features/staff/UpdateOrderStatus/UpdateOrderStatus";
import Checkout from "./features/Checkout/Checkout";
import Logout from "./features/LogOut/Logout";
import ManageUsers from "./features/Manager/ManageAccounts/ManageUsers";
import ManageStaffs from "./features/Manager/ManageAccounts/ManageStaffs";
const staffMenuItems = [
  {
    href: "/staff/updateorderstatus",
    label: "Update Order Status",
    icon: {
      viewBox: "0 0 22 21",
      path: "M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z",
    },
  },
  {
    href: "/",
    label: "Log Out",
    icon: {
      viewBox: "0 0 18 18",
      path: "M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Z",
    },
  },
];

const managerMenuItems = [
  {
    href: "/manager/manageusers",
    label: "Manage Users",
    icon: {
      viewBox: "0 0 22 21",
      path: "M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z",
    },
  },
  {
    href: "/manager/managestaffs",
    label: "Manage Staffs",
    icon: {
      viewBox: "0 0 22 21",
      path: "M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z",
    },
  },
  {
    href: "/manager/managefoodmenu",
    label: "Manage Food Menu",
    icon: {
      viewBox: "0 0 18 18",
      path: "M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Z",
    },
  },
  {
    href: "/",
    label: "Log Out",
    icon: {
      viewBox: "0 0 18 18",
      path: "M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Z",
    },
  },
];

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },

      {
        path: "/logout",
        element: <Logout />,
      },

      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    path: "/customer",
    element: <ProtectedRoute requiredRole="Customer" />,
    children: [
      {
        path: "",
        element: <AppLayout />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
          {
            path: "trackorder",
            element: <TrackOrder />,
          },
          {},
        ],
      },
    ],
  },

  {
    path: "/staff",
    element: <ProtectedRoute requiredRole="Staff" />,
    children: [
      {
        path: "",
        element: <StaffLayout menuItems={staffMenuItems} />,
        children: [
          {
            path: "updateorderstatus",
            element: <UpdateOrderStatus />,
          },
        ],
      },
    ],
  },
  {
    path: "/manager",
    element: <ProtectedRoute requiredRole="Manager" />,
    children: [
      {
        path: "",
        element: <StaffLayout menuItems={managerMenuItems} />,
        children: [
          {
            path: "manageusers",
            element: <ManageUsers />,
          },
          {
            path: "managestaffs",
            element: <ManageStaffs />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
