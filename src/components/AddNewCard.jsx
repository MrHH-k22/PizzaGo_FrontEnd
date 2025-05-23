import { Plus } from 'lucide-react';

// Separate component for the Add New card
function AddNewCard({ name, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-dashed border-orange-300 
        bg-gradient-to-b from-orange-50 to-white cursor-pointer group transition-all duration-300
        hover:border-orange-400 hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50"
    >
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <div className="w-12 h-12 rounded-full bg-white border-2 border-orange-300 flex items-center justify-center 
          text-orange-500 mb-3 group-hover:bg-orange-100 group-hover:border-orange-400 transition-all duration-300 
          shadow-sm group-hover:shadow transform group-hover:-translate-y-1">
          <Plus size={24} className="group-hover:scale-110 transition-transform duration-300" />
        </div>
        <p className="text-sm text-gray-700 font-medium group-hover:text-orange-600 transition-colors duration-300">{name}</p>
      </div>
    </button>
  );
}

export default AddNewCard;
