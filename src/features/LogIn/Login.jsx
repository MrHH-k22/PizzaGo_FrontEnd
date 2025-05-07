import React, { useState } from "react";
import {
  FaRegStar,
  FaGift,
  FaMobileAlt,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";
import Logo_PizzaGo from "../../../public/imgs/Logo.png"; // Adjust the path as necessary

function LogIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-sans">
      {/* Container for back button and logo with relative positioning */}
      <div className="w-full max-w-md relative mb-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="absolute top-0 left-0 mt-1 flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>
      {/* Logo */}
      <div className="mb-[-30px] z-10">
        <div className="w-25 h-25 md:w-35 md:h-35 bg-white rounded-2xl flex items-center justify-center shadow-md border-2 border-white">
          <img
            className="text-red-600 font-bold text-sm"
            src={Logo_PizzaGo}
          ></img>
        </div>
      </div>

      <div className="w-full max-w-md rounded-lg shadow-xl overflow-hidden">
        {/* Top Red Banner Section */}
        <div className="bg-red-600 text-white p-6 md:p-8 text-center">
          {/* Banner text */}
          <p className="text-sm font-medium mb-1"></p>
          <h1 className="text-xl md:text-2xl font-bold mb-6">
            Log in to your account
          </h1>

          {/* Icons Section */}
          <div className="flex justify-around items-start text-xs md:text-sm">
            <div className="flex flex-col items-center w-1/3 px-1">
              <div className="border-2 border-white rounded-full p-2 mb-1">
                <FaGift className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="font-medium">Enjoy</span>
              <span>Excellent Service</span>
            </div>
            <div className="flex flex-col items-center w-1/3 px-1">
              <div className="border-2 border-white rounded-full p-2 mb-1">
                <FaRegStar className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="font-medium">Track your order</span>
              <span>Real time</span>
            </div>
            <div className="flex flex-col items-center w-1/3 px-1">
              <div className="border-2 border-white rounded-full p-2 mb-1">
                <FaMobileAlt className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="font-medium">Order Pizza</span>
              <span>Piece of cake</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 md:p-8">
          <form>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-800 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
                autoComplete="email"
              />
            </div>

            {/* Password Input */}
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-800 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out pr-10" // Added pr-10 for icon space
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mb-6">
              <a
                href="#"
                className="text-sm text-red-600 hover:text-red-700 hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-md py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
            >
              Đăng Nhập
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Have no account?{" "}
            <a
              href="#"
              className="font-medium text-red-600 hover:text-red-700 hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
