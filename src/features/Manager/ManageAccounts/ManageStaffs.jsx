import React, { useState } from "react";
import { Plus } from "lucide-react";
import AddAccountModal from "./AddAccountModal";
import SearchBar from "../../../components/SearchBar";
import Pagination from "../../../components/Pagination";
import StaffTable from "../../../components/StaffTable";
import HeaderManager from "../../../components/HeaderManager";

// Mock data for staff
const mockStaff = [
  {
    id: "STF001",
    fullName: "Phạm Thị D",
    email: "phamthid@pizzago.com",
    address: "234 Đường KLM, Quận 2, TP. HCM",
    role: "Chef",
  },
  {
    id: "STF002",
    fullName: "Võ Minh E",
    email: "vominhe@pizzago.com",
    address: "567 Đường NOP, Quận 3, TP. HCM",
    role: "Delivery",
  },
];

function ManageStaffs() {
  const [staff, setStaff] = useState(mockStaff);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  const handleAddStaff = (newStaff) => {
    setStaff((prev) => [...prev, { 
      id: `STF${String(prev.length + 1).padStart(3, '0')}`, 
      ...newStaff 
    }]);
  };

  const handleEditStaff = (updatedStaff) => {
    setStaff((prev) =>
      prev.map((member) => (member.id === updatedStaff.id ? updatedStaff : member))
    );
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff member?"
    );
    if (confirmDelete) {
      setStaff(staff.filter((member) => member.id !== staffId));
    }
  };
  
  const filteredStaff = staff.filter(member => 
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.role && member.role.toLowerCase().includes(searchTerm.toLowerCase()))
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
        onAddStaff={handleAddStaff}
        onEditStaff={handleEditStaff}
        initialData={editingStaff}
        isEditMode={isEditMode}
      />
    </div>
  );
}

export default ManageStaffs;