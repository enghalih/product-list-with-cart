import { useContext } from "react";
import OrderTabs from "./OrderTabs";
import InputGroup from "./InputGroup";
import TakeawayToggle from "./TakeawayToggle";
import { CartContext } from "../contexts/CartContext";

const OrderForm = () => {
  const {
    customerName,
    customerPhone,
    tableNumber,
    orderType,
    peopleCount,
    orderDate,
    isTakeaway,
    setCustomerName,
    setCustomerPhone,
    setTableNumber,
    setOrderType,
    setPeopleCount,
    setOrderDate,
    setIsTakeaway,
  } = useContext(CartContext);

  return (
    <div className="grid gap-6">
      <OrderTabs activeTab={orderType} onTabChange={setOrderType} />

      <div className="grid gap-4">
        <InputGroup
          label="Nama"
          id="name"
          placeholder="Masukkan nama Anda"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <InputGroup
          label="Nomor Telepon"
          id="phone"
          type="tel"
          placeholder="08xxxxxxxxxx"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
        />

        {/* Conditional Field: Nomor Meja (Order Only) */}
        {orderType === "order" && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <InputGroup
              label="Nomor Meja"
              id="table"
              placeholder="Contoh: A1"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
          </div>
        )}

        {/* Conditional Fields: Jumlah Orang & Tanggal (Pre-Order Only) */}
        {orderType === "pre-order" && (
          <div className="grid gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <InputGroup
              label="Jumlah Orang"
              id="people"
              type="number"
              placeholder="Berapa orang?"
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
            />
            <InputGroup
              label="Tanggal"
              id="date"
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
        )}

        <TakeawayToggle
          isTakeaway={isTakeaway}
          onToggle={() => setIsTakeaway(!isTakeaway)}
        />
      </div>
    </div>
  );
};

export default OrderForm;
