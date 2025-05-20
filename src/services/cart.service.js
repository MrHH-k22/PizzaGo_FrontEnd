const API_URL = import.meta.env.VITE_BACKEND_URL;

export const addToCartService = async (foodId, quantity) => {
  // Dữ liệu đơn giản với tham số rõ ràng
  const cartData = { foodId, quantity };

  console.log("Adding to cart service with data:", cartData);

  try {
    const response = await fetch(`${API_URL}/cart/addToCart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });
    console.log("Response from server:", response);

    if (!response.ok) {
      const responseData = await response.json();
      // Kiểm tra nếu là lỗi xác thực (401)
      if (response.status === 401) {
        const error = new Error(responseData.message);
        error.status = response.status;
        throw error;
      } else throw { message: responseData.message || "Error adding to cart" };
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await fetch(`${API_URL}/cart/getCart`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseData = await response.json();

      // Kiểm tra nếu là lỗi xác thực (401)
      if (response.status === 401) {
        console.log("Response from server:", response.status);
        const error = new Error(responseData.message);
        error.status = response.status;
        throw error;
      } else throw { message: responseData.message || "Error getting cart" };
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const updateQuantity = async (foodId, action) => {
  try {
    const response = await fetch(`${API_URL}/cart/updateQuantity`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodId, action }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      if (response.status === 401) {
        const error = new Error(responseData.message);
        error.status = response.status;
        throw error;
      } else
        throw { message: responseData.message || "Error updating quantity" };
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/cart/removeFromCart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }), // Gửi itemId trong body
    });

    if (!response.ok) {
      const responseData = await response.json();
      if (response.status === 401) {
        const error = new Error(responseData.message);
        error.status = response.status;
        throw error;
      } else {
        throw { message: responseData.message || "Lỗi khi xóa sản phẩm" };
      }
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    throw error;
  }
};
