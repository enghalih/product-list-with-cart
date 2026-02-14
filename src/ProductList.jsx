import ProductItem from "./ProductItem";

export default function ProductList({ products, className }) {
  return (
    <div className={`${className} grid gap-8`} >
      <h1 className="text-preset-1 text-rose-900"><span className="sr-only">Choose your</span>Desserts</h1>
      <section className="grid md:grid-cols-3 gap-6 md:gap-row-8 md:gap-column-6">
        {products.map((product) => (
          <ProductItem
            key={product.name}
            category={product.category}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </section>
    </div>
  );
}
