import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useLogOut from "../../hooks/useLogOut";

function Logout() {
  const { logOutUser } = useLogOut();

  useEffect(() => {
    logOutUser();
  }, [logOutUser]);

  // Redirect to home page immediately
  return <Navigate to="/" replace />;
}

export default Logout;
