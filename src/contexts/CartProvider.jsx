import { useState } from "react";
import { CartContext } from "./CartContext";  

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (name) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === name);

      if (existingItem) {
        return prevCart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...prevCart, { name, quantity: 1 }];
      }
    });
  };

  const handleSubtractToCart = (name) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === name);

      if (existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item,
        );
      } else {
        return prevCart.filter((item) => item.name !== name);
      }
    });
  };
  const handleRemoveFromCart = (name) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.name !== name);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleSubtractToCart,
        handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
