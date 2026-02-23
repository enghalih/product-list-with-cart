import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import { Menu, X } from "lucide-react";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-[2px] transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Position handled in Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 -ml-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-600"
              aria-label="Toggle Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-primary-red">enghalih</h1>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
            Admin
          </p>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-10 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
