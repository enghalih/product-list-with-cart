import RemoveIcon from "./assets/images/icon-remove-item.svg";
import { useContext } from "react";
import { CartContext } from "./contexts/CartContext";

export default function CartItem({ name, quantity, products, className }) {
  const product = products.find((product) => product.name === name);
  const { handleRemoveFromCart } = useContext(CartContext);

  const formatterPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2, // Memastikan ada 2 angka di belakang koma (0.00)
  });

  return (
    <div className={`${className} flex justify-between items-center`}>
      <div className="grid gap-2 text-preset-4">
        <h3 className="font-bold">{product.name}</h3>
        <div className="flex gap-2 items-center">
          <p className="font-bold  text-primary-red">{quantity}x</p>
          <p>@{formatterPrice.format(product.price)}</p>
          <p>{formatterPrice.format(product.price * quantity)}</p>
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
