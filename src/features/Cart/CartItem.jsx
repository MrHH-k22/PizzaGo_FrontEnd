import { MdDelete, MdDeleteForever } from "react-icons/md";

function CartItem() {
  return (
    <div className="py-4 border-b border-gray-200 w-full">
      <div className="flex items-center">
        <img
          src="/imgs/ExamplePizza.png"
          alt="Pizza"
          className="w-20 h-20 rounded-md object-cover mr-4"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <h3 className="font-medium text-lg text-black">
              Pizza Heo Xé BBQ Hàn Quốc
            </h3>
            <div className="ml-2 px-2 py-1rounded-md">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                  -
                </button>
                <span className="px-4">1</span>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <p className="font-medium text-lg mr-4">119.000 đ</p>
              <button className="text-gray-500 hover:text-gray-700">
                <MdDelete size={22} />
              </button>
            </div>
          </div>
          <div className="text-gray-600 mt-1">
            <p className="mb-1">Size: Small</p>
            <p className="mb-1">Crust type: Thin</p>
            <p className="mb-1">Extra Topping: tomato, cheese</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
