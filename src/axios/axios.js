import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

// Create axios instance with default config
const axiosAuth = axios.create({
  withCredentials: true, // For cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshAccessTokenFn = async () => {
  const response = await axiosAuth.post(`${API_URL}/auth/refreshToken`);
  return response.data;
};

// For navigating to sign-in page when unauthorized
let navigate = null;

// Function to set the navigate function from your component
export const setAuthNavigate = (navigateFunction) => {
  navigate = navigateFunction;
};

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check for 403 Forbidden status code
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token
        await refreshAccessTokenFn();
        // Retry the original request with the new token
        return axiosAuth(originalRequest);
      } catch (refreshError) {
        // If token refresh fails, reject with the refresh error
        return Promise.reject(refreshError);
      }
    }

    // Check for 401 Unauthorized status code
    if (error.response && error.response.status === 401) {
      // Redirect to sign-in page if navigate function is available
      if (navigate) {
        navigate("/signin");
      } else {
        console.warn(
          "Navigation function not set. Unable to redirect to sign-in page."
        );
        // Alternative approach if you're not using React Router:
        // window.location.href = "/signin";
      }
    }

    // For other errors, just reject with the original error
    return Promise.reject(error);
  }
);

export default axiosAuth;
