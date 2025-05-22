import React, { useState, useEffect } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import useGetOrders from "../../../hooks/useGetOrders";
import useUpdateStatusOrder from "../../../hooks/useUpdateStatusOrder";
import LoadindSpinner from "../../../components/LoadingSpinner";
import Pagination from "../../../components/Pagination";

function UpdateOrderStatus() {
  const { listorders, isLoading } = useGetOrders();
  const [orders, setOrders] = useState(isLoading ? [] : listorders);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const { updateStatusOrder } = useUpdateStatusOrder();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

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
    return <LoadindSpinner message="Loading orders..." />;
  }

  const handleStatusChange = (orderId, newStatus) => {
    // Update local state for immediate UI response
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: capitalizeFirstLetter(newStatus) }
          : order
      )
    );

    // Call API to update status on server
    updateStatusOrder({ orderId, newStatus });
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
    setCurrentPage(1); // Reset to first page on search
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
      order.customerName?.toLowerCase().includes(searchQuery) ||
      order.id?.toLowerCase().includes(searchQuery)
  );

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">
        Error: {error}
      </div>
    );
  }

  // Define status badge colors
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
    <div className="bg-gray-50 min-h-screen p-6 w-full">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Manage Orders
          </h1>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by Order ID or Customer Name"
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {currentOrders.length === 0 ? (
            <p className="p-6 text-center text-gray-500">
              No active orders found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      onClick={() => handleSort("id")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                      Order ID <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th
                      onClick={() => handleSort("customerName")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                      Customer Name <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery Address / Note
                    </th>
                    <th
                      onClick={() => handleSort("status")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                      Status <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th
                      onClick={() => handleSort("totalBill")}
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                      Total Bill <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div>{order.deliveryAddress}</div>
                        {order.note && (
                          <div className="mt-1 text-xs italic text-gray-500">
                            <span className="font-semibold">Note:</span>{" "}
                            {order.note}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative inline-block w-full">
                          <select
                            className={`appearance-none w-full ${getStatusColor(order.status)} text-white text-sm rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            value={order.status.toLowerCase()}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            style={{
                              backgroundImage:
                                'url(\'data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                              backgroundPosition: "right 0.5rem center",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <option
                              value="pending"
                              className="bg-white text-gray-900"
                            >
                              Pending
                            </option>
                            <option
                              value="confirmed"
                              className="bg-white text-gray-900"
                            >
                              Confirmed
                            </option>
                            <option
                              value="delivering"
                              className="bg-white text-gray-900"
                            >
                              Delivering
                            </option>
                            <option
                              value="completed"
                              className="bg-white text-gray-900"
                            >
                              Completed
                            </option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                        {order.itemCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                        {Number(order.totalBill).toLocaleString("vi-VN")} VND
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleViewDetails(order.id)}
                          className="text-blue-600 hover:text-blue-800 focus:outline-none text-sm"
                          title="View Details"
                        >
                          <FontAwesomeIcon icon={faInfoCircle} size="lg" />{" "}
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > itemsPerPage && (
          <div className="mt-6 mb-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-500">
          {orders.length > 0 && (
            <p>
              Showing {indexOfFirstOrder + 1}-
              {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders (Total: {orders.length})
            </p>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && (
        <OrderDetailsModal order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  );
}

export default UpdateOrderStatus;
