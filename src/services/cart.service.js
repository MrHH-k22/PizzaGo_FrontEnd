const API_URL = import.meta.env.VITE_BACKEND_URL;

export const addToCartService = async (foodId, quantity = 1) => {
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
        throw { message: responseData.message, status: 401 };
      }
      throw { message: responseData.message || "Error adding to cart" };
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
