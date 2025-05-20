import React from "react";
import PropTypes from "prop-types";

function Header({ title, description, buttonText, buttonIcon: ButtonIcon, onButtonClick, showButton = true }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          {description && <p className="text-gray-500 mt-1">{description}</p>}
        </div>
        
        {showButton && (
          <button
            onClick={onButtonClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {ButtonIcon && <ButtonIcon size={18} />}
            <span>{buttonText}</span>
          </button>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.elementType,
  onButtonClick: PropTypes.func,
  showButton: PropTypes.bool
};

Header.defaultProps = {
  buttonText: "Add New",
  showButton: true
};

export default Header;