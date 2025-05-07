import React from "react";
import "./OrderDetailsModal.css"; // We'll create this CSS file next

function OrderDetailsModal({ order, onClose }) {
  // If no order is provided, don't render the modal
  if (!order) {
    return null;
  }

  return (
    // The Modal Backdrop (covers the whole screen)
    <div className="modal-overlay" onClick={onClose}>
      {/* The Modal Content (prevents closing when clicking inside) */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Order Details - {order.id}</h3>

        {/* Items List */}
        <h4>Items Ordered:</h4>
        <ul className="modal-items-list">
          {order.items && order.items.length > 0 ? (
            order.items.map((item) => (
              <li key={item.id} className="modal-item">
                <img
                  src={item.imageUrl || "/images/placeholder.png"} // Use a placeholder if no image
                  alt={item.name}
                  className="modal-item-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder.png";
                  }} // Fallback image on error
                />
                <div className="modal-item-info">
                  <span className="modal-item-name">{item.name}</span>
                  <span className="modal-item-quantity">
                    Quantity: {item.quantity}
                  </span>
                </div>
                <span className="modal-item-price">
                  {item.unitPrice.toLocaleString("vi-VN")} đ
                </span>
              </li>
            ))
          ) : (
            <li>No items found for this order.</li>
          )}
        </ul>

        {/* Order Summary Information */}
        <div className="modal-order-summary">
          <h4>Order Summary:</h4>
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>
          <p>
            <strong>Delivery Address:</strong> {order.deliveryAddress}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`status-badge status-${order.status.toLowerCase().replace(/ /g, "-")}`}
            >
              {order.status}
            </span>
          </p>
          <p>
            <strong>Total Bill:</strong>{" "}
            {order.totalBill.toLocaleString("vi-VN")} đ
          </p>
        </div>

        {/* Close Button */}
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default OrderDetailsModal;
