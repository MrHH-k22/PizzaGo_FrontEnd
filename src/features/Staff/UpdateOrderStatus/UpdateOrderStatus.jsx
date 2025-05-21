import React, { useState, useEffect } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import "./UpdateOrderStatus.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import useGetOrders from "../../../hooks/useGetOrders";
import useUpdateStatusOrder from "../../../hooks/useUpdateStatusOrder";
import LoadindSpinner from "../../../components/LoadingSpinner";
function UpdateOrderStatus() {
  const { listorders, isLoading } = useGetOrders();
  const [orders, setOrders] = useState(isLoading ? [] : listorders);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const { updateStatusOrder } = useUpdateStatusOrder();
  console.log(orders);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    if (!isLoading && listorders) {
      const transformedOrders = listorders.map((order) => ({
        id: order._id,
        customerName: order.customerId?.name || "Guest",
        deliveryAddress: order.deliveryAddress,
        status: capitalizeFirstLetter(order.status || "pending"),
        itemCount: order.items?.length || 0,
        totalBill: order.totalPrice || 0,
        items: order.items || [],
        note: order.note || "",
        createdAt: new Date(order.createdAt).toLocaleString(),
        updatedAt: new Date(order.updatedAt).toLocaleString(),
      }));
      setOrders(transformedOrders);
    }
  }, [listorders, isLoading]);
  if (isLoading) {
    return <LoadindSpinner message="Loading users..." />;
  }

  const handleStatusChange = (orderId, newStatus) => {
    // Cập nhật trạng thái cục bộ ngay lập tức để UI phản hồi nhanh
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    // Gọi API để cập nhật status trên server
    updateStatusOrder(
      { orderId, newStatus },
    );
  };

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

  const filteredOrders = orders.filter((order) =>
  (order.customerName?.toLowerCase().includes(searchQuery) ||
    order.id?.toLowerCase().includes(searchQuery))
  );

  console.log("filteredOrders", filteredOrders);

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
              <th>Created At</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>
                  {order.deliveryAddress}
                  {order.note && (
                    <div className="order-note">
                      <strong>Note:</strong> {order.note}
                    </div>
                  )}
                </td>
                <td>
                  <select
                    className={`status-select status-${order.status
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    value={order.status.toLowerCase()}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="delivering">Delivering</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="center-text">{order.itemCount}</td>
                <td className="right-text">${order.totalBill.toFixed(2)}</td>

                <td>{order.createdAt}</td>
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
