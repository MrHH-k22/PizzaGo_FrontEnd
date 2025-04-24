import React, { useState, useEffect } from "react";
// Optional: Import CSS for styling
import "./UpdateOrderStatus.css"; // Create this file for styling

// --- Mock Data (Replace with API call) ---
// Simulates the kind of data you might get from your backend API
const mockOrders = [
  {
    id: "ORD1001",
    customerName: "Nguyễn Văn A",
    deliveryAddress: "123 Đường ABC, Quận 1, TP. HCM",
    status: "Confirmed", // e.g., Pending, Preparing, Delivering, Delivered, Cancelled
    itemCount: 3,
    totalBill: 250000, // Assuming VND or your currency
    // You might also include details like phone number, order items list, timestamp etc.
  },
  {
    id: "ORD1002",
    customerName: "Trần Thị B",
    deliveryAddress: "456 Hẻm XYZ, Quận Bình Thạnh, TP. HCM",
    status: "Pending",
    itemCount: 2,
    totalBill: 180000,
  },
  {
    id: "ORD1003",
    customerName: "Lê Hoàng C",
    deliveryAddress: "789 Chung cư Z, Quận 7, TP. HCM",
    status: "Delivering",
    itemCount: 5,
    totalBill: 420000,
  },
  {
    id: "ORD1004",
    customerName: "Phạm Minh D",
    deliveryAddress: "Pick up at store", // Example for pickup
    status: "Ready for Pickup",
    itemCount: 1,
    totalBill: 99000,
  },
];
// --- End Mock Data ---

function UpdateOrderStatus() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // --- Simulate API Call ---
    const fetchOrders = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        // TODO: Replace this setTimeout with your actual API fetch call
        // Example: const response = await fetch('/api/staff/orders?status=pending,preparing,delivering');
        // if (!response.ok) throw new Error('Failed to fetch orders');
        // const data = await response.json();
        // setOrders(data);

        // Simulating network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setOrders(mockOrders); // Using mock data for now
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Could not fetch orders. Please try again.");
        setOrders([]); // Clear orders on error
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleViewDetails = (orderId) => {
    // TODO: Implement logic to show order details
    // This could navigate to a new page, open a modal, etc.
    console.log(`Viewing details for Order ID: ${orderId}`);
    alert(`Implement details view for Order ID: ${orderId}`);
    // Example navigation (if using react-router-dom):
    // navigate(`/staff/orders/${orderId}`);
  };

  const handleStatusChange = (orderId, newStatus) => {
    // TODO: Implement API call to update the status on the backend
    console.log(`Updating status for Order ID: ${orderId} to ${newStatus}`);
    alert(`Implement status update for Order ID: ${orderId} to ${newStatus}`);

    // Optimistic UI Update (optional): Update local state immediately
    // Be sure to handle potential errors from the API call
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // --- Render Logic ---
  if (loading) {
    return (
      <div className="order-status-container loading">Loading orders...</div>
    );
  }

  if (error) {
    return <div className="order-status-container error">Error: {error}</div>;
  }

  return (
    <div className="order-status-container">
      <h2>Manage Customer Orders</h2>

      {orders.length === 0 ? (
        <p>No active orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Delivery Address / Note</th>
              <th>Status</th>
              <th>Items</th>
              <th>Total Bill</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.deliveryAddress}</td>
                <td>
                  {/* Example: Make status editable with a dropdown */}
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className={`status-select status-${order.status.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivering">Delivering</option>
                    <option value="Ready for Pickup">Ready for Pickup</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="center-text">{order.itemCount}</td>
                <td className="right-text">
                  {order.totalBill.toLocaleString("vi-VN")}{" "}
                  {/* Format currency */}
                </td>
                <td>
                  <button
                    className="details-button"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    Details
                  </button>
                  {/* You might add other actions here, like "Print Bill" */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UpdateOrderStatus;
