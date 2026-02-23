import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, ShoppingCart, Star, Users } from "lucide-react";
import { ORDERS_MOCK, REVENUE_MOCK } from "../../constants/mockData";
import formatPrice from "../../components/formatterPrice";

const SummaryCard = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {Icon ? <Icon className="w-6 h-6 text-white" /> : null}
        </div>
        {trend && (
          <span
            className={`text-sm font-bold px-2 py-1 rounded-full ${trend > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value || 0}</h3>
      </div>
    </div>
  );
};

export default function Overview() {
  const totalRevenue = ORDERS_MOCK.reduce(
    (sum, order) => sum + order.totalPrice,
    0,
  );
  const todayOrders = ORDERS_MOCK.length;

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Ringkasan Performa</h2>
        <p className="text-gray-500 mt-1">
          Pantau bisnis Anda secara real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Pendapatan"
          value={formatPrice(totalRevenue)}
          icon={TrendingUp}
          trend={12.5}
          color="bg-primary-red"
        />
        <SummaryCard
          title="Pesanan Hari Ini"
          value={todayOrders}
          icon={ShoppingCart}
          trend={8.2}
          color="bg-blue-500"
        />
        <SummaryCard
          title="Menu Terlaris"
          value="Waffle with Berries"
          icon={Star}
          color="bg-yellow-500"
        />
        <SummaryCard
          title="Meja Aktif"
          value="12/20"
          icon={Users}
          color="bg-green-500"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Tren Penjualan (7 Hari Terakhir)
          </h3>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_MOCK}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F3F4F6"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  tickFormatter={(value) => `Rp ${value / 1000}k`}
                />
                <Tooltip
                  cursor={{ fill: "#F9FAFB" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value) => [formatPrice(value), "Pendapatan"]}
                />
                <Bar
                  dataKey="income"
                  fill="#C73B0F"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Pesanan Terbaru
          </h3>
          <div className="grid gap-4">
            {ORDERS_MOCK.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {order.customerName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.id} • {order.items.length} Item
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-red text-sm">
                    {formatPrice(order.totalPrice)}
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    {new Date(order.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
