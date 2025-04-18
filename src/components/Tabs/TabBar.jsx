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

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-max justify-between">
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            icon={tab.icon}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TabBar;
