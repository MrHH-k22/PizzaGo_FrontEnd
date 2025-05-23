import { useState, useEffect } from "react";
import useGetOrdersByCustomerId from "../../hooks/useGetOrdersByCustomerId";
import { useAuth } from "../../hooks/useAuth";
import { BiDetail } from "react-icons/bi";
import OrderDetailsModal from "./OrderDetailsModal";
import Pagination from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSort } from "@fortawesome/free-solid-svg-icons";

function TrackOrder() {
  const { user } = useAuth();
  const {
    orders: fetchedOrders,
    isLoading,
    isError,
    error,
  } = useGetOrdersByCustomerId(user?.id);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search and sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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

  // Update orders when fetched
  useEffect(() => {
    if (!isLoading && fetchedOrders) {
      setOrders(fetchedOrders);
    }
  }, [fetchedOrders, isLoading]);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Search handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on search
  };

  // Sort handler
  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  // Page change handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading)
    return (
      <div className="container mx-auto py-6 text-center">
        Loading orders...
      </div>
    );
  if (isError)
    return (
      <div className="container mx-auto py-6 text-center text-red-500">
        Error: {error.message}
      </div>
    );

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchQuery) ||
      order.status.toLowerCase().includes(searchQuery)
  );

  // Sort orders if sort field is set
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    // Special handling for dates
    if (sortField === "createdAt") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Track Your Orders</h1>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Order ID or Status"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {currentOrders && currentOrders.length > 0 ? (
        <div className="grid gap-4">
          {/* Sort options */}
          <div className="flex justify-end mb-2 text-sm text-gray-600">
            <span
              className="mr-4 cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              Sort by Date{" "}
              {sortField === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
              <FontAwesomeIcon icon={faSort} className="ml-1" />
            </span>
            <span
              className="mr-4 cursor-pointer"
              onClick={() => handleSort("totalPrice")}
            >
              Sort by Price{" "}
              {sortField === "totalPrice" && (sortOrder === "asc" ? "↑" : "↓")}
              <FontAwesomeIcon icon={faSort} className="ml-1" />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Sort by Status{" "}
              {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
              <FontAwesomeIcon icon={faSort} className="ml-1" />
            </span>
          </div>

          {currentOrders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">
                    Order ID:{" "}
                    <span className="font-normal">{order._id.slice(-8)}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()} |{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">
                    {order.totalPrice.toLocaleString()} VND
                  </p>
                  <p
                    className={`inline-block px-2 py-1 text-xs rounded-full text-white ${getStatusColor(order.status)}`}
                  >
                    {order.status.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t">
                <p className="text-sm text-gray-500">
                  {order.items.length} items
                </p>
                <button
                  onClick={() => openModal(order)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <BiDetail className="mr-1" size={18} />
                  View Details
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {filteredOrders.length > itemsPerPage && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {/* Footer info */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              Showing {indexOfFirstOrder + 1}-
              {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No orders found.</p>
      )}

      {isModalOpen && selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  );
}

export default TrackOrder;
