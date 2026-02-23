import RemoveIcon from "./assets/images/icon-remove-item.svg";
import { useContext } from "react";
import { CartContext } from "./contexts/CartContext";
import formatPrice from "./components/formatterPrice";

export default function CartItem({ name, quantity, products, className }) {
  const product = products.find((product) => product.name === name);
  const { handleRemoveFromCart } = useContext(CartContext);

  return (
    <div className={`${className} flex justify-between items-center`}>
      <div className="grid gap-2 text-preset-4">
        <h3 className="font-bold">{product.name}</h3>
        <div className="flex gap-2 items-center">
          <p className="font-bold  text-primary-red">{quantity}x</p>
          <p>@{formatPrice(product.price)}</p>
          <p>{formatPrice(product.price * quantity)}</p>
        </div>
      </div>
      <button
        type="button"
        className="rounded-full aspect-square p-2 border border-rose-400"
        onClick={() => handleRemoveFromCart(name)}
      >
        <img src={RemoveIcon} alt="" />
      </button>
    </div>
  );
}
