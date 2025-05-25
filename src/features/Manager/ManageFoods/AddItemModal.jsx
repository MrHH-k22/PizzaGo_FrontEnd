import React, { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon, Trash2, Plus, Minus } from "lucide-react";
import { getImagePath } from "../../../utils/helpers"; // Adjust the import path as necessary

function AddItemModal({
    isOpen,
    onClose,
    onAddItem,
    onEditItem,
    onDeleteItem,
    initialData,
    isEditMode,
    categories,
}) {
    const [defaultData, setDefaultData] = useState({
        name: "",
        description: "",
        price: "",
        category: categories[0] || "Pizza",
        image: null,
        imagePreview: null,
        pizzaBase: "",
        sauce: "",
        toppings: [""],
        vegetables: [""]
    });

    const [isDragging, setIsDragging] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(
        initialData?.category?.name || categories[0]?.name || ""
    );

    useEffect(() => {
        if (isEditMode && initialData) {
            let imagePreviewUrl = null;
            if (initialData.image) {
                if (initialData.image.startsWith('http') || initialData.image.startsWith('/')) {
                    imagePreviewUrl = initialData.image;
                } else {
                    imagePreviewUrl = getImagePath ? getImagePath(initialData.image) : initialData.image;
                }
            }

            // Force a complete reset of the state with the new item data
            setDefaultData({
                ...initialData,
                imagePreview: imagePreviewUrl,
                // Set default values for pizza fields if they don't exist
                pizzaBase: initialData.pizzaBase || "",
                sauce: initialData.sauce || "",
                toppings: initialData.toppings || [""],
                vegetables: initialData.vegetables || [""]
            });

            setSelectedCategory(initialData.category?.name || "");
        } else {
            setDefaultData({
                name: "",
                description: "",
                price: "",
                category: categories[0] || "Pizza",
                image: null,
                imagePreview: null,
                pizzaBase: "",
                sauce: "",
                toppings: [""],
                vegetables: [""]
            });

            setSelectedCategory(categories[0]?.name || "");
        }
    }, [isEditMode, initialData, categories]);

    const handleCategoryChange = (e) => {
        const categoryName = e.target.options[e.target.selectedIndex].text;
        setSelectedCategory(categoryName.toLowerCase());
    };

    const handleArrayFieldChange = (field, index, value) => {
        setDefaultData(prev => {
            const newArray = [...prev[field]];
            newArray[index] = value;
            return { ...prev, [field]: newArray };
        });
    };

    const addArrayField = (field) => {
        setDefaultData(prev => ({
            ...prev,
            [field]: [...prev[field], ""]
        }));
    };

    const removeArrayField = (field, index) => {
        setDefaultData(prev => {
            const newArray = [...prev[field]];
            newArray.splice(index, 1);
            return { ...prev, [field]: newArray.length ? newArray : [""] };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {};

        // Process basic fields
        for (const [key, value] of formData.entries()) {
            // Skip array fields and pizza-specific fields (we'll handle them separately)
            if (
                ['toppings[]', 'vegetables[]', 'pizzaBase', 'sauce'].includes(key) ||
                (key === 'image' && value.size === 0 && isEditMode)
            ) continue;
            
            data[key] = key === 'price' ? parseFloat(value) : value;
        }

        // Add pizza-specific fields if the category is pizza
        if (selectedCategory === 'pizza') {
            data.pizzaBase = formData.get('pizzaBase');
            data.sauce = formData.get('sauce');
            data.toppings = defaultData.toppings.filter(item => item.trim() !== '');
            data.vegetables = defaultData.vegetables.filter(item => item.trim() !== '');
        }

        if (isEditMode) {
            onEditItem({ ...defaultData, ...data });
        } else {
            onAddItem(data);
        }

        e.target.reset();
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl transform transition-all max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {isEditMode ? "Edit Food Item" : "Add New Food Item"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
                        type="button"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form className="p-5" onSubmit={handleSubmit}>
                    {/* Main content area with conditional layout */}
                    <div className={`grid ${selectedCategory === 'pizza' ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                        {/* Left column - Basic fields (1/3 width for pizza, 1/2 for others) */}
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={defaultData.name}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
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
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter food item description"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Price
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">VND</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="price"
                                            defaultValue={defaultData.price}
                                            required
                                            min="0"
                                            step="0.01"
                                            className="w-full pl-14 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
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
                                        defaultValue={defaultData.category._id}
                                        required
                                        onChange={handleCategoryChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        {categories.map(category => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Middle column - Pizza-specific fields (only shows for pizza category) */}
                        {selectedCategory === 'pizza' && (
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Pizza Base
                                        </label>
                                        <input
                                            type="text"
                                            name="pizzaBase"
                                            value={defaultData.pizzaBase}
                                            onChange={(e) => setDefaultData(prev => ({...prev, pizzaBase: e.target.value}))}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="Thin crust, Thick crust"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Sauce
                                        </label>
                                        <input
                                            type="text"
                                            name="sauce"
                                            value={defaultData.sauce}
                                            onChange={(e) => setDefaultData(prev => ({...prev, sauce: e.target.value}))}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="Tomato, BBQ"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-3">
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Toppings
                                            </label>
                                            <button 
                                                type="button" 
                                                onClick={() => addArrayField('toppings')}
                                                className="p-1 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                                            {defaultData.toppings.map((topping, index) => (
                                                <div key={`topping-${index}`} className="flex items-center">
                                                    <input
                                                        type="text"
                                                        name={`toppings[]`}
                                                        value={topping}
                                                        onChange={(e) => handleArrayFieldChange('toppings', index, e.target.value)}
                                                        className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                                        placeholder="Cheese, Pepperoni"
                                                        required={index === 0}
                                                    />
                                                    {defaultData.toppings.length > 1 && (
                                                        <button 
                                                            type="button" 
                                                            onClick={() => removeArrayField('toppings', index)}
                                                            className="ml-2 p-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Vegetables (Optional)
                                            </label>
                                            <button 
                                                type="button" 
                                                onClick={() => addArrayField('vegetables')}
                                                className="p-1 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                                            {defaultData.vegetables.map((vegetable, index) => (
                                                <div key={`vegetable-${index}`} className="flex items-center">
                                                    <input
                                                        type="text"
                                                        name={`vegetables[]`}
                                                        value={vegetable}
                                                        onChange={(e) => handleArrayFieldChange('vegetables', index, e.target.value)}
                                                        className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                                        placeholder="Mushrooms, Bell Peppers"
                                                    />
                                                    {defaultData.vegetables.length > 1 && (
                                                        <button 
                                                            type="button" 
                                                            onClick={() => removeArrayField('vegetables', index)}
                                                            className="ml-2 p-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Right column - Image upload */}
                        <div className={selectedCategory === 'pizza' ? "col-span-1" : "col-span-1"}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Food Item Image
                            </label>
                            <div
                                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-all h-[300px]
                                  ${isDragging
                                      ? "border-orange-500 bg-orange-50 dark:bg-gray-700/40"
                                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/20"} 
                                  ${defaultData.imagePreview ? "p-2" : "p-4"}
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
                                        <div className="w-16 h-16 mb-2 rounded-full bg-orange-50 dark:bg-gray-700 flex items-center justify-center transition-transform group-hover:scale-110">
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
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 mt-2 flex justify-between border-t border-gray-200 dark:border-gray-700">
                        {/* Left side - Delete button (only in edit mode) */}
                        <div>
                            {isEditMode && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this item?")) {
                                            onDeleteItem && onDeleteItem(initialData);
                                            onClose();
                                        }
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
                                >
                                    <Trash2 size={16} className="mr-2" />
                                    Delete Item
                                </button>
                            )}
                        </div>

                        {/* Right side - Cancel and Submit buttons */}
                        <div className="flex space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                {isEditMode ? "Save Changes" : "Add Item"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddItemModal;