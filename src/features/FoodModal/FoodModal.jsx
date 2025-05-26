import { useState, useRef, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { FiPlus, FiMinus } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { getImagePath } from "../../utils/helpers";
import useAddToCart from "../../hooks/useAddToCart";

function FoodModal({ toggleModal, selectedFood }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isAddingToCart, isError, isSuccess, error, data } =
    useAddToCart();

  // Lấy giá từ selectedFood
  const price = selectedFood?.price || 0;

  // Kiểm tra xem có phải là pizza không (không phân biệt hoa thường)
  const isPizza = selectedFood?.category?.name?.toLowerCase() === "pizza";

  const modalRef = useRef(null);

  // Use useCallback to memoize the function and prevent re-creation on each render
  const handleClickOutside = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  function handleAddToCart() {
    // Logic to add the food item to the cart
    addToCart(selectedFood._id, quantity);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="flex flex-col md:flex-row w-[950px] max-w-[95vw] h-[650px] max-h-[90vh] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300"
      >
        {/* Image Section */}
        <div className="md:w-2/5 relative overflow-hidden">
          <img
            src={getImagePath(selectedFood?.image)}
            alt={selectedFood?.name || "Food"}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="md:w-3/5 p-8 flex flex-col bg-gradient-to-br from-white to-gray-50">
          {/* Header - Fixed at top */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedFood?.name || "Food Name"}
              </h2>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
              onClick={toggleModal}
            >
              <IoMdClose size={24} />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed text-base text-left whitespace-pre-wrap break-words">
                {selectedFood?.description || "No description available"}
              </p>
            </div>

            {/* Pizza Options - Enhanced Design */}
            {isPizza && (
              <div className="space-y-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 text-left">
                  Pizza Details
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* Pizza Base Section */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Pizza Base
                    </h4>
                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border-l-4 border-red-500 shadow-sm">
                      <p className="text-gray-800 font-medium text-left">
                        {selectedFood?.pizzaBase || "Traditional"}
                      </p>
                    </div>
                  </div>

                  {/* Sauce Section */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Sauce
                    </h4>
                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border-l-4 border-red-500 shadow-sm">
                      <p className="text-gray-800 font-medium text-left">
                        {selectedFood?.sauce || "Tomato"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Toppings Section */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Toppings
                    </h4>
                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border-l-4 border-red-500 shadow-sm h-auto overflow-auto">
                      <div className="flex flex-wrap gap-2">
                        {selectedFood?.toppings &&
                        selectedFood.toppings.length > 0 ? (
                          selectedFood.toppings.map((topping, index) => (
                            <span
                              key={index}
                              className="bg-white text-red-700 px-3 py-1 rounded-full text-xs font-medium border border-red-300 shadow-sm"
                            >
                              {topping}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500 italic text-sm">
                            No toppings
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Vegetables Section */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Vegetables
                    </h4>
                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border-l-4 border-red-500 shadow-sm h-auto overflow-auto">
                      <div className="flex flex-wrap gap-2">
                        {selectedFood?.vegetables &&
                        selectedFood.vegetables.length > 0 ? (
                          selectedFood.vegetables.map((vegetable, index) => (
                            <span
                              key={index}
                              className="bg-white text-red-700 px-3 py-1 rounded-full text-xs font-medium border border-red-300 shadow-sm"
                            >
                              {vegetable}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500 italic text-sm">
                            No vegetables
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quantity and Add to Cart - Fixed at bottom */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200 mt-auto">
            {/* Quantity Selector */}
            <div className="flex items-center bg-white border border-gray-300 rounded-xl shadow-sm">
              <button
                className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 rounded-l-xl"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <FiMinus size={18} />
              </button>
              <span className="px-6 py-3 font-semibold text-gray-800 min-w-[50px] text-center">
                {quantity}
              </span>
              <button
                className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 rounded-r-xl"
                onClick={increaseQuantity}
              >
                <FiPlus size={18} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              className="hover:cursor-pointer flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold text-lg"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              <BsCart3 size={20} />
              <span>Add to basket</span>
              <span className="bg-white/20 px-3 py-1 rounded-lg">
                {(price * quantity).toLocaleString()} ₫
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodModal;
