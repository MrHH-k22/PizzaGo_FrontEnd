import React, { createContext, useContext, useState, useEffect } from "react";
import { refreshToken } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check authentication status on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
          // Verify token and get user data
          // You'll need an API endpoint for this
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Set up token refresh
  useEffect(() => {
    if (!isAuthenticated) return;

    // Refresh token every 14 minutes (assuming 15-minute token lifetime)
    const refreshInterval = setInterval(
      async () => {
        try {
          const newTokens = await refreshToken();
          if (newTokens?.accessToken) {
            sessionStorage.setItem("accessToken", newTokens.accessToken);
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          setIsAuthenticated(false);
        }
      },
      14 * 60 * 1000
    );

    return () => clearInterval(refreshInterval);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, user, setIsAuthenticated, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
