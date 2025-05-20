import { FaCirclePlus } from "react-icons/fa6";
import useAddToCart from "../../hooks/useAddToCart.js";
import { getImagePath } from "../../utils/helpers.js";

function MenuItem({ foodItem, toggleModal, handleFoodSelect }) {
  // Function to get image path based on image name
  const { addToCart, isAddingToCart, isError, isSuccess, error, data } =
    useAddToCart();

  // If no food item is provided, return null or a placeholder
  if (!foodItem) return null;

  function handleAddToCart(e) {
    // Ngăn sự kiện click lan truyền lên phần tử cha
    e.stopPropagation();

    // Logic to add the food item to the cart
    addToCart(foodItem._id, 1);
  }

  function handleFoodClick() {
    // Logic to handle food item click
    toggleModal(foodItem);
    handleFoodSelect(foodItem);
  }

  return (
    <div
      className="group flex rounded-lg border border-gray-300 bg-white overflow-hidden w-full transition-shadow duration-300 hover:shadow-xl"
      onClick={() => handleFoodClick()}
    >
      {/* Phần hình ảnh bên trái */}
      <div className="w-1/3 p-3">
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <img
            src={getImagePath(foodItem.image)}
            alt={foodItem.name}
            className="object-cover h-full w-full transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Phần nội dung bên phải */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div className="text-left">
          <h3 className="font-bold text-xl text-gray-800">{foodItem.name}</h3>
          <p className="text-md text-gray-600 mt-1">
            {foodItem.description.length > 45
              ? `${foodItem.description.substring(0, 45)}...`
              : foodItem.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-xl">
            {foodItem.price.toLocaleString()} đ
          </span>
          <button
            onClick={handleAddToCart}
            className="text-red-500 rounded-full w-8 h-8 flex items-center justify-center text-4xl"
          >
            <FaCirclePlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
