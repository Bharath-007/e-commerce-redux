import React, { useMemo } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { removeFromCart, updateQuantity } from "../store/cart/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      ) : (
        <div className="">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-4 bg-grey shadow-md p-4 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-scale-down rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Math.max(1, item.quantity - 1),
                        })
                      )
                    }
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    {"-"}
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    {"+"}
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                >
                  {"🗑️"}
                </button>
              </div>
            ))}
          </div>
          <div className="relative mt-6 pt-6 border-t">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
