import { FC } from "react";
const Header: FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <ShoppingBag className="text-blue-500" size={32} /> */}
            <h1 className="text-2xl font-bold text-gray-900">
              E-Commerce Shop
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
