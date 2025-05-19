import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { verifyAccess } from "../services/authService";
import { useAuth } from "../hooks/useAuth"; // Changed from "../contexts/AuthContext"
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ requiredRole }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, clearUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Only verify if we have a user or this is initial load
    if (!isVerified) {
      const checkAccess = async () => {
        try {
          setIsLoading(true);
          const result = await verifyAccess(requiredRole);
          setIsVerified(result.hasAccess);
          if (!result.hasAccess) {
            clearUser(); // Clear user data if not authorized
          }
        } catch (error) {
          console.error("Access verification failed:", error);
          setIsVerified(false);
          clearUser(); // Clear user data on error
        } finally {
          setIsLoading(false);
        }
      };

      checkAccess();
    }
  }, [requiredRole, clearUser]);

  if (isLoading) {
    return <LoadingSpinner message="Verifying access..." />;
  }

  return isVerified ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
