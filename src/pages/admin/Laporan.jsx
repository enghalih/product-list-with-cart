import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  ShoppingBag,
  Receipt,
  Star,
  Download,
  FileText,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { ORDERS_MOCK } from "../../constants/mockData";
import formatPrice from "../../components/formatterPrice";

// ─── Color Palette ───────────────────────────────────────────────────────────
const CHART_COLORS = {
  primary: "#6366f1", // Indigo
  success: "#10b981", // Emerald
  warning: "#f59e0b", // Amber
  danger: "#ef4444", // Red
  purple: "#8b5cf6", // Violet
};
const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#8b5cf6"];

// ─── Date Filter Logic ────────────────────────────────────────────────────────
const DATE_RANGES = {
  "7 Hari Terakhir": 7,
  "30 Hari Terakhir": 30,
  "Bulan Ini": null,
};

function getFilteredOrders(range) {
  const now = new Date("2026-02-18T23:59:59Z");
  return ORDERS_MOCK.filter((order) => {
    const orderDate = new Date(order.timestamp);
    if (range === "Bulan Ini") {
      return (
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
      );
    }
    const days = DATE_RANGES[range];
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - days);
    return orderDate >= cutoff;
  });
}

// ─── Revenue Trend Data ───────────────────────────────────────────────────────
function buildTrendData(orders, range) {
  const days = range === "Bulan Ini" ? 30 : DATE_RANGES[range];
  const now = new Date("2026-02-18T00:00:00Z");
  const map = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });
    map[key] = 0;
  }
  orders.forEach((o) => {
    const d = new Date(o.timestamp);
    const key = d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });
    if (key in map) map[key] += o.totalPrice;
  });
  return Object.entries(map).map(([date, revenue]) => ({ date, revenue }));
}

// ─── Top 5 Menu ───────────────────────────────────────────────────────────────
function buildTopMenu(orders) {
  const map = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!map[item.name])
        map[item.name] = { qty: 0, revenue: 0, price: item.price };
      map[item.name].qty += item.quantity;
      map[item.name].revenue += item.quantity * item.price;
    });
  });
  return Object.entries(map)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);
}

// ─── Order Type Distribution ──────────────────────────────────────────────────
function buildOrderTypes(orders) {
  const map = {};
  orders.forEach((o) => {
    map[o.type] = (map[o.type] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-xl p-4 text-sm">
        <p className="font-bold text-gray-700 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">
            {p.name === "revenue" ? formatPrice(p.value) : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Summary Card ─────────────────────────────────────────────────────────────
const SummaryCard = ({ title, value, icon: Icon, color, bgColor, trend }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${bgColor}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      {trend !== undefined && (
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          <ArrowUpRight className="w-3 h-3" />
          {trend}%
        </span>
      )}
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
        {title}
      </p>
      <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Laporan() {
  const [dateRange, setDateRange] = useState("30 Hari Terakhir");

  const filtered = useMemo(() => getFilteredOrders(dateRange), [dateRange]);
  const paidOrders = useMemo(
    () => filtered.filter((o) => o.status === "Paid"),
    [filtered],
  );

  const totalRevenue = useMemo(
    () => paidOrders.reduce((s, o) => s + o.totalPrice, 0),
    [paidOrders],
  );
  const totalOrders = paidOrders.length;
  const avgTicket =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const topMenu = useMemo(() => buildTopMenu(paidOrders), [paidOrders]);
  const favoriteMenu = topMenu[0]?.name ?? "-";

  const trendData = useMemo(
    () => buildTrendData(paidOrders, dateRange),
    [paidOrders, dateRange],
  );
  const orderTypeData = useMemo(
    () => buildOrderTypes(paidOrders),
    [paidOrders],
  );

  return (
    <div className="grid gap-8 pb-20">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Laporan Analitik</h2>
          <p className="text-gray-500 mt-1">
            Pantau performa bisnis secara mendalam.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Date Filter */}
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-9 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm appearance-none"
            >
              {Object.keys(DATE_RANGES).map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          {/* Export Button */}
          <button
            onClick={() => alert("Fitur ekspor akan segera hadir!")}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 text-sm"
          >
            <Download className="w-4 h-4" />
            Ekspor Laporan
          </button>
        </div>
      </div>

      {/* ── Summary Tiles ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard
          title="Total Penjualan"
          value={formatPrice(totalRevenue)}
          icon={TrendingUp}
          color="text-indigo-600"
          bgColor="bg-indigo-50"
          trend={12.5}
        />
        <SummaryCard
          title="Jumlah Pesanan"
          value={totalOrders}
          icon={ShoppingBag}
          color="text-emerald-600"
          bgColor="bg-emerald-50"
          trend={8.2}
        />
        <SummaryCard
          title="Rata-rata Pesanan"
          value={formatPrice(avgTicket)}
          icon={Receipt}
          color="text-amber-600"
          bgColor="bg-amber-50"
        />
        <SummaryCard
          title="Menu Favorit"
          value={favoriteMenu}
          icon={Star}
          color="text-violet-600"
          bgColor="bg-violet-50"
        />
      </div>

      {/* ── Charts Row 1: Trend + Pie ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-w-0">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Tren Penjualan</h3>
            <span className="text-xs text-gray-400 font-medium">
              {dateRange}
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trendData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={CHART_COLORS.primary}
                      stopOpacity={0.15}
                    />
                    <stop
                      offset="95%"
                      stopColor={CHART_COLORS.primary}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F3F4F6"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  interval={dateRange === "30 Hari Terakhir" ? 4 : 0}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  tickFormatter={(v) => `${v / 1000}k`}
                  width={45}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="revenue"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={2.5}
                  fill="url(#revenueGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: CHART_COLORS.primary }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Type Donut */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Tipe Pesanan</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {orderTypeData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-2 mt-2">
            {orderTypeData.map((entry, i) => (
              <div
                key={entry.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: PIE_COLORS[i % PIE_COLORS.length],
                    }}
                  />
                  <span className="text-gray-600 font-medium">
                    {entry.name}
                  </span>
                </div>
                <span className="font-bold text-gray-900">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Top 5 Menu ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <div className="p-2 bg-amber-50 rounded-lg">
            <Star className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Top 5 Menu Terlaris
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 uppercase text-[10px] font-bold tracking-widest border-b border-gray-100">
                <th className="px-6 py-3">Peringkat</th>
                <th className="px-6 py-3">Nama Menu</th>
                <th className="px-6 py-3 text-center">Qty Terjual</th>
                <th className="px-6 py-3 text-right">Total Pendapatan</th>
                <th className="px-6 py-3">Popularitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {topMenu.map((item, i) => {
                const maxQty = topMenu[0]?.qty || 1;
                const pct = Math.round((item.qty / maxQty) * 100);
                const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];
                return (
                  <tr
                    key={item.name}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-xl">{medals[i]}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">
                        {item.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-indigo-600 text-lg">
                        {item.qty}
                      </span>
                      <span className="text-gray-400 text-xs ml-1">porsi</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-gray-900">
                        {formatPrice(item.revenue)}
                      </span>
                    </td>
                    <td className="px-6 py-4 w-48">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-indigo-500 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-500 w-8 text-right">
                          {pct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {topMenu.length === 0 && (
            <div className="p-16 text-center">
              <p className="text-gray-400 font-medium">
                Tidak ada data untuk periode ini.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Revenue by Category Bar Chart ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Pendapatan per Menu (Top 5)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topMenu}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#F3F4F6"
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 11 }}
                tickFormatter={(v) => `${v / 1000}k`}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#374151", fontSize: 12, fontWeight: 600 }}
                width={160}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="revenue"
                name="revenue"
                fill={CHART_COLORS.success}
                radius={[0, 6, 6, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
