import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { ICartItem, IProduct } from "../types";
import { addToCart } from "../store/cart/cartSlice";
import { useAppSelector } from "../store/store";

const ProductCard: React.FC<IProduct> = ({
  id,
  title,
  price,
  category,
  description,
  image,
  rating,
}) => {
  const dispatch = useDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const isAddedToCart = useMemo(
    () => items.find((products) => products.id === id)?.quantity,
    [items]
  );

  return (
    <div className="flex flex-col h-[400px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain bg-gray-50 p-4"
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-lg font-semibold mb-1 truncate" title={title}>
          {title}
        </h3>
        <p
          className="text-gray-600 text-sm mb-0 line-clamp-2"
          title={description}
        >
          {description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 font-semibold text-lg">
              {rating?.rate ?? "N/A"}
            </span>
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.8 8.6H23l-7 5.1 2.7 8.3L12 18.2l-7 5 2.7-8.3-7-5.1h8.2z" />
            </svg>
          </div>
          <span className="text-gray-600 text-sm">
            ({rating?.count ?? 0} reviews)
          </span>
        </div>
        <span className="text-sm text-gray-600 font-semibold text-right">
          {isAddedToCart && `${isAddedToCart} Item Added`}
        </span>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold">₹{price.toFixed(2)}</span>

          <button
            onClick={() =>
              dispatch(
                addToCart({
                  id,
                  title,
                  price,
                  category,
                  description,
                  image,
                } as IProduct)
              )
            }
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {"Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
