const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/order/getorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication
    });
    if (!response.ok) {
      throw {
        message: response.message || "Can not fetch orders",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await fetch(`${API_URL}/order/updatestatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        orderId: orderId,
        status: newStatus,
      }),
    });

    if (!response.ok) {
      throw {
        message: response.statusText || "Cannot update order status",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
