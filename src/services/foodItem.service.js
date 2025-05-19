const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getFoodItems = async () => {
  try {
    const response = await fetch(`${API_URL}/foodItem/getfooditem`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch food items");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching food items:", error);
    throw error;
  }
};
