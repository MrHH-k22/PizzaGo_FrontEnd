function CustomerInfo({ user }) {
  return (
    <div className="px-8 py-6 md-min-h-fit bg-white md:border border-gray-300 md:rounded-2xl">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          Who's the order for
        </h2>

        <div className=" p-5 rounded-lg">
          <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-300 ">
            <span className="text-base font-medium text-gray-600">
              Full name
            </span>
            <span className="text-base text-gray-900 font-semibold">
              {user?.name || ""}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-gray-600">Email</span>
            <span className="text-base text-gray-900 font-semibold">
              {user?.email || ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
