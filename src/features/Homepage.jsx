import { useState } from "react";
import SimpleSlider from "../components/Slider";
import Menu from "./Menu/Menu";
import FoodModal from "./FoodModal/FoodModal";

function Homepage() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  // Function to handle food selection
  function handleFoodSelect(food) {
    setSelectedFood(food);
  }

  function toggleModal() {
    setIsOpenModal((prev) => !prev);
  }

  return (
    <div className="px-4 text-center max-w-7xl mx-auto mb-10">
      {isOpenModal && (
        <FoodModal toggleModal={toggleModal} selectedFood={selectedFood} />
      )}
      <div className="mb-16">
        <SimpleSlider />
      </div>
      <div>
        <Menu toggleModal={toggleModal} handleFoodSelect={handleFoodSelect} />
      </div>
    </div>
  );
}

export default Homepage;
