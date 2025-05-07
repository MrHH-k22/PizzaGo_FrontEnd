import React, { useState, useEffect } from "react";

import OrderDetailsModal from "./OrderDetailsModal";

// Optional: Import CSS for styling
import "./UpdateOrderStatus.css";

// --- Mock Data (Replace with API call) ---
// Simulates the kind of data you might get from your backend API
const mockOrders = [
  {
    id: "ORD1001",
    customerName: "Nguyễn Văn A",
    deliveryAddress: "123 Đường ABC, Quận 1, TP. HCM",
    status: "Confirmed",
    itemCount: 3,
    totalBill: 250000,
    items: [
      {
        id: "PZ001",
        name: "Pizza Hải Sản Pesto Xanh",
        quantity: 1,
        unitPrice: 149000,
        imageUrl: "/images/ExamplePizza.png",
      }, // Add actual image paths
      {
        id: "SD002",
        name: "Khoai tây chiên",
        quantity: 1,
        unitPrice: 35000,
        imageUrl: "/images/fries.jpg",
      },
      {
        id: "DR001",
        name: "Coca-Cola Lon",
        quantity: 1,
        unitPrice: 15000,
        imageUrl: "/images/coke.jpg",
      },
    ],
  },
  {
    id: "ORD1002",
    customerName: "Trần Thị B",
    deliveryAddress: "456 Hẻm XYZ, Quận Bình Thạnh, TP. HCM",
    status: "Pending",
    itemCount: 2,
    totalBill: 180000,
    items: [
      {
        id: "PZ005",
        name: "Pizza Bò Băm",
        quantity: 1,
        unitPrice: 125000,
        imageUrl: "/images/pizza-beef.jpg",
      },
      {
        id: "SD005",
        name: "Salad Trộn Dầu Giấm",
        quantity: 1,
        unitPrice: 55000,
        imageUrl: "/images/salad.jpg",
      },
    ],
  },
  {
    id: "ORD1003",
    customerName: "Lê Hoàng C",
    deliveryAddress: "789 Chung cư Z, Quận 7, TP. HCM",
    status: "Delivering",
    itemCount: 5, // Example has 2 items, adjust if needed
    totalBill: 420000, // Example has 2 items, adjust if needed
    items: [
      {
        id: "PZ001",
        name: "Pizza Hải Sản Pesto Xanh",
        quantity: 2,
        unitPrice: 149000,
        imageUrl: "/images/pizza-pesto.jpg",
      },
      {
        id: "PZ003",
        name: "Pizza Gà Nướng Nấm",
        quantity: 1,
        unitPrice: 135000,
        imageUrl: "/images/pizza-chicken-mushroom.jpg",
      },
      // Add more items if itemCount is 5
    ],
  },
  {
    id: "ORD1004",
    customerName: "Phạm Minh D",
    deliveryAddress: "Pick up at store",
    status: "Ready for Pickup",
    itemCount: 1,
    totalBill: 99000,
    items: [
      {
        id: "PZ007",
        name: "Pizza Phô Mai",
        quantity: 1,
        unitPrice: 99000,
        imageUrl: "/images/pizza-cheese.jpg",
      },
    ],
  },
];
// --- End Mock Data ---

function UpdateOrderStatus() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- State for modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // <-- State for selected order data

  useEffect(() => {
    // ... (fetchOrders function remains the same)
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate fetch
        // Add default imageUrl if missing in mock data for safety
        const ordersWithImages = mockOrders.map((order) => ({
          ...order,
          items: order.items.map((item) => ({
            ...item,
            imageUrl: item.imageUrl || "/images/placeholder.png",
          })),
        }));
        setOrders(ordersWithImages);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Could not fetch orders. Please try again.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // --- Modal Handling ---
  const handleViewDetails = (orderId) => {
    const orderToShow = orders.find((order) => order.id === orderId);
    if (orderToShow) {
      setSelectedOrder(orderToShow);
      setIsModalOpen(true);
    } else {
      console.error("Could not find order details for ID:", orderId);
      // Optionally show an error message to the user
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null); // Clear selected order when closing
  };
  // --- End Modal Handling ---

  const handleStatusChange = (orderId, newStatus) => {
    // ... (status change logic remains the same)
    console.log(`Updating status for Order ID: ${orderId} to ${newStatus}`);
    alert(`Implement status update for Order ID: ${orderId} to ${newStatus}`);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // --- Render Logic ---
  if (loading) {
    // ... loading state ...
    return (
      <div className="order-status-container loading">Loading orders...</div>
    );
  }

  if (error) {
    // ... error state ...
    return <div className="order-status-container error">Error: {error}</div>;
  }

  return (
    <div className="order-status-container">
      <h2>Manage Customer Orders</h2>

      {orders.length === 0 ? (
        <p>No active orders found.</p>
      ) : (
        <table className="orders-table">
          {/* ... (thead remains the same) ... */}
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
                {/* ... (other tds remain the same) ... */}
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.deliveryAddress}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className={`status-select status-${order.status.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {/* ... options ... */}
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Ready for Pickup">Ready for Pickup</option>
                    <option value="Delivering">Delivering</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="center-text">{order.itemCount}</td>
                <td className="right-text">
                  {order.totalBill.toLocaleString("vi-VN")}
                </td>
                <td>
                  {/* Button now calls handleViewDetails */}
                  <button
                    className="details-button"
                    onClick={() => handleViewDetails(order.id)} // <-- Updated onClick
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Render the Modal Conditionally */}
      {isModalOpen && (
        <OrderDetailsModal order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  );
}

export default UpdateOrderStatus;
