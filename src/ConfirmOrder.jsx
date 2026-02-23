import { useEffect, useContext, useState } from "react";
import OrderIcon from "./assets/images/icon-order-confirmed.svg";
import Button from "./components/Button";
import ConfirmItem from "./ConfirmItem";
import OrderForm from "./components/OrderForm";
import formatPrice from "./components/formatterPrice";
import closeIcon from "./assets/close-icon.svg";
import { CartContext } from "./contexts/CartContext";

export default function ConfirmOrder({
  cart,
  products,
  isOpen,
  onClose,
  totalPrice,
}) {
  const {
    customerName,
    customerPhone,
    tableNumber,
    orderType,
    peopleCount,
    orderDate,
    clearCart,
  } = useContext(CartContext);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!customerName.trim()) newErrors.customerName = "Nama wajib diisi";
    if (!customerPhone.trim())
      newErrors.customerPhone = "Nomor telepon wajib diisi";
    if (orderType === "order" && !tableNumber.trim())
      newErrors.tableNumber = "Nomor meja wajib diisi";
    if (orderType === "pre-order") {
      if (!peopleCount) newErrors.peopleCount = "Jumlah orang wajib diisi";
      if (!orderDate) newErrors.orderDate = "Tanggal wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = () => {
    if (validate()) {
      setIsConfirmed(true);
    } else {
      // Scroll to first error or just alert?
      alert("Harap lengkapi semua informasi yang diperlukan.");
    }
  };

  const handleStartNewOrder = () => {
    clearCart();
    setIsConfirmed(false);
    onClose();
  };

  const handleClose = () => {
    setIsConfirmed(false);
    setErrors({});
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="bg-[hsla(0,0%,0%,0.5)] z-20 overflow-y-auto fixed inset-0 flex sm:items-center items-start justify-center"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white grid gap-8 py-10 px-6 sm:px-10 sm:rounded-2xl w-full max-w-xl min-h-screen sm:min-h-0 h-fit transition-all animate-in fade-in slide-in-from-bottom-5 sm:zoom-in-95 duration-300"
      >
        {!isConfirmed ? (
          // STEP 1: FILLING ORDER DETAILS
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-preset-2 text-rose-900">Informasi Pesanan</h2>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 hover:bg-rose-50 rounded-full transition-colors"
                aria-label="Tutup"
              >
                <img src={closeIcon} alt="" className="w-4 h-4" />
              </button>
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
                <p>Harap lengkapi data berikut:</p>
                <ul className="list-disc list-inside mt-1">
                  {Object.values(errors).map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <OrderForm />

            <div className="grid gap-4 mt-2">
              <p className="text-preset-4 text-rose-500 font-bold">
                Review Pesanan
              </p>
              <div className="bg-rose-50 rounded-xl overflow-hidden">
                <ul className="divide-y divide-rose-100 max-h-48 overflow-y-auto px-4">
                  {cart.map((item) => (
                    <li key={item.name} className="py-3">
                      <div className="flex justify-between items-center text-sm">
                        <div className="grid">
                          <span className="font-bold text-rose-900">
                            {item.name}
                          </span>
                          <span className="text-primary-red font-semibold">
                            {item.quantity}x
                          </span>
                        </div>
                        <span className="text-rose-500">
                          {formatPrice(
                            products.find((p) => p.name === item.name).price *
                              item.quantity,
                          )}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-rose-100/50 flex justify-between items-center">
                  <span className="text-preset-4 font-medium">Total Bayar</span>
                  <span className="text-preset-2 font-bold text-rose-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <Button onClick={handleConfirmOrder}>Konfrimasi & Bayar</Button>
          </>
        ) : (
          // STEP 2: ORDER SUCCESS (CONFIRMED)
          <>
            <div className="grid gap-6">
              <div className="flex justify-between items-start">
                <img
                  src={OrderIcon}
                  alt="Order Confirmed"
                  className="w-12 h-12"
                />
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 hover:bg-rose-50 rounded-full transition-colors"
                  aria-label="Tutup"
                >
                  <img src={closeIcon} alt="" className="w-4 h-4" />
                </button>
              </div>
              <div className="grid gap-2">
                <h2 className="text-preset-1 text-rose-900">Order Confirmed</h2>
                <p className="text-preset-4 text-rose-400">
                  Terima kasih, <strong>{customerName}</strong>! Pesanan Anda
                  sedang diproses.
                </p>
              </div>
            </div>

            <div className="bg-rose-50 rounded-2xl p-6 grid gap-4">
              <div className="grid gap-2 text-sm border-b border-rose-100 pb-4">
                <div className="flex justify-between">
                  <span className="text-rose-400">Nomor Telepon</span>
                  <span className="font-bold text-rose-900">
                    {customerPhone}
                  </span>
                </div>
                {orderType === "order" ? (
                  <div className="flex justify-between">
                    <span className="text-rose-400">Nomor Meja</span>
                    <span className="font-bold text-rose-900">
                      {tableNumber}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-rose-400">Tanggal Pre-Order</span>
                      <span className="font-bold text-rose-900">
                        {orderDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-rose-400">Jumlah Orang</span>
                      <span className="font-bold text-rose-900">
                        {peopleCount} orang
                      </span>
                    </div>
                  </>
                )}
              </div>

              <ul className="grid gap-4">
                {cart.map((item) => (
                  <ConfirmItem
                    key={item.name}
                    name={item.name}
                    quantity={item.quantity}
                    products={products}
                  />
                ))}
              </ul>

              <div className="flex justify-between items-center pt-2 border-t border-rose-100">
                <p className="text-preset-4">Order Total</p>
                <p className="text-preset-2 font-bold text-rose-900">
                  {formatPrice(totalPrice)}
                </p>
              </div>
            </div>

            <Button onClick={handleStartNewOrder}>Mulai Pesanan Baru</Button>
          </>
        )}
      </div>
    </div>
  );
}
