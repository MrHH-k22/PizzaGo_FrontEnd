import { useState } from "react";
import Cookies from "js-cookie";
import { getUserInfo } from "../services/user.service";

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

  const updateUserInCookies = (user) => {
    if (user) {
      Cookies.set("userData", JSON.stringify(user), { expires: 7 });
    } else {
      Cookies.remove("userData");
    }
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

  const getUserFromDatabase = async (userId) => {
    try {
      const data = await getUserInfo(userId);
      setUser(data);
      updateUserInCookies(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return {
    user,
    setUser,
    clearUser,
    logout,
    updateUserInCookies,
    getUserFromDatabase,
  };
}
