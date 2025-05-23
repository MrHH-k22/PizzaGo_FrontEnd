import React, { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";

function AddItemModal({
  isOpen,
  onClose,
  onAddItem,
  onEditItem,
  initialData,
  isEditMode,
  categories
}) {
  const [defaultData, setDefaultData] = useState({
    name: "",
    description: "",
    price: "",
    category: categories[0] || "Pizza",
    image: null,
    imagePreview: null
  });
  
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isEditMode && initialData) {
      setDefaultData({
        ...initialData,
        imagePreview: initialData.image ? 
          (initialData.image.startsWith('http') ? initialData.image : null) : null
      });
    } else {
      setDefaultData({
        name: "",
        description: "",
        price: "",
        category: categories[0] || "Pizza",
        image: null,
        imagePreview: null
      });
    }
  }, [isEditMode, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    
    // Create a data object for submission
    const data = {};
    for (const [key, value] of formData.entries()) {
      // Skip empty image if in edit mode and no new image selected
      if (key === 'image' && value.size === 0 && isEditMode) continue;
      data[key] = key === 'price' ? parseFloat(value) : value;
    }

    if (isEditMode) {
      onEditItem({ ...defaultData, ...data });
    } else {
      onAddItem(data);
    }

    form.reset();
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };
  
  const processFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDefaultData(prev => ({
          ...prev,
          imagePreview: reader.result,
          image: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
      // Update the file input element value programmatically
      const fileInput = document.getElementById('image-upload');
      if (fileInput) {
        // Create a DataTransfer object to set files
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isEditMode ? "Edit Food Item" : "Add New Food Item"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Text fields */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={defaultData.name}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter food item name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={defaultData.description}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter food item description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      defaultValue={defaultData.price}
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-7 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={defaultData.category.name}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                  >
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Right column - Image upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Food Item Image
              </label>
              <div 
                className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-all h-64
                  ${isDragging 
                    ? "border-orange-500 bg-orange-50 dark:bg-gray-700/40" 
                    : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/20"} 
                  ${defaultData.imagePreview ? "p-3" : "p-6"}
                  cursor-pointer group
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('image-upload').click()}
              >
                {defaultData.imagePreview ? (
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <img 
                      src={defaultData.imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-contain rounded-md shadow-sm transition-transform group-hover:scale-[1.02]" 
                    />
                    {/* Overlay - made more transparent and with better hover states */}
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-all flex items-center justify-center">
                      <div className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                        <Upload size={20} className="text-orange-500" />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDefaultData(prev => ({ ...prev, imagePreview: null, image: null }))
                      }}
                      className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 rounded-full p-1.5 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors z-10"
                    >
                      <X size={14} className="text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-3 rounded-full bg-orange-50 dark:bg-gray-700 flex items-center justify-center transition-transform group-hover:scale-110">
                      <ImageIcon className="w-8 h-8 text-orange-500" />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Drag and drop an image
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      or <span className="text-orange-500 font-medium">browse files</span>
                    </span>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      PNG, JPG or WEBP (max 5MB)
                    </p>
                  </div>
                )}
                
                <input
                  type="file"
                  name="image"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              
              {/* Mobile optimized file input - styled version */}
              <div className="mt-3 sm:hidden">
                <label 
                  htmlFor="mobile-image-upload"
                  className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
                >
                  <Upload size={16} className="mr-2" />
                  Select image
                </label>
                <input
                  id="mobile-image-upload"
                  type="file"
                  name="image-mobile"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {isEditMode ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;