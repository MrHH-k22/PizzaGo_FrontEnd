import React, { useState, useEffect } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import "./UpdateOrderStatus.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setOrders(mockOrders);
      } catch (err) {
        setError(err.message || "Could not fetch orders. Please try again.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleViewDetails = (orderId) => {
    const orderToShow = orders.find((order) => order.id === orderId);
    if (orderToShow) {
      setSelectedOrder(orderToShow);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    setOrders((prevOrders) =>
      [...prevOrders].sort((a, b) => {
        if (order === "asc") {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      })
    );
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchQuery) ||
      order.id.toLowerCase().includes(searchQuery)
  );

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
      {/* Search Bar */}
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p>No active orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                Order ID <FontAwesomeIcon icon={faSort} />
              </th>
              <th onClick={() => handleSort("customerName")}>
                Customer Name <FontAwesomeIcon icon={faSort} />
              </th>
              <th>Delivery Address / Note</th>
              <th onClick={() => handleSort("status")}>
                Status <FontAwesomeIcon icon={faSort} />
              </th>
              <th>Items</th>
              <th onClick={() => handleSort("totalBill")}>
                Total Bill <FontAwesomeIcon icon={faSort} />
              </th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.deliveryAddress}</td>
                <td>
                  <select
                    className={`status-select status-${order.status
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
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
                  <button
                    className="icon-button"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <OrderDetailsModal order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  );
}

export default UpdateOrderStatus;
