import { useState } from "react";
import { useFormContext } from "react-hook-form";

// const deliveryMethods = ["Economy Delivery", "Fast Delivery", "Pick up"];

function DeliveryInfo({ user }) {
  const [note, setNote] = useState("");
  const [deliveryAddress, setdeliveryAddresse] = useState(user?.address || "");
  const {
    register,
    formState: { errors },
  } = useFormContext();
  // const [timeOption, setTimeOption] = useState(deliveryMethods[0]);
  // const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  return (
    <div className="px-8 py-6 md-min-h-fit bg-white md:border border-gray-300 rounded-2xl mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">Delivery to</h2>
      </div>

      <div className="mb-4">
        <p className="text-gray-800 mb-1"></p>
        <input
          type="text"
          placeholder="Delivery address"
          className="w-full p-3 border border-gray-300 rounded-md text-gray-800 text-md font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
          {...register("deliveryAddress", {
            required: "Delivery address is required",
          })}
        />
      </div>

      <div className="mb-4">
        <p className="text-xl font-semibold text-gray-800 mb-4">Note</p>
        <input
          type="text"
          placeholder="Note for delivery e.g. floor, room..."
          className="w-full p-3 border border-gray-300 rounded-md text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          {...register("note")}
        />
      </div>

      {/* <div>
        <p className="text-xl font-semibold text-gray-800 mb-4">
          Delivery method
        </p>
        <div className="relative">
          <button
            className="w-full p-3 border border-gray-300 rounded-md text-left text-gray-800 flex justify-between items-center"
            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
          >
            <span>{timeOption}</span>
          </button>

          {isTimeDropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {deliveryMethods.map((option) => (
                <div
                  key={option}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setTimeOption(option);
                    setIsTimeDropdownOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default DeliveryInfo;
