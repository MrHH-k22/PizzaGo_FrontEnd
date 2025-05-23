import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AddNewCard from './AddNewCard';
import { getImagePath } from '../utils/helpers';
export default function FoodItemCarousel({ title, items, onAddNew, addNewText = "Add new item" }) {
  const scrollContainerRef = useRef(null);
  const scrollStep = 320; 
  
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollStep,
        behavior: 'smooth'
      });
    }
  };
  
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollStep, 
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gray-50 p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-gray-800">{title}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={handleScrollLeft}
            className="p-1 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleScrollRight}
            className="p-1 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Container for both fixed Add New card and scrollable items */}
      <div className="flex">
        {/* Fixed Add New card */}
        {onAddNew && (
          <div className="mr-4 flex-shrink-0">
            <AddNewCard
              name={addNewText}
              onClick={() => onAddNew()}
            />
          </div>
        )}
        
        {/* Scrollable items container */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar flex-grow"
        >
          {/* Regular food items with enhanced hover effects */}
          {items.map((item) => (
            <div 
              key={item.id} 
              className="group w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden bg-white border border-transparent hover:border-orange-300 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="w-full h-24 relative overflow-hidden">
                <img 
                  src={getImagePath(item.image)} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {item.price?.toFixed(2) || '0.00'} VND
                  </div>
                </div>
              </div>
              <div className="p-2 text-center transform group-hover:-translate-y-1 transition-transform duration-300">
                <p className="text-sm font-medium text-gray-800 group-hover:text-orange-600 transition-colors duration-300 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 mt-1 transition-all duration-300 truncate">
                  {item.description?.substring(0, 30) || 'No description'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}