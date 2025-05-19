import { useState } from "react";
import TabBar from "../../components/Tabs/TabBar";
import useGetFoodItems from "../../hooks/useGetFoodItem";
import MenuItem from "./MenuItem";

function Menu({ toggleModal }) {
  // Giữ nguyên state với giá trị khởi tạo là null
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    foodItems,
    isLoading: isGettingFoodItems,
    isError: isGettingFoodItemsError,
    error: foodItemsError,
  } = useGetFoodItems();

  // Handle category change from TabBar
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Filter food items based on selected category
  const filteredItems = selectedCategory
    ? foodItems?.filter((item) => item.category._id === selectedCategory)
    : [];

  // Get category name for display
  const getCategoryName = () => {
    const category = foodItems?.find(
      (item) => item.category._id === selectedCategory
    )?.category;
    return category ? category.name.toUpperCase() : "";
  };

  if (isGettingFoodItems) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading food items...
      </div>
    );
  }

  if (isGettingFoodItemsError) {
    return (
      <div className="text-red-500 text-center h-64">
        Error: {foodItemsError?.message}
      </div>
    );
  }

  return (
    <div>
      <TabBar onCategoryChange={handleCategoryChange} />
      <div>
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-2xl font-bold text-gray-800">
            {getCategoryName()}
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <MenuItem
                key={item._id}
                foodItem={item}
                toggleModal={toggleModal}
              />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 py-10">
              No items found in this category
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
