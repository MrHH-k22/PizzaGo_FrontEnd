import { useState, useRef, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";

function PizzaModal({ toggleModal }) {
  const [size, setSize] = useState("Regular");
  const [crust, setCrust] = useState("Hand Tossed(Regular)");
  const [quantity, setQuantity] = useState(1);
  const price = 79000;

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
  }, [handleClickOutside]); // handleClickOutside is now stable due to useCallback

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="md:w-1/2">
          <img
            src="/imgs/ExamplePizza.png"
            alt="Bacon Onion Pizza"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-left">Bacon Onion Pizza</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={toggleModal}
            >
              <IoMdClose />
            </button>
          </div>

          <p className="text-gray-600 mb-6 text-left">
            Lardon, Mozzarella Cheese, Onion, Sweet Chili Sauce, Cheesy Mayo
            Sauce, Parsley Fresh
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-left">Size</h3>
            <div className="flex gap-2">
              <button
                className={`flex-1 py-2 px-4 rounded-md transition ${
                  size === "Regular"
                    ? "bg-red-600 text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => setSize("Regular")}
              >
                Regular
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md transition ${
                  size === "Personal"
                    ? "bg-red-600 text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => setSize("Personal")}
              >
                Personal
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-left">Crust</h3>
            <div className="mb-3 flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="hand-tossed"
                  name="crust"
                  className="mr-2"
                  checked={crust === "Hand Tossed(Regular)"}
                  onChange={() => setCrust("Hand Tossed(Regular)")}
                />
                <label htmlFor="hand-tossed">Hand Tossed(Regular)</label>
              </div>
              <span className="text-gray-700">79.000 ₫</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="pan"
                  name="crust"
                  className="mr-2"
                  checked={crust === "Pan(Regular)"}
                  onChange={() => setCrust("Pan(Regular)")}
                />
                <label htmlFor="pan">Pan(Regular)</label>
              </div>
              <span className="text-gray-700">79.000 ₫</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-left">Extra Topping</h3>
            <div className="mb-3 flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cheese"
                  name="extra"
                  className="mr-2"
                  onChange={() => {}}
                />
                <label htmlFor="cheese">Cheese</label>
              </div>
              <span className="text-gray-700">79.000 ₫</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="tomatoes"
                  name="extra"
                  className="mr-2"
                  onChange={() => {}}
                />
                <label htmlFor="tomatoes">Tomatoes</label>
              </div>
              <span className="text-gray-700">79.000 ₫</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            <button className="flex-1 ml-4 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition flex items-center justify-center">
              Add to basket <span className="ml-2">•</span>{" "}
              <span className="ml-2">
                {(price * quantity).toLocaleString()} ₫
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PizzaModal;
