'use client';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // useEffect(() => {console.log("🚀 ~ file: CartProvider.js:8 ~ CartProvider ~ cart:", cart)
  // }, [cart]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
