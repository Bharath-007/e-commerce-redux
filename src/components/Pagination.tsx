import React from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { setCurrentPage } from "../store/product/productSlice";

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredItems, currentPage, itemsPerPage, items, searchTerm } =
    useAppSelector((state: RootState) => state.products);

  const totalPages = searchTerm
    ? Math.ceil(filteredItems.length / itemsPerPage)
    : Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        {"<"}
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
