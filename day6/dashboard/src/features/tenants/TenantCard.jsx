function TenantCard({ tenantName, productCount, activeProducts }) {
  return (
    <div className="group h-20 m-3 border border-purple-300 rounded-2xl bg-white hover:bg-purple-50 hover:shadow-md transition-all duration-200 flex justify-between items-center px-6 cursor-pointer">
      <div className="flex flex-col">
        <p className="font-semibold text-lg text-purple-800 group-hover:underline">
          {tenantName}
        </p>
        <span className="text-sm text-gray-500">
          {activeProducts} active of {productCount} products
        </span>
      </div>
      <p className="font-bold text-xl text-purple-600">{productCount}</p>
    </div>
  );
}

export default TenantCard;
