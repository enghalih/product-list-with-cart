import { useState } from "react";
import addToCartIcon from "../assets/images/icon-add-to-cart.svg";
import AddIcon from "./AddIcon";
import SubtractIcon from "./SubtractIcon";
export default function AddToCart({ className }) {
  const [ count, setCount ] = useState(0);
  let content;
  function handleAdd() {
    setCount(count + 1);
  }
  function handleSubtract() {
    setCount(count - 1);
  }

  if(count <= 0) {
    content = (
      <button
        type="button"
        className={`${className} bg-white p-3 border border-rose-400 flex items-center gap-2 rounded-full min-w-40 justify-center hover:text-primary-red hover:border-primary-red`}
        onClick={handleAdd}
      >
        <img src={addToCartIcon} alt="" />
        Add to Cart
      </button>
    );
  } else {
    content = (
      <div
        type="button"
        className={`${className} bg-primary-red p-3 flex justify-between items-center rounded-full min-w-40`}
      >
        <SubtractIcon onClick={handleSubtract} />
        <p className="text-preset-4-bold text-white">{count}</p>
        <AddIcon onClick={handleAdd} />
      </div>
    );
  }

  return (
    <>
      {content}
    </>
  );
}
