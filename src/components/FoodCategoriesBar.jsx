import { Check } from 'lucide-react';

export default function FoodCategoriesBar({ selectedCategories, onCategoryChange }) {
  const categories = [
    { id: 'pizza', name: 'pizza', icon: '🍕' },
    { id: 'food', name: 'food', icon: '🍔' },
    { id: 'drinks', name: 'drinks', icon: '🥤' },
    { id: 'vegetarian', name: 'vegetarian', icon: '🥗' },
  ];
  
  const handleSelectCategory = (categoryName) => {
    onCategoryChange(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(cat => cat !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.name);
          return (
            <button
              key={category.id}
              onClick={() => handleSelectCategory(category.name)}
              className={`
                relative flex items-center px-5 py-2.5 rounded-full
                transition-all duration-300 ease-in-out
                font-medium text-sm
                ${isSelected 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-200'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-orange-50 hover:border-orange-200'}
              `}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
              
              {isSelected && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-sm">
                  <Check size={10} className="text-orange-500" strokeWidth={3} />
                </span>
              )}
              
              {/* Subtle animated background for selected state */}
              {isSelected && (
                <span className="absolute inset-0 rounded-full overflow-hidden z-0">
                  <span className="absolute inset-0 opacity-20 bg-gradient-to-r from-white to-transparent animate-pulse"></span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}