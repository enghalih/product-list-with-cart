import addToCartIcon from "../assets/images/icon-add-to-cart.svg";
import AddIcon from "./AddIcon";
import SubtractIcon from "./SubtractIcon";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
export default function AddToCart({ className, name }) {
  const { cart, handleAddToCart, handleSubtractToCart } =
    useContext(CartContext);
  let content;
  const currentItem = cart.find((item) => item.name === name);

  if (!currentItem) {
    content = (
      <button
        type="button"
        className={`${className} bg-white p-3 border border-rose-400 flex items-center gap-2 rounded-full min-w-40 justify-center hover:text-primary-red hover:border-primary-red`}
        onClick={() => handleAddToCart(name)}
      >
        <img src={addToCartIcon} alt="" />
        Add to Cart <span className="sr-only">{name}</span>
      </button>
    );
  } else {
    content = (
      <div
        type="button"
        className={`${className} bg-primary-red p-3 flex justify-between items-center rounded-full min-w-40`}
      >
        <SubtractIcon onClick={() => handleSubtractToCart(name)} />
        <p className="text-preset-4-bold text-white">{currentItem.quantity}</p>
        <AddIcon onClick={() => handleAddToCart(name)} />
      </div>
    );
  }

  return <>{content}</>;
}
