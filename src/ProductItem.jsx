import AddToCart from "./components/AddToCart";
import formatPrice from "./components/formatterPrice";

export default function ProductItem({ name, category, price, image }) {
  const formattedPrice = formatPrice(price);

  return (
    <article className="grid gap-2 md:gap-9.5">
      <div className="relative w-full aspect-square md:aspect-auto">
        <img
          src={image.desktop}
          alt={`image of ${name}`}
          className="rounded-lg w-full h-full object-cover"
        />
        <AddToCart
          name={name}
          className="hidden md:flex md:absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        />
      </div>

      <div className="grid gap-1">
        <p className="text-rose-500 text-preset-4">{category}</p>
        <h3 className="text-rose-900 text-preset-3 truncate">{name}</h3>
        <p className="text-primary-red text-preset-3">{formattedPrice}</p>
      </div>

      <AddToCart name={name} className="md:hidden mt-auto" />
    </article>
  );
}
