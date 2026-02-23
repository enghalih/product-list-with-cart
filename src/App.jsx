import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./ProductList";
import CartList from "./CartList";
import products from "./data.json";
import { CartProvider } from "./contexts/CartProvider";
import AdminLayout from "./layouts/AdminLayout";
import Overview from "./pages/admin/Overview";
import Orders from "./pages/admin/Orders";
import MenuManagement from "./pages/admin/MenuManagement";
import Laporan from "./pages/admin/Laporan";

const ClientMenu = () => (
  <main className="p-6 md:p-10 xl:p-22 grid gap-8 lg:grid-cols-3 mb-15">
    <ProductList products={products} className="lg:col-span-2" />
    <CartList products={products} />
  </main>
);

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<ClientMenu />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/ringkasan" replace />} />
          <Route path="ringkasan" element={<Overview />} />
          <Route path="pesanan" element={<Orders />} />
          <Route path="menu" element={<MenuManagement />} />
          <Route path="laporan" element={<Laporan />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
