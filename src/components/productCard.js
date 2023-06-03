import React, { useContext, setState, useState, useEffect } from 'react';
import { CartContext } from '../context/CartProvider';
import CartButton from './CartButton';

const Card = ({ pictureUrl, name, price, description, inStock, id }) => {
  const [stock, setStock] = useState(inStock);
  const { cart, setCart } = useContext(CartContext);
  const isInCart = cart.some((item) => item.id === id);

  const handleAddToCart = () => {
    if (stock > 0) {
      const newItem = {
        id,
        pictureUrl,
        name,
        price,
        description,
        inStock,
        quantity: 1,
      };

      setCart((prevCart) => [...prevCart, newItem]);
      setStock((prevStock) => prevStock - 1);
    }
  };

  const handleUpdateQuantity = (quantity) => {
    if (quantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.id === id) {
            return { ...item, quantity };
          }
          return item;
        })
      );
    }
  };

  useEffect(() => {
    const itemInCart = cart.find((item) => item.id === id);
    if (itemInCart) {
      setStock(inStock - itemInCart.quantity);
    } else {
      setStock(inStock);
    }
  }, [cart, id, inStock]);

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div
      key={id}
      className="bg-white shadow-md rounded-md p-4 w-1/4 m-10 min-w-fit"
    >
      <img
        src={pictureUrl}
        alt={capitalizedName}
        className="w-full mb-4 rounded-md"
      />

      <h2 className="text-gray-600 text-lg font-semibold">{capitalizedName}</h2>

      <p className="text-gray-600 mb-2">${price}</p>

      <p className="text-gray-500 mb-4">{description}</p>

      <p className="text-gray-500 mb-4">In Stock: {stock}</p>

      {isInCart ? (
        <CartButton
          itemId={id}
          quantity={cart.find((item) => item.id === id)?.quantity}
          onUpdateQuantity={handleUpdateQuantity}
          stock={stock}
        />
      ) : stock > 0 ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      ) : (
        <p className="text-red-500">Out of Stock</p>
      )}
    </div>
  );
};

export default Card;
