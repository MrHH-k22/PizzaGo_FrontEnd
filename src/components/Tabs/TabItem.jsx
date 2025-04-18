function TabItem({ icon, label, isActive, onClick }) {
  return (
    <div
      className={`w-[200px] flex flex-col items-center border-b-3 px-3 py-2 cursor-pointer ${
        isActive ? "text-red-500  border-red-500" : "text-gray-600 border-white"
      }`}
      onClick={onClick}
    >
      <div className="mb-1 text-3xl">{icon}</div>
      <div className={`text-lg font-medium ${isActive ? "font-bold" : ""}`}>
        {label}
      </div>
    </div>
  );
}

export default TabItem;
