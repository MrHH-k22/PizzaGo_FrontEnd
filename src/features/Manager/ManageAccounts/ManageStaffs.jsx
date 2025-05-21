import React, { useState } from "react";
import { Plus } from "lucide-react";
import AddAccountModal from "./AddAccountModal";
import SearchBar from "../../../components/SearchBar";
import Pagination from "../../../components/Pagination";
import StaffTable from "../../../components/StaffTable";
import HeaderManager from "../../../components/HeaderManager";
import useGetUsers from "../../../hooks/useGetUsers";
import LoadindSpinner from "../../../components/LoadingSpinner";
import useAddUser from "../../../hooks/useAddUser";
import useEditUser from "../../../hooks/useEditUser";
import useDeleteUser from "../../../hooks/useDeleteUser";


function ManageStaffs() {
  const { listUsers, isLoading, isError, error } = useGetUsers("Staff");
  const [staff, setStaff] = useState(isLoading ? [] : listUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { addNewUser, isAddingUser } = useAddUser();
  const { editUserMutation, isEditingUser } = useEditUser();
  const { deleteUserMutation, isDeletingUser } = useDeleteUser();
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  React.useEffect(() => {
    if (!isLoading && listUsers) {
      setStaff(listUsers);
    }
  }, [listUsers, isLoading]);
  if (isLoading) {
    return <LoadindSpinner message="Loading users..." />;
  }
  const handleAddStaff = (newStaff) => {
    if (newStaff) {
      const userWithRole = {
        ...newStaff,
        role: "Staff"
      };
      addNewUser(userWithRole);
    }
  };

  const handleEditStaff = (updatedStaff) => {
    if (updatedStaff) {
      editUserMutation(updatedStaff);
    }
  };

  const openEditModal = (member) => {
    setEditingStaff(member);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingStaff(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleDeleteStaff = (staffId) => {
    if (staffId) {
      const currentItemCount = filteredStaff.length;
      const isLastItemOnPage =
        currentItemCount > 0 &&
        indexOfFirstStaff + 1 === currentItemCount &&
        currentItemCount % itemsPerPage === 1;
      deleteUserMutation(staffId, {
        onSuccess: () => {
          if (isLastItemOnPage && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }
      });
    }
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastStaff = currentPage * itemsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - itemsPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff);
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <HeaderManager
          title="Manage Staff"
          buttonText="Add New Staff"
          buttonIcon={Plus}
          onButtonClick={openAddModal}
        />

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search staff by name, email, role, or address..."
          />
        </div>

        {/* Staff Table */}
        <StaffTable
          staff={currentStaff}
          onEdit={openEditModal}
          onDelete={handleDeleteStaff}
          onAdd={openAddModal}
        />

        {/* Pagination */}
        {filteredStaff.length > itemsPerPage && (
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
          {staff.length > 0 && (
            <p>Showing {indexOfFirstStaff + 1}-{Math.min(indexOfLastStaff, filteredStaff.length)} of {filteredStaff.length} staff members (Total: {staff.length})</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <AddAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddAccount={handleAddStaff}
        onEditAccount={handleEditStaff}
        initialData={editingStaff}
        isEditMode={isEditMode}
      />
    </div>
  );
}

export default ManageStaffs;