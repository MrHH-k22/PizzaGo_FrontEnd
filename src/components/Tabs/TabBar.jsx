import { useState, useMemo } from "react";
import TabItem from "./TabItem";
import { IoSearch } from "react-icons/io5";
import { TbPizza } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiDrinks2Line } from "react-icons/ri";
import { LuVegan } from "react-icons/lu";
import useGetCategory from "../../hooks/useGetCategory";

function TabBar({ onCategoryChange, onSearch }) {
  const [activeTab, setActiveTab] = useState("1"); // Mặc định là tab thứ 2
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialCategorySet, setInitialCategorySet] = useState(false);

  const {
    categories,
    isLoading: isGettingCategory,
    isError: isGettingCategoryError,
    error: categoryError,
  } = useGetCategory();

  // Map các icon tương ứng với tên category
  const getCategoryIcon = (categoryName) => {
    const lowerCaseName = categoryName.toLowerCase();
    if (lowerCaseName.includes("pizza")) return <TbPizza />;
    if (lowerCaseName.includes("food")) return <IoFastFoodOutline />;
    if (lowerCaseName.includes("drink")) return <RiDrinks2Line />;
    if (lowerCaseName.includes("vegetarian") || lowerCaseName.includes("vegan"))
      return <LuVegan />;
    return <IoFastFoodOutline />; // Default icon
  };

  // Tạo tabs từ dữ liệu categories và thêm tab search
  const tabs = useMemo(() => {
    // Tab Search luôn là tab đầu tiên
    const searchTab = [
      {
        id: "0",
        icon: <IoSearch />,
        label: "SEARCH",
      },
    ];

    // Nếu không có categories hoặc đang loading, trả về chỉ tab search
    if (!categories || isGettingCategory) return searchTab;

    // Tạo các tab từ categories với id bắt đầu từ "1"
    const categoryTabs = categories.map((category, index) => ({
      id: (index + 1).toString(), // ID có định dạng "1", "2", "3",...
      icon: getCategoryIcon(category.name),
      label: category.name.toUpperCase(),
      categoryId: category._id,
    }));

    return [...searchTab, ...categoryTabs];
  }, [categories, isGettingCategory]);

  const handleTabClick = (tabId, categoryId) => {
    if (tabId === "0") {
      // Khi bấm vào tab Search
      setIsSearchActive(true);
    } else {
      setActiveTab(tabId);
      setIsSearchActive(false);
      // Gọi callback để thông báo thay đổi category cho component cha
      onCategoryChange(categoryId);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleCancel = () => {
    setIsSearchActive(false);
    setSearchQuery("");
    onSearch("");
  };

  // Hiển thị loading khi đang lấy dữ liệu categories
  if (isGettingCategory) {
    return (
      <div className="w-full h-[100px] flex items-center justify-center">
        Loading categories...
      </div>
    );
  }

  // Hiển thị thông báo lỗi nếu có
  if (isGettingCategoryError) {
    return (
      <div className="w-full h-[100px] flex items-center justify-center text-red-500">
        Error loading categories: {categoryError?.message}
      </div>
    );
  }

  // Ngay sau khi kiểm tra loading, trước khi render
  // Tự động thiết lập category đầu tiên làm mặc định nếu có
  if (categories?.length > 0 && !initialCategorySet) {
    setTimeout(() => {
      onCategoryChange(categories[0]._id);
      setInitialCategorySet(true);
    }, 0);
  }

  return (
    <div className="w-full overflow-x-auto h-[100px]">
      {isSearchActive ? (
        <div className="flex items-center w-full gap-2 p-2 ease-out">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for food..."
            className="flex-grow p-2 border border-gray-300 rounded"
            autoFocus
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
          >
            Close
          </button>
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-white bg-red-600 rounded"
          >
            Search
          </button>
        </div>
      ) : (
        // Hiển thị các tab bình thường
        <div className="flex min-w-max justify-between">
          {tabs.map((tab) => (
            <TabItem
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id, tab.categoryId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TabBar;
