import { FaCirclePlus } from "react-icons/fa6";

function MenuItem({ toggleModal }) {
  return (
    <div className="group flex rounded-lg border border-gray-300 bg-white overflow-hidden w-full transition-shadow duration-300 hover:shadow-xl">
      {/* Phần hình ảnh bên trái */}
      <div className="w-1/3 p-3">
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <img
            src="/imgs/ExamplePizza.png"
            alt="Fried Chicken Wings"
            className="object-cover h-full w-full transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Phần nội dung bên phải */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div className="text-left">
          <h3 className="font-bold text-xl text-gray-800">
            Fried Chicken Wings Gochujang (6Pcs)
          </h3>
          <p className="text-md text-gray-600 mt-1">
            Sweet honey with mildly spicy taste of...
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-xl">169.000 đ</span>
          <button
            onClick={toggleModal}
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
