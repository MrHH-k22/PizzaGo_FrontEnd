// components/DeliveryInfo.jsx
import { useFormContext } from "react-hook-form";

const deliveryMethods = ["Fast Delivery", "Economy Delivery", "Pick up"];

function DeliveryInfo({ user }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
        {errors.deliveryAddress && (
          <span className="text-red-500">{errors.deliveryAddress.message}</span>
        )}
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

      <div>
        <p className="text-xl font-semibold text-gray-800 mb-4">
          Delivery method
        </p>
        <div className="relative">
          <select
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
            {...register("shippingMethod", {
              required: "Shipping method is required",
            })}
            defaultValue="Economy Delivery"
          >
            {deliveryMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          {errors.shippingMethod && (
            <span className="text-red-500">
              {errors.shippingMethod.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeliveryInfo;
