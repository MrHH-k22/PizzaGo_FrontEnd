const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/category/getcategories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
