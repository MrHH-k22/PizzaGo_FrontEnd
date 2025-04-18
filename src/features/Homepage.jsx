import { useState } from "react";
import SimpleSlider from "../components/Slider";
import Menu from "./Menu/Menu";
import PizzaModal from "./PizzaModal/PizzaModal";

function Homepage() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function toggleModal() {
    setIsOpenModal((prev) => !prev);
  }

  return (
    <div className="px-4 text-center max-w-7xl mx-auto mb-10">
      {isOpenModal && <PizzaModal toggleModal={toggleModal} />}
      <div className="mb-16">
        <SimpleSlider />
      </div>
      <div>
        <Menu toggleModal={toggleModal} />
      </div>
    </div>
  );
}

export default Homepage;
