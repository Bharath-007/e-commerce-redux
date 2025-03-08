import { FC, useMemo } from "react";
import { ICartItem, IProduct } from "../types";
import ProductCard from "./ProductCard";

interface IProductList {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  products: IProduct[];
  filteredItems: IProduct[];
  itemsPerPage: number;
  currentPage: number;
  searchTerm: string | null;
}

const ProductList: FC<IProductList> = ({
  isLoading,
  isError,
  error,
  products,
  currentPage,
  itemsPerPage,
  searchTerm,
  filteredItems,
}) => {
  const displayItems = useMemo(
    () => (searchTerm ? filteredItems : products),
    [searchTerm, filteredItems, products]
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return displayItems.slice(startIndex, startIndex + itemsPerPage);
  }, [displayItems, currentPage, itemsPerPage]);

  return (
    <>
      {isLoading ? (
        "loading..."
      ) : isError ? (
        <p className="text-gray-500 text-center text-red-600">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center">No Products available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedItems.map((product: IProduct) => {
            return <ProductCard key={product.id} {...product} />;
          })}
        </div>
      )}
    </>
  );
};

export default ProductList;
