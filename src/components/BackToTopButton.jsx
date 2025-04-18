function BackToTopButton() {
  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-red-600 text-white hover:bg-red-700 rounded-full p-3 shadow-md transition duration-1000 transform hover:scale-110"
        aria-label="Quay lại đầu trang"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}

export default BackToTopButton;
