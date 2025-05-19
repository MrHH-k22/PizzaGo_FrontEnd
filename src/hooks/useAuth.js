import { useState } from "react";
import Cookies from "js-cookie";

export function useAuth() {
  // Try to get user data from cookies
  const getUserFromCookies = () => {
    const userDataCookie = Cookies.get("userData");
    if (userDataCookie) {
      try {
        return JSON.parse(userDataCookie);
      } catch (error) {
        console.error("Error parsing user data cookie:", error);
      }
    }
    return null;
  };

  const [user, setUser] = useState(getUserFromCookies());

  // Function to handle logout
  const logout = () => {
    Cookies.remove("userData");
    setUser(null);
  };

  const clearUser = () => {
    Cookies.remove("userData");
    setUser(null);
  };

  return { user, setUser, clearUser, logout };
}
