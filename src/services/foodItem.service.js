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

export const searchFoodItems = async (query) => {
  try {
    const response = await fetch(
      `${API_URL}/foodItem/search?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search food items");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching food items:", error);
    throw error;
  }
};
// Add food, drink, vegetarian items
export const addFoodItem = async (itemData) => {
  try {
    // console.log("Adding food item:", itemData);
    const formData = new FormData();
    Object.keys(itemData).forEach(key => {
      if (key !== 'image' || !itemData[key]) {
        formData.append(key, itemData[key]);
      }
    });
    if (itemData.image && itemData.image instanceof File) {
      formData.append('image', itemData.image, itemData.image.name);
      // console.log(`Appending image: ${itemData.image.name} (${itemData.image.type}, ${Math.round(itemData.image.size/1024)}KB)`);
    }
    const response = await fetch(`${API_URL}/foodItem/addFoodItem`, {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to add food item");
    } 
    return data;
  } catch (error) {
    console.error("Error adding food item:", error);
    throw error;
  }
};
export const editFoodItem = async (itemData) => {
  try {
    console.log("Editing food item:", itemData);
    const formData = new FormData();
    Object.keys(itemData).forEach(key => {
      if (key !== 'image' || !itemData[key]) {
        formData.append(key, itemData[key]);
      }
    });
    if (itemData.image && itemData.image instanceof File) {
      formData.append('image', itemData.image, itemData.image.name);
    }
    const response = await fetch(`${API_URL}/foodItem/editFoodItem`, {
      method: "PATCH",
      body: formData
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to edit food item");
    } 
    return data;
  } catch (error) {
    console.error("Error editing food item:", error);
    throw error;
  }
}
export const deleteFoodItem = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/foodItem/deleteFoodItem`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete food item");
    }
    return data;
  } catch (error) {
    console.error("Error deleting food item:", error);
    throw error;
  }
}
