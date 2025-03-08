import { FC, useEffect } from "react";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import SearchFilter from "../components/SearchFilter";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAllProducts } from "../store/product/productApi";
import Cart from "../components/Cart";
import { IPageHandler } from "../App";
import FloatingButton from "../components/FloatingButton";
import { ICartItem } from "../types";

const Home: FC<IPageHandler> = ({ page, handlePage }) => {
  const dispatch = useAppDispatch();

  const {
    items,
    isLoading,
    isError,
    error,
    filteredItems,
    searchTerm,
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.products);

  const cartItems = useAppSelector((state) => state.cart.items) as ICartItem[];

  useEffect(() => {
    if (!isLoading && items.length === 0) {
      dispatch(getAllProducts());
    }
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {!page ? (
          <div className="col-span-full">
            <SearchFilter />
            <ProductList
              isLoading={isLoading}
              isError={isError}
              error={error}
              products={filteredItems.length > 0 ? filteredItems : items}
              searchTerm={searchTerm}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              filteredItems={filteredItems}
            />
            <Pagination />
          </div>
        ) : (
          <div className="col-span-full">
            <Cart />
          </div>
        )}
        {/* cart floating btn */}
        <FloatingButton
          badge={!page ? cartItems.length : 0}
          label={!page ? "Cart" : "Products"}
          onClick={handlePage}
        />
      </div>
    </main>
  );
};

export default Home;
