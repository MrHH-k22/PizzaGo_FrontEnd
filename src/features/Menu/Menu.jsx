import { useState } from "react";
import TabBar from "../../components/Tabs/TabBar";
import useGetFoodItems from "../../hooks/useGetFoodItem";
import useSearchFood from "../../hooks/useSearchFoodItem";
import MenuItem from "./MenuItem";

function Menu({ toggleModal, handleFoodSelect }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    foodItems,
    isLoading: isGettingFoodItems,
    isError: isGettingFoodItemsError,
    error: foodItemsError,
  } = useGetFoodItems();

  const {
    searchFood,
    searchResults,
    isSearching,
    isError: isSearchError,
    error: searchError,
    resetSearch,
  } = useSearchFood();

  // Handle category change from TabBar
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsSearchMode(false);
  };

  // Handle search from TabBar
  const handleSearch = (query) => {
    if (!query || query.trim() === "") {
      setIsSearchMode(false);
      resetSearch();
      return;
    }

    setSearchQuery(query);
    setIsSearchMode(true);
    searchFood(query);
  };

  // Determine which items to display based on mode
  let displayItems = [];
  let displayTitle = "";

  if (isSearchMode) {
    displayItems = searchResults || [];
    displayTitle = `SEARCH RESULTS: "${searchQuery}"`;
  } else {
    displayItems = selectedCategory
      ? foodItems?.filter((item) => item.category._id === selectedCategory)
      : [];
    displayTitle = getCategoryName();
  }

  // Get category name for display
  function getCategoryName() {
    const category = foodItems?.find(
      (item) => item.category._id === selectedCategory
    )?.category;
    return category ? category.name.toUpperCase() : "";
  }

  // Loading state
  if ((isGettingFoodItems && !isSearchMode) || (isSearching && isSearchMode)) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  // Error state
  if (
    (isGettingFoodItemsError && !isSearchMode) ||
    (isSearchError && isSearchMode)
  ) {
    const errorMessage = isSearchMode
      ? searchError?.message
      : foodItemsError?.message;
    return (
      <div className="text-red-500 text-center h-64">Error: {errorMessage}</div>
    );
  }

  return (
    <div>
      <TabBar onCategoryChange={handleCategoryChange} onSearch={handleSearch} />
      <div>
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-2xl font-bold text-gray-800">
            {displayTitle}
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {displayItems && displayItems.length > 0 ? (
            displayItems.map((item) => (
              <MenuItem
                key={item._id}
                foodItem={item}
                toggleModal={toggleModal}
                handleFoodSelect={handleFoodSelect}
              />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 py-10">
              {isSearchMode
                ? "No results found"
                : "No items found in this category"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
