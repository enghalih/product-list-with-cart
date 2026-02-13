import ProductList from "./ProductList";
import Cart from "./Cart";
import products from "./data.json";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="p-6 md:p-10 xl:p-22 grid gap-8 lg:grid-cols-3">
      <ProductList products={products} className="lg:col-span-2"/>
      <Cart />
    </div>
  );
}

export default App;
