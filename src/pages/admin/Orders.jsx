import { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  ChefHat,
  Banknote,
  MoreVertical,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { ORDERS_MOCK } from "../../constants/mockData";
import formatPrice from "../../components/formatterPrice";

const STATUS_CONFIG = {
  Pending: {
    color: "bg-orange-50 text-orange-600 border-orange-200",
    icon: Clock,
    label: "Menunggu",
  },
  Preparing: {
    color: "bg-blue-50 text-blue-600 border-blue-200",
    icon: ChefHat,
    label: "Dimasak",
  },
  Ready: {
    color: "bg-green-50 text-green-600 border-green-200",
    icon: CheckCircle2,
    label: "Siap Saji",
  },
  Paid: {
    color: "bg-purple-50 text-purple-600 border-purple-200",
    icon: Banknote,
    label: "Selesai",
  },
};

const OrderCard = ({ order, onStatusChange }) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const menuRef = useRef(null);
  const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.Pending;
  const StatusIcon = config.icon;

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowStatusMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:border-primary-red/20 transition-all duration-300">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {order.id}
          </span>
          <h4 className="text-lg font-bold text-gray-900">
            {order.customerName}
          </h4>
        </div>
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${config.color}`}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          {config.label}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex gap-2 items-center">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${order.type === "Pre-Order" ? "bg-indigo-100 text-indigo-700" : "bg-amber-100 text-amber-700"}`}
            >
              {order.type}
            </span>
            <span className="text-gray-500 font-medium">
              {order.table ? `Meja ${order.table}` : `${order.people} Orang`}
            </span>
          </div>
          <span className="text-gray-400 text-xs text-right">
            {new Date(order.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-gray-600 font-medium flex gap-2">
                <span className="font-bold text-gray-900">
                  {item.quantity}x
                </span>{" "}
                {item.name}
              </span>
              <span className="text-gray-400 text-xs">
                {formatPrice(item.price)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 border-t border-gray-50 bg-gray-50/30 flex justify-between items-center relative">
        <p className="text-md font-bold text-primary-red">
          {formatPrice(order.totalPrice)}
        </p>
        <div className="flex gap-2" ref={menuRef}>
          <button
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all shadow-none hover:shadow-sm"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>

          {showStatusMenu && (
            <div className="absolute bottom-16 right-5 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Update Status
              </p>
              {Object.keys(STATUS_CONFIG).map((statusKey) => (
                <button
                  key={statusKey}
                  onClick={() => {
                    onStatusChange(order.id, statusKey);
                    setShowStatusMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-50 flex items-center gap-2 ${order.status === statusKey ? "text-primary-red" : "text-gray-600"}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${STATUS_CONFIG[statusKey].color.split(" ")[0]}`}
                  />
                  {STATUS_CONFIG[statusKey].label}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              const statuses = ["Pending", "Preparing", "Ready", "Paid"];
              const nextStatus =
                statuses[
                  (statuses.indexOf(order.status) + 1) % statuses.length
                ];
              onStatusChange(order.id, nextStatus);
            }}
            className="px-4 py-2 bg-primary-red text-white text-xs font-bold rounded-lg hover:bg-primary-red/90 transition-all shadow-sm"
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Orders() {
  const [orders, setOrders] = useState(ORDERS_MOCK);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="grid gap-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Pesanan Masuk</h2>
          <p className="text-gray-500 mt-1">Kelola antrean pesanan di dapur.</p>
        </div>
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pesanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-red/20 focus:border-primary-red transition-all w-full shadow-sm"
            />
          </div>
          <div className="relative self-start">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-9 pr-8 py-2 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-red/20 transition-all shadow-sm appearance-none"
            >
              <option value="All">Semua Status</option>
              <option value="Pending">Menunggu</option>
              <option value="Preparing">Dimasak</option>
              <option value="Ready">Siap Saji</option>
              <option value="Paid">Selesai</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-20 rounded-2xl border border-gray-100 text-center">
          <p className="text-gray-400 font-medium">
            Tidak ada pesanan yang sesuai kriteria.
          </p>
        </div>
      )}
    </div>
  );
}
