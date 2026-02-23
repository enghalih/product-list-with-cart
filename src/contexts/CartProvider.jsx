import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  // Initialize state from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [customerName, setCustomerName] = useState(() => {
    return localStorage.getItem("customerName") || "";
  });

  const [customerPhone, setCustomerPhone] = useState(() => {
    return localStorage.getItem("customerPhone") || "";
  });

  // Persist state to localStorage on changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("customerName", customerName);
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [customerName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("customerPhone", customerPhone);
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [customerPhone]);

  const [tableNumber, setTableNumber] = useState("");
  const [orderType, setOrderType] = useState("order"); // 'order' or 'pre-order'
  const [peopleCount, setPeopleCount] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [isTakeaway, setIsTakeaway] = useState(false);

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

      if (existingItem && existingItem.quantity > 1) {
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

  const clearCart = () => {
    setCart([]);
    setTableNumber("");
    setPeopleCount("");
    setOrderDate("");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        customerName,
        customerPhone,
        tableNumber,
        orderType,
        peopleCount,
        orderDate,
        isTakeaway,
        setCustomerName,
        setCustomerPhone,
        setTableNumber,
        setOrderType,
        setPeopleCount,
        setOrderDate,
        setIsTakeaway,
        handleAddToCart,
        handleSubtractToCart,
        handleRemoveFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
