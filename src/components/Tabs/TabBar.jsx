import { useState } from "react";
import TabItem from "./TabItem";
import { IoSearch } from "react-icons/io5";
import { TbPizza } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiDrinks2Line } from "react-icons/ri";
import { LuVegan } from "react-icons/lu";

const tabs = [
  {
    id: "0",
    icon: <IoSearch />,
    label: "SEARCH",
  },
  {
    id: "1",
    icon: <TbPizza />,
    label: "PIZZA",
  },
  {
    id: "2",
    icon: <IoFastFoodOutline />,
    label: "Food",
  },
  {
    id: "3",
    icon: <RiDrinks2Line />,
    label: "Drinks",
  },
  {
    id: "4",
    icon: <LuVegan />,
    label: "Vegetarian",
  },
];

function TabBar() {
  const [activeTab, setActiveTab] = useState("RECOMMEND");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabClick = (tabId) => {
    if (tabId === "0") {
      // Khi bấm vào tab Search
      setIsSearchActive(true);
    } else {
      setActiveTab(tabId);
    }
  };

  const handleSearch = () => {
    // Xử lý tìm kiếm
    console.log("Searching for:", searchQuery);
    // Thực hiện tìm kiếm với searchQuery
  };

  const handleCancel = () => {
    setIsSearchActive(false);
    setSearchQuery("");
  };

  return (
    <div className="w-full overflow-x-auto h-[100px]">
      {isSearchActive ? (
        // Hiển thị thanh tìm kiếm khi đã bấm nút tìm kiếm
        <div className="flex items-center w-full gap-2 p-2 ease-out">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm mọi thứ bạn muốn"
            className="flex-grow p-2 border border-gray-300 rounded"
            autoFocus
          />
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
          >
            Đóng
          </button>
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-white bg-red-600 rounded"
          >
            Tìm kiếm
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
              onClick={() => handleTabClick(tab.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TabBar;
