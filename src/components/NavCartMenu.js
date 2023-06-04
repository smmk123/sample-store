import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../context/CartProvider';

const NavCartMenu = () => {
  const { cart } = useContext(CartContext);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartItemsTooltip, setCartItemsTooltip] = useState('Shopping Cart');

  useEffect(() => {
    let quantity = 0;
    cart.forEach((item) => {
      quantity += item.quantity;
    });
    setTotalQuantity(quantity);

    if (cart.length <= 2) {
      setCartItemsTooltip(
        cart.map((item) => `${item.name}: ${item.quantity}`).join('\n')
      );
    } else {
      const firstTwoItems = cart.slice(0, 2);
      const tooltipContent = firstTwoItems
        .map((item) => `${item.name}: ${item.quantity}`)
        .join('\n');
      setCartItemsTooltip(`${tooltipContent}\nMore...`);
    }
  }, [cart]);

  return (
    <Box sx={{ ml: 'auto' }}>
      <Tooltip title={cartItemsTooltip}>
        <IconButton component={Link} to="/shopping-cart" color="inherit">
          <Badge color="error" badgeContent={totalQuantity}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default NavCartMenu;
