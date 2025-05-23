import React, { useState } from "react";
import { Plus } from "lucide-react";
import AddAccountModal from "./AddAccountModal";
import SearchBar from "../../../components/SearchBar";
import Pagination from "../../../components/Pagination";
import UserTable from "../../../components/UserTable";
import HeaderManager from "../../../components/HeaderManager";
import useGetUsers from "../../../hooks/useGetUsers";
import LoadindSpinner from "../../../components/LoadingSpinner";
import useAddUser from "../../../hooks/useAddUser";
import useEditUser from "../../../hooks/useEditUser";
import useDeleteUser from "../../../hooks/useDeleteUser";
function ManageUsers() {
  const { listUsers, isLoading, isError, error } = useGetUsers("Customer");
  
  const [users, setUsers] = useState(isLoading ? [] : listUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { addNewUser, isAddingUser } = useAddUser();
  const { editUserMutation, isEditingUser } = useEditUser();
  const { deleteUserMutation, isDeletingUser } = useDeleteUser();
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  React.useEffect(() => {
    if (!isLoading && listUsers) {
      setUsers(listUsers);
    }
  }, [listUsers, isLoading]);
  if (isLoading) {
    return <LoadindSpinner message="Loading users..." />;
  }
  const handleAddUser = (newUser) => {
    // console.log(newUser);
    if (newUser) {
      const userWithRole = {
        ...newUser,
        role: "Customer"
      };
      addNewUser(userWithRole);
    }
  };

  const handleEditUser = (updatedUser) => {
    // console.log(updatedUser);
    if (updatedUser) {
      editUserMutation(updatedUser);
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingUser(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    // console.log("Delete user with ID:", userId);
    if (userId) {
      const currentItemCount = filteredUsers.length;
      const isLastItemOnPage =
        currentItemCount > 0 &&
        indexOfFirstUser + 1 === currentItemCount &&
        currentItemCount % itemsPerPage === 1;
      deleteUserMutation(userId, {
        onSuccess: () => {
          if (isLastItemOnPage && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user._id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <HeaderManager
          title="Manage Users"
          description="Add, edit, or delete users from the system."
          buttonText="Add New User"
          buttonIcon={Plus}
          onButtonClick={openAddModal}
        />

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <SearchBar 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Search users by name, email, or address..."
          />
        </div>
        
        {/* User Table */}
        <UserTable 
          users={currentUsers} 
          onEdit={openEditModal} 
          onDelete={handleDeleteUser}
          onAdd={openAddModal}
        />
        
        {/* Pagination */}
        {filteredUsers.length > itemsPerPage && (
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
          {users.length > 0 && (
            <p>Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users (Total: {users.length})</p>
          )}
        </div>
      </div>
      
      {/* Modal */}
      <AddAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddAccount={handleAddUser}
        onEditAccount={handleEditUser}
        initialData={editingUser}
        isEditMode={isEditMode}
      />
    </div>
  );
}

export default ManageUsers;