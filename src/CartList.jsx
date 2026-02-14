import EmptyCartImage from "./assets/images/illustration-empty-cart.svg";
import { useContext, useState } from "react";
import { CartContext } from "./contexts/CartContext";
import CartItem from "./CartItem";
import CarbonInfo from "./components/CarbonInfo";
import Button from "./components/Button";
import ConfirmOrder from "./ConfirmOrder";

export default function CartList({ products }) {
  const [isOrder, setIsOrder] = useState(false);
  const { cart } = useContext(CartContext);
  let content;
  const totalPrice = cart.reduce((total, item) => {
    return (
      total + products.find((p) => p.name === item.name).price * item.quantity
    );
  }, 0);
  const totalQuantity = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  function handleConfirmOrder() {
    setIsOrder(true);
  }
  function handleCloseOrder() {
    setIsOrder(false);
  }

  if (cart.length === 0) {
    content = (
      <div className="grid gap-4 p-4">
        <img src={EmptyCartImage} alt="" className="mx-auto" />
        <p className="text-preset-4-bold text-center text-rose-500">
          Your added items will appear here
        </p>
      </div>
    );
  } else {
    content = (
      <>
        <div className="grid gap-6">
          {cart.map((item) => (
            <CartItem
              key={item.name}
              name={item.name}
              quantity={item.quantity}
              products={products}
            />
          ))}
        </div>
        <div className="w-full h-px bg-rose-100"></div>
        <div className="flex justify-between">
          <p className="text-preset-4">Order Total</p>
          <p className="text-preset-2">${totalPrice.toFixed(2)}</p>
        </div>
        <CarbonInfo />
        <Button onClick={() => handleConfirmOrder(cart, products)}>
          Confirm Order
        </Button>
        <ConfirmOrder
          cart={cart}
          products={products}
          isOpen={isOrder}
          onClose={handleCloseOrder}
          totalPrice={totalPrice}
        />
      </>
    );
  }

  return (
    <aside className="bg-white p-6 flex flex-col gap-6 rounded-xl justify-center h-min">
      <h2 className="text-preset-2 text-primary-red">
        Your Cart ({totalQuantity})
      </h2>
      {content}
    </aside>
  );
}
