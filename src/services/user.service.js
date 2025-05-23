const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserInfo = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/getUserById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw { message: data.message || "Không thể lấy thông tin người dùng" };
    }

    return await response.json();
  } catch (error) {
    console.error("Get user info error:", error);
    const errMsg = error.message || "Không thể lấy thông tin người dùng";
    throw { message: errMsg };
  }
};

export const getCountByRole = async (role) => {
  try {
    const response = await fetch(`${API_URL}/user/countByRole`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch count by role");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching count by role:", error);
    throw error;
  }
};
export const getUsers = async (role) => {
  try {
    const response = await fetch(`${API_URL}/user/getUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    // console.log("Fetched users:", data);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const addUser = async (user) => {
  // console.log("Adding user:", user);
  try {
    const response = await fetch(`${API_URL}/user/addUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to add user");
    }
    return data;
  } catch (error) {
    // console.error("Error adding user:", error);
    throw error;
  }
};
export const editUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/user/editUser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to edit user");
    }
    return data;
  } catch (error) {
    // console.error("Error editing user:", error);
    throw error;
  }
};
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/deleteUser`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete user");
    }
    return data;
  } catch (error) {
    // console.error("Error deleting user:", error);
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await fetch(`${API_URL}/user/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
      credentials: "include", // Include cookies for authentication
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to change password");
    }
    return data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
