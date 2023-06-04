import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const CartButton = ({ itemId, quantity, onUpdateQuantity, stock }) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleDecreaseQuantity = () => {
    if (itemQuantity === 1) {
      onUpdateQuantity(0);
    } else {
      const newQuantity = itemQuantity - 1;
      setItemQuantity(newQuantity);
      onUpdateQuantity(newQuantity);
    }
  };

  const handleIncreaseQuantity = () => {
    if (itemQuantity < stock) {
      const newQuantity = itemQuantity + 1;
      setItemQuantity(newQuantity);
      onUpdateQuantity(newQuantity);
    }
  };

  return (
    <div className="flex items-center">
      <Typography
        variant="body2"
        className={`text-red-500 cursor-pointer ${
          itemQuantity === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleDecreaseQuantity}
        style={{
          padding: '10px',
          borderRadius: '4px',
          fontWeight: 'bold',
          fontSize: 'larger',
        }}
      >
        -
      </Typography>
      <Typography variant="body2" className="text-gray-600 mx-2">
        {itemQuantity}
      </Typography>
      <Typography
        variant="body2"
        className={`text-blue-500 cursor-pointer ${
          stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleIncreaseQuantity}
        style={{
          padding: '10px',
          borderRadius: '4px',
          fontWeight: 'bold',
          fontSize: 'larger',
        }}
      >
        +
      </Typography>
    </div>
  );
};

export default CartButton;
