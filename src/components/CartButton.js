import React, { useState } from 'react';

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
    if (stock > 0) {
      const newQuantity = itemQuantity + 1;
      setItemQuantity(newQuantity);
      onUpdateQuantity(newQuantity);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2 ${
          itemQuantity === 1 ? 'bg-red-500' : ''
        }`}
        onClick={handleDecreaseQuantity}
        disabled={itemQuantity === 1 && stock === 0}
      >
        {itemQuantity === 1 ? 'Remove from Cart' : '-'}
      </button>
      <p className="text-gray-600">{itemQuantity}</p>
      <button
        className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ml-2 ${
          stock === 0 ? 'bg-gray-400 hover:bg-bgray-400 cursor-not-allowed' : ''
        }`}
        onClick={handleIncreaseQuantity}
        disabled={stock === 0}
      >
        +
      </button>
    </div>
  );
};

export default CartButton;
