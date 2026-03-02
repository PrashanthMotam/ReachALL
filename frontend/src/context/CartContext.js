import { createContext, useContext, useEffect, useState } from "react";
import {
  addToCartAPI,
  getCartAPI,
  removeFromCartAPI,
  updateCartAPI
} from "../services/cartService";
import { placeOrderAPI } from "../services/orderService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const data = await getCartAPI();
    setCartItems(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    await addToCartAPI(product._id);
    fetchCart();
  };

  const removeFromCart = async (id) => {
    await removeFromCartAPI(id);
    fetchCart();
  };

  const increaseQty = async (item) => {
    await updateCartAPI(item._id, item.quantity + 1);
    fetchCart();
  };

  const decreaseQty = async (item) => {
    if (item.quantity > 1) {
      await updateCartAPI(item._id, item.quantity - 1);
      fetchCart();
    }
  };

  const placeOrder = async () => {
    await placeOrderAPI();
    fetchCart();
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        totalPrice,
        placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);