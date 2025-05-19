import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { verifyAccess } from "../services/authService";
import { useAuth } from "../hooks/useAuth"; // Changed from "../contexts/AuthContext"
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ requiredRole }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Only verify if we have a user or this is initial load
    if (!isVerified) {
      const checkAccess = async () => {
        try {
          setIsLoading(true);
          const result = await verifyAccess(requiredRole);
          setIsVerified(result.hasAccess);
        } catch (error) {
          console.error("Access verification failed:", error);
          setIsVerified(false);
        } finally {
          setIsLoading(false);
        }
      };

      checkAccess();
    }
  }, [requiredRole]);

  if (isLoading) {
    return <LoadingSpinner message="Verifying access..." />;
  }

  if (!isVerified) {
    toast.error("Access denied. You do not have the required role.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
