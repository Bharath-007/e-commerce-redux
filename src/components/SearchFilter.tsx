import React from "react";
import { useAppDispatch } from "../store/store";
import { setSearchTerm } from "../store/product/productSlice";

const SearchFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => {
          if (e.target.value) {
            dispatch(setSearchTerm(e.target.value));
          }
        }}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchFilter;
