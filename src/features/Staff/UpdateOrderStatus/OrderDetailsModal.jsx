import React from "react";
import { getImagePath } from "../../../utils/helpers";

function OrderDetailsModal({ order, onClose }) {
  // If no order is provided, don't render the modal
  if (!order) {
    return null;
  }
  console.log("Order data for modal:", order);
  // Function to get status color based on order status
  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-blue-500";
      case "delivering":
        return "bg-purple-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-white/75 dark:bg-gray-800/75 flex items-center justify-center modal-overlay"
      onClick={onClose}
    >
      {/* The Modal Content (prevents closing when clicking inside) */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          Order Details - {order.id}
        </h3>

        {/* Items List */}
        <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-700">
          Items Ordered:
        </h4>
        <ul className="space-y-4 mb-6">
          {order.items && order.items.length > 0 ? (
            order.items.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={getImagePath(item.foodItemId.image)}
                    alt={item.foodItemId.name}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {item.foodItemId.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-gray-700">
                  {Number(item.foodItemId.price * item.quantity).toLocaleString(
                    "vi-VN"
                  )}{" "}
                  VND
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic text-center py-4">
              No items found for this order.
            </li>
          )}
        </ul>

        {/* Order Summary Information */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mt-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-700">
            Order Summary:
          </h4>
          <div className="space-y-2">
            <p className="flex flex-wrap justify-between">
              <strong className="text-gray-700">Customer:</strong>
              <span className="text-gray-800">{order.customerName}</span>
            </p>
            {order.customerEmail && (
              <p className="flex flex-wrap justify-between">
                <strong className="text-gray-700">Email:</strong>
                <span className="text-gray-800">{order.customerEmail}</span>
              </p>
            )}
            <p className="flex flex-wrap justify-between">
              <strong className="text-gray-700">Delivery Address:</strong>
              <span className="text-gray-800">{order.deliveryAddress}</span>
            </p>
            <p className="flex flex-wrap justify-between">
              <strong className="text-gray-700">Customer Note:</strong>
              <span className="text-gray-800">{order.note}</span>
            </p>
            {order.shippingMethod && (
              <p className="flex flex-wrap justify-between">
                <strong className="text-gray-700">Shipping Method:</strong>
                <span className="text-gray-800">{order.shippingMethod}</span>
              </p>
            )}
            <p className="flex flex-wrap justify-between items-center">
              <strong className="text-gray-700">Status:</strong>
              <span
                className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}
              >
                {order.status}
              </span>
            </p>
            {order.totalFoodPrice !== undefined && (
              <p className="flex flex-wrap justify-between">
                <strong className="text-gray-700">Food Total:</strong>
                <span className="text-gray-800">
                  {Number(order.totalFoodPrice).toLocaleString("vi-VN")} VND
                </span>
              </p>
            )}
            {order.shippingCost !== undefined && (
              <p className="flex flex-wrap justify-between">
                <strong className="text-gray-700">Shipping Cost:</strong>
                <span className="text-gray-800">
                  {Number(order.shippingCost).toLocaleString("vi-VN")} VND
                </span>
              </p>
            )}
            <p className="flex flex-wrap justify-between">
              <strong className="text-gray-700">Total Bill:</strong>
              <span className="text-gray-800 font-bold">
                {Number(order.totalBill).toLocaleString("vi-VN")} VND
              </span>
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
