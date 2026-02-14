import ProductItem from "./ProductItem";

export default function ProductList({ products, className }) {
  return (
    <div className={`${className} grid gap-8`} >
      <h2 className="text-preset-1 text-rose-900">Desserts</h2>
      <div className="grid md:grid-cols-3 gap-6 md:gap-row-8 md:gap-column-6">
        {products.map((product, index) => (
          <ProductItem
            key={index}
            category={product.category}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
