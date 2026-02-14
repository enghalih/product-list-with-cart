import { useEffect } from "react";
import OrderIcon from "./assets/images/icon-order-confirmed.svg";
import Button from "./components/Button";
import ConfirmItem from "./ConfirmItem";

export default function ConfirmOrder({ cart, products, isOpen, onClose, totalPrice }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Kunci scroll
    } else {
      document.body.style.overflow = "unset"; // Lepas kunci
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div
      className="bg-[hsla(0,0%,0%,0.5)] overflow-y-auto fixed inset-0 grid sm:place-items-center place-items-end"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white grid gap-8 py-10 px-6 sm:px-10 rounded-xl"
      >
        <div className="grid gap-6">
          <img src={OrderIcon} alt="" />
          <div className="grid gap-2">
            <h2 className="text-preset-1 text-rose-900">Order Confirmed</h2>
            <p className="text-preset-4 text-rose-400">
              We hope you enjoy your food!
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-6 bg-rose-50">
          <ul className="grid gap-4">
            {cart.map((item, index) => (
              <ConfirmItem
                key={index}
                name={item.name}
                quantity={item.quantity}
                products={products}
              />
            ))}
          </ul>
          <div>
            <div className="flex justify-between">
              <p className="text-preset-4">Order Total</p>
              <p className="text-preset-2 font-bold">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <Button onClick={onClose}>Start New Order</Button>
      </div>
    </div>
  );
}
