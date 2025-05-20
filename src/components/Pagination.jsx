import React from "react";
import PropTypes from "prop-types";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center space-x-2">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded border ${
          currentPage === 1 
            ? 'bg-gray-100 text-gray-400 border-gray-200' 
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
      >
        Previous
      </button>
      
      <div className="flex space-x-1">
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          // Show only certain pages for better UI when there are many pages
          if (
            pageNumber === 1 || 
            pageNumber === totalPages || 
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`w-8 h-8 flex items-center justify-center rounded ${
                  currentPage === pageNumber 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNumber}
              </button>
            );
          }
          
          // Add ellipsis if needed
          if (
            (pageNumber === currentPage - 2 && pageNumber > 1) || 
            (pageNumber === currentPage + 2 && pageNumber < totalPages)
          ) {
            return <span key={pageNumber} className="px-2">...</span>;
          }
          
          return null;
        })}
      </div>
      
      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded border ${
          currentPage === totalPages 
            ? 'bg-gray-100 text-gray-400 border-gray-200' 
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;