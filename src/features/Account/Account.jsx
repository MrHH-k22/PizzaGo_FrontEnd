import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import useEditUser from "../../hooks/useEditUser";

function Account() {
  const { user, getUserFromDatabase } = useAuth();
  const { editUserMutation, isEditingUser } = useEditUser();

  // State for profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
  });

  // State for password change
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = () => {
    // Basic validation
    if (!profileData.name.trim() || !profileData.email.trim()) {
      toast.error("Fullname must not be empty.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Email validation
    if (profileData.email !== user.email) {
      toast.error("You can not change your Email.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Submit update using the existing editUserMutation
    editUserMutation(
      {
        _id: user.id,
        name: profileData.name,
        email: profileData.email,
        address: profileData.address,
        role: user.role,
      },
      {
        onSuccess: () => {
          // Reset form and exit edit mode after submission
          const temp = getUserFromDatabase(user.id);
          console.log("temp", temp);
          setProfileData({
            name: temp.name || "",
            email: temp.email || "",
            address: temp.address || "",
          });
          setIsEditingProfile(false);
        },
      }
    );
  };

  const handlePasswordSubmit = () => {
    // Basic validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Password match validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Mật khẩu mới không khớp", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Password strength validation (optional)
    if (passwordData.newPassword.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Submit password change using the existing editUserMutation
    editUserMutation(
      {
        userId: user._id,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        isPasswordChange: true,
      },
      {
        onSuccess: () => {
          // Reset form and exit edit mode after submission
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setIsChangingPassword(false);
        },
      }
    );
  };

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 mt-10">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7">
          Profile
        </h3>

        <div className="p-5 mb-6 border border-gray-200 rounded-2xl lg:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col items-center w-full xl:flex-row">
              <h3 className="ml-1.5 text-2xl font-bold text-center text-red-500 xl:text-left">
                {user.role}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-5 mb-6 border border-gray-200 rounded-2xl lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="w-lg">
              <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
                Personal Information
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:gap-7 2xl:gap-x-32">
                {!isEditingProfile ? (
                  <>
                    <div>
                      <p className="mb-2 text-xl leading-normal text-gray-500">
                        Fullname
                      </p>
                      <p className="text-base font-medium text-gray-800">
                        {user.name}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xl leading-normal text-gray-500">
                        Email address
                      </p>
                      <p className="text-base font-medium text-gray-800">
                        {user.email}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xl leading-normal text-gray-500">
                        Address
                      </p>
                      <p className="text-base font-medium text-gray-800">
                        {user.address ? user.address : "No address provided"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="mb-2 text-xl leading-normal text-gray-500">
                        Fullname
                      </p>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>

                    <div className="hidden">
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>

                    <div>
                      <p className="mb-2 text-xl leading-normal text-gray-500">
                        Address
                      </p>
                      <input
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleProfileSubmit}
                        disabled={isEditingUser}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-base font-medium text-white shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                      >
                        {isEditingUser ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                            </svg>
                            <span>Save</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setIsEditingProfile(false);
                          setProfileData({
                            name: user.name || "",
                            email: user.email || "",
                            address: user.address || "",
                          });
                        }}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                        <span>Cancel</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xl leading-normal text-gray-500">
                    Fullname
                  </p>
                  <p className="text-base font-medium text-gray-800">
                    {user.name}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xl leading-normal text-gray-500">
                    Email address
                  </p>
                  <p className="text-base font-medium text-gray-800">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xl leading-normal text-gray-500">
                    Address
                  </p>
                  <p className="text-base font-medium text-gray-800">
                    {user.address ? user.address : "No address provided"}
                  </p>
                </div>
              </div> */}
            </div>
            {!isEditingProfile && (
              <button
                onClick={() => {
                  setIsEditingProfile(true);
                  setProfileData({
                    name: user.name || "",
                    email: user.email || "",
                    address: user.address || "",
                  });
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-base font-medium text-white shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                    fill="currentColor"
                  ></path>
                </svg>
                Edit
              </button>
            )}

            {/* <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-base font-medium text-white shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                  fill=""
                ></path>
              </svg>
              Edit
            </button> */}
          </div>
        </div>

        <div className="p-5 border border-gray-200 rounded-2xl lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="w-lg">
              <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
                Change Password
              </h4>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="mb-2 text-xl leading-normal text-gray-500">
                    New Password
                  </p>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="*********"
                    required
                  />
                </div>

                <div>
                  <p className="mb-2 text-xl leading-normal text-gray-500">
                    Confirm Password
                  </p>
                  <input
                    type="password"
                    id="confirm-password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="*********"
                    required
                  />
                </div>
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-base font-medium text-white shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                  fill=""
                ></path>
              </svg>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
