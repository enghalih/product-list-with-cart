import EmptyCartImage from "./assets/images/illustration-empty-cart.svg";

export default function Cart() {
  return (
    <div className="bg-white p-6 grid gap-6 rounded-xl">
      <h2 className="text-preset-2 text-primary-red">Your Cart (0)</h2>
      <div className="grid gap-4 p-4">
        <img src={EmptyCartImage} alt="" className="mx-auto"/>
        <p className="text-preset-4-bold text-center text-rose-500">Your added items will appear here</p>
      </div>
    </div>
  );
}
