import React, { useState } from "react";
import "./ManageAccounts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddAccountModal from "./AddAccountModal";

// Mock data for users
const mockUsers = [
  {
    id: "USR001",
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    address: "123 Đường ABC, Quận 1, TP. HCM",
  },
  {
    id: "USR002",
    fullName: "Trần Thị B",
    email: "tranthib@example.com",
    address: "456 Hẻm XYZ, Quận Bình Thạnh, TP. HCM",
  },
  {
    id: "USR003",
    fullName: "Lê Hoàng C",
    email: "lehoangc@example.com",
    address: "789 Chung cư Z, Quận 7, TP. HCM",
  },
];

function ManageAccounts() {
  const [users, setUsers] = useState(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, { id: `USR${prev.length + 1}`, ...newUser }]);
  };

  const handleEditUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="manage-accounts-container">
      <div className="header">
        <h2>Manage Accounts</h2>
        <button className="add-button" onClick={openAddModal}>
          <FontAwesomeIcon icon={faPlus} /> Add New Account
        </button>
      </div>
      <table className="accounts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td className="actions">
                <button
                  className="edit-button"
                  onClick={() => openEditModal(user)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default ManageAccounts;
