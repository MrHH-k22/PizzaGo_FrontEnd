import { useState, useEffect, useMemo, use } from 'react';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import HeaderManager from "../../../components/HeaderManager";
import FoodCategoriesBar from "../../../components/FoodCategoriesBar";
import FoodItemCarousel from "../../../components/FoodItemCarousel";
import AddItemModal from "../../../components/AddItemModal";
import useAddFoodItem from '../../../hooks/useAddFoodItem';
import useGetCategory from '../../../hooks/useGetCategory';
import useGetFoodItems from '../../../hooks/useGetFoodItem';
import useEditFoodItem from '../../../hooks/useEditFoodItem';
import useDeleteFoodItem from '../../../hooks/useDeleteFoodItem';
function ManageFoodMenu() {
    const { categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategory();
    const [selectedCategories, setSelectedCategories] = useState([]);
    useEffect(() => {
        if (categories && categories.length > 0) {
            // Extract category names from the category objects
            const categoryNames = categories.map(cat => cat.name);
            setSelectedCategories(categoryNames);
        }
    }, [categories]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const { foodItems: listFoods, isLoading: isFoodItemsLoading, error: foodItemsError } = useGetFoodItems();
    const { addNewFoodItem, isAddingFoodItem } = useAddFoodItem();
    const { editFoodItemMutation, isEditingFoodItem } = useEditFoodItem();
    const { deleteFoodItemMutation, isDeletingFoodItem } = useDeleteFoodItem();
    const [pizzaItems, setPizzaItems] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [drinksItems, setDrinksItems] = useState([]);
    const [vegetarianItems, setVegetarianItems] = useState([]);
    useEffect(() => {
        if (listFoods && listFoods.length > 0) {
            const pizzas = listFoods.filter(item => item.category?.name === "pizza");
            setPizzaItems(pizzas);
            setFoodItems(listFoods.filter(item => item.category?.name === "food"));
            setDrinksItems(listFoods.filter(item => item.category?.name === "drinks"));
            setVegetarianItems(listFoods.filter(item => item.category?.name === "vegetarian"));
        }
    }, [listFoods, isFoodItemsLoading]);;
    const openAddNewPizzaModal = () => {
        const pizzaCategory = categories?.find(cat => cat.name === "pizza") || "Pizza";
        setEditingItem({ category: pizzaCategory });
        setIsEditMode(false);
        setIsModalOpen(true);
    };
    const openAddNewFoodModal = () => {
        const foodCategory = categories?.find(cat => cat.name === "food") || "Food";
        setEditingItem({ category: foodCategory });
        setIsEditMode(false);
        setIsModalOpen(true);
    };
    const openAddNewDrinkModal = () => {
        const drinksCategory = categories?.find(cat => cat.name === "drinks") || "Drinks";
        setEditingItem({ category: drinksCategory });
        setIsEditMode(false);
        setIsModalOpen(true);
    };
    const openAddNewVegetarianModal = () => {
        const vegetarianCategory = categories?.find(cat => cat.name === "vegetarian") || "Vegetarian";
        setEditingItem({ category: vegetarianCategory });
        setIsEditMode(false);
        setIsModalOpen(true);
    };
    
    const handleAddItem = (itemData) => {
        // console.log("Adding new item:", itemData);
        if(itemData){
            addNewFoodItem(itemData);
        }
    };
    
    const handleEditItem = (itemData) => {
        console.log("Editing item:", itemData);
        if(itemData){
            editFoodItemMutation(itemData);
        }
    };
    
    // Logic to determine which categories to show
    const showAll = selectedCategories.length === 0 || 
                   selectedCategories.length === 4; // Show all if none or all are selected
    
    const showPizza = showAll || selectedCategories.includes('pizza');
    const showFood = showAll || selectedCategories.includes('food');
    const showDrinks = showAll || selectedCategories.includes('drinks');
    const showVegetarian = showAll || selectedCategories.includes('vegetarian');

    // Add this new handler for item clicks
    const handleItemClick = (item) => {
        // First close any open modal
        if (isModalOpen) {
            setIsModalOpen(false);

            // Use setTimeout to ensure state updates complete before reopening
            setTimeout(() => {
                setEditingItem(item);
                setIsEditMode(true);
                setIsModalOpen(true);
            }, 50);
        } else {
            // Direct open if no modal is currently shown
            setEditingItem(item);
            setIsEditMode(true);
            setIsModalOpen(true);
        }
    };
    const handleDeleteItem = (item) => {
        if (item && item._id) {
            deleteFoodItemMutation(item._id);
        }
    };
    
    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <HeaderManager
                    title="Manage Food Menu"
                    description="Add, edit, or delete food items from the menu."
                    showButton={false}
                />
                <FoodCategoriesBar 
                    selectedCategories={selectedCategories}
                    onCategoryChange={setSelectedCategories}
                />
                
                {showPizza && (
                    <div className="flex flex-col space-y-4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-medium text-gray-800 mb-4">Pizza</h2>
                            <FoodItemCarousel
                                title="Pizzas"
                                items={pizzaItems}
                                onAddNew={openAddNewPizzaModal}
                                onItemClick={handleItemClick}
                                addNewText="Add new pizza"
                            />
                        </div>
                    </div>
                )}
                
                {showFood && (
                    <div className="flex flex-col space-y-4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-medium text-gray-800 mb-4">Food</h2>
                            <FoodItemCarousel
                                title="Foods"
                                items={foodItems}
                                onAddNew={openAddNewFoodModal}
                                onItemClick={handleItemClick}
                                addNewText="Add new food"
                            />
                        </div>
                    </div>
                )}
                
                {showDrinks && (
                    <div className="flex flex-col space-y-4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-medium text-gray-800 mb-4">Drink</h2>
                            <FoodItemCarousel
                                title="Drinks"
                                items={drinksItems} 
                                onAddNew={openAddNewDrinkModal}
                                onItemClick={handleItemClick}
                                addNewText="Add new drink" 
                            />
                        </div>
                    </div>
                )}
                
                {showVegetarian && (
                    <div className="flex flex-col space-y-4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-medium text-gray-800 mb-4">Vegetarian</h2>
                            <FoodItemCarousel
                                title="Vegetarian"
                                items={vegetarianItems}
                                onAddNew={openAddNewVegetarianModal}
                                onItemClick={handleItemClick}
                                addNewText="Add new vegetarian"
                            />
                        </div>
                    </div>
                )}
            </div>
            
            <AddItemModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                }}
                onAddItem={handleAddItem}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteItem}
                initialData={editingItem}
                isEditMode={isEditMode}
                categories={editingItem ? [editingItem.category] : []}
            />
        </div>
    );
}

export default ManageFoodMenu;