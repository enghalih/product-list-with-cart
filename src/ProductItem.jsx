import AddToCart from "./components/AddToCart";

export default function ProductItem({ name, category, price, image }) {

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2, // Memastikan ada 2 angka di belakang koma (0.00)
  }).format(price);

  return (
    <article className="grid gap-9.5">
      <div className="relative">
        <picture>
          <source media="(min-width: 64rem)" srcset={image.desktop} />
          <source media="(min-width: 48rem)" srcset={image.tablet} />
        </picture>
        <img src={image.mobile} alt="" className="rounded-lg" />
        <AddToCart className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="grid gap-1">
        <p className="text-rose-500 text-preset-4">{category}</p>
        <h3 className="text-rose-900 text-preset-3">{name}</h3>
        <p className="text-primary-red text-preset-3">{formattedPrice}</p>
      </div>
    </article>
  );
}
