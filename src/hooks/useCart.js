import { useContext, useDebugValue, useEffect } from 'react';
import CartContext from '../context/CartProvider';

const useCart = () => {
  const { cart } = useContext(CartContext);
  return useContext(CartContext);
};
export default useCart;
