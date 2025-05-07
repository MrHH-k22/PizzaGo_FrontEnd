import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Homepage from "./features/Homepage";
import LogIn from "./features/LogIn/Login";
import SignUp from "./features/SignUp/Signup";
import Cart from "./features/Cart/Cart";

import StaffLayout from "./layouts/StaffLayout";

import UpdateOrderStatus from "./features/staff/UpdateOrderStatus/UpdateOrderStatus";
import Checkout from "./features/Checkout/Checkout";

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
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/staff",
    element: <StaffLayout />,
    children: [
      {
        path: "updateorderstatus",
        element: <UpdateOrderStatus />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
