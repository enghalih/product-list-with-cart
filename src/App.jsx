import ProductList from "./ProductList";
import CartList from "./CartList";
import products from "./data.json";
import { CartProvider } from "./contexts/CartProvider";

function App() {
  return (
    <CartProvider>
      <div className="p-6 md:p-10 xl:p-22 grid gap-8 lg:grid-cols-3">
        <ProductList products={products} className="lg:col-span-2" />
        <CartList products={products} />
      </div>
    </CartProvider>
  );
}

export default App;
