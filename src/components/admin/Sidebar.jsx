import { NavLink } from "react-router-dom";
import {
  ClipboardList,
  UtensilsCrossed,
  FileText,
  LayoutDashboard,
  X,
  ExternalLink,
} from "lucide-react";

const NAV_LINKS = [
  { name: "Ringkasan", path: "/admin/ringkasan", icon: LayoutDashboard },
  { name: "Pesanan Masuk", path: "/admin/pesanan", icon: ClipboardList },
  { name: "Kelola Menu", path: "/admin/menu", icon: UtensilsCrossed },
  { name: "Laporan", path: "/admin/laporan", icon: FileText },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`
        fixed md:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 
        flex flex-col z-50 transition-transform duration-300 ease-in-out w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-red flex items-center gap-2">
            <UtensilsCrossed className="w-8 h-8" />
            enghalih
          </h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">
            Admin Dashboard
          </p>
        </div>
        {/* Close Button - Mobile Only */}
        <button
          onClick={onClose}
          className="md:hidden p-2 -mr-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-500"
          aria-label="Close Sidebar"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => {
              if (window.innerWidth < 768) onClose();
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-primary-red text-white shadow-md shadow-red-100"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <link.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-100">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-primary-red transition-all group"
        >
          <ExternalLink className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
          <span className="text-sm font-semibold">Lihat Menu Client</span>
        </NavLink>
      </div>
    </aside>
  );
}
