import React, { useContext, setState, useState, useEffect } from 'react';
import { CartContext } from '../context/CartProvider';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import CartButton from './CartButton';

const ProductCard = ({ pictureUrl, name, price, description, inStock, id }) => {
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

  const handleUpdateQuantity = (itemID, quantity) => {
    if (quantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemID));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.id === itemID) {
            return { ...item, quantity };
          }
          return item;
        })
      );
    }
  };

  const handleRemoveFromCart = () => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
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
    <Card className="max-w-xs mx-auto bg-white shadow-md rounded-md p-4 m-10">
      <CardMedia
        component="img"
        src={pictureUrl}
        alt={capitalizedName}
        className="w-full mb-4 rounded-md"
      />
      <CardContent>
        <Typography variant="h6" className="text-gray-600 font-semibold">
          {capitalizedName}
        </Typography>
        <Typography variant="body2" className="text-gray-600 mb-2">
          ${price}
        </Typography>
        <Typography variant="body2" className="text-gray-500 mb-4">
          {description}
        </Typography>
        <Typography variant="body2" className="text-gray-500 mb-4">
          In Stock: {stock}
        </Typography>
        {isInCart ? (
          <>
            <CartButton
              itemId={id}
              quantity={cart.find((item) => item.id === id)?.quantity}
              onUpdateQuantity={(quantity) =>
                handleUpdateQuantity(id, quantity)
              }
              stock={inStock}
            />
            <Button
              variant="contained"
              color="error"
              className="text-white font-semibold py-2 px-4 rounded-md mt-2"
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </Button>
          </>
        ) : stock > 0 ? (
          <Button
            variant="contained"
            color="primary"
            className="text-white font-semibold py-2 px-4 rounded-md"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        ) : (
          <Typography variant="body2" className="text-red-500">
            Out of Stock
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
