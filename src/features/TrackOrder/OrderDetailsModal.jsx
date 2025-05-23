import { IoMdClose } from "react-icons/io";
import { getImagePath } from "../../utils/helpers";

function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4"
        onClick={handleModalClick}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold">Order Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <div className="p-4">
          {/* Order Information */}
          <div className="mb-4 border-b pb-4">
            <h3 className="text-lg font-bold mb-2">Order Information</h3>
            <p className="font-semibold">
              Order ID: <span className="font-normal">{order._id}</span>
            </p>
            <p className="font-semibold">
              Status:{" "}
              <span className="font-normal text-orange-600">
                {order.status.toUpperCase()}
              </span>
            </p>
            <p className="font-semibold">
              Date:{" "}
              <span className="font-normal">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </p>
            <p className="font-semibold">
              Shipping Method:{" "}
              <span className="font-normal">{order.shippingMethod}</span>
            </p>
          </div>

          {/* Customer Details */}
          <div className="mb-4 border-b pb-4">
            <h3 className="text-lg font-bold mb-2">Customer Details</h3>
            <p className="font-semibold">
              Name: <span className="font-normal">{order.customerId.name}</span>
            </p>
            <p className="font-semibold">
              Email:{" "}
              <span className="font-normal">{order.customerId.email}</span>
            </p>
            <p className="font-semibold">
              Delivery Address:{" "}
              <span className="font-normal">{order.deliveryAddress}</span>
            </p>
          </div>

          {/* Order Items */}
          <div className="mb-4 border-b pb-4">
            <h3 className="text-lg font-bold mb-2">
              Order Items ({order.items.length})
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 border-b pb-3 last:border-b-0"
                >
                  {/* Food Image */}
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={getImagePath(item.foodItemId.image)}
                      alt={item.foodItemId.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  {/* Food Info */}
                  <div className="flex-grow">
                    <p className="font-medium">{item.foodItemId.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.foodItemId.description}
                    </p>
                  </div>
                  {/* Quantity & Price */}
                  <div className="text-right">
                    <p className="font-semibold">{item.quantity}x</p>
                    <p className="text-orange-600">
                      {item.foodItemId.price.toLocaleString()} VND
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="mb-2">
            <h3 className="text-lg font-bold mb-2">Payment</h3>
            <p className="font-semibold">
              Food Total:{" "}
              <span className="font-normal">
                {order.totalFoodPrice.toLocaleString()} VND
              </span>
            </p>
            <p className="font-semibold">
              Shipping Cost:{" "}
              <span className="font-normal">
                {order.shippingCost.toLocaleString()} VND
              </span>
            </p>
            <p className="font-semibold text-lg">
              Total Price:{" "}
              <span className="font-bold text-orange-600">
                {order.totalPrice.toLocaleString()} VND
              </span>
            </p>
          </div>

          {/* Note */}
          {order.note && (
            <div className="mt-4 bg-gray-50 p-3 rounded-md">
              <p className="font-semibold">Note:</p>
              <p className="italic">"{order.note}"</p>
            </div>
          )}
        </div>

        <div className="border-t p-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;
