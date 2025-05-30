import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa"; // Import necessary icons
import useSignUp from "../../hooks/useSignUp";
import { toast } from "react-toastify";
import { Link } from "react-router";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, isCreatingUser, isSuccess } = useSignUp();

  // Basic form state (optional, for completeness)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu không khớp!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    console.log("Form data submitted:", formData);
    registerUser(formData);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 font-sans">
      {/* Container to control max-width and relative positioning for back button */}
      <div className="w-full max-w-lg relative mb-6">
        {" "}
        {/* Adjusted max-width */}
        {/* Back Link */}
        <button
          type="button" // Use button for better accessibility if it triggers navigation via JS
          onClick={() => window.history.back()} // Example back navigation
          className="absolute top-0 left-0 mt-1 flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 pt-8">
          Sign Up
        </h1>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 md:p-10">
        {" "}
        {/* Increased padding */}
        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="mb-5">
            {" "}
            {/* Increased margin */}
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800 mb-1.5" // Bolder label
            >
              Fullname <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Input your full name"
              required
              className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
              autoComplete="name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Input your email"
              required
              className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
              autoComplete="email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Input your password"
                required
                className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out pr-10" // Space for icon
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {/* Slightly different icons like in the image */}
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {/* Optional: Add password requirements text here */}
            {/* <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long.</p> */}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
                className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Address Input (Optional) */}
          <div className="mb-6">
            {" "}
            {/* Larger margin before button */}
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Address <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address (optional)"
              className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
              autoComplete="street-address"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            // Using the red color from the login page for consistency, instead of the grey from the image
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-md py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
            // Or use the light gray style from the image:
            // className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-lg rounded-md py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 ease-in-out"
          >
            Sign Up
          </button>
        </form>
        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login" // Link to your login page
            className="font-medium text-red-600 hover:text-red-700 hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
