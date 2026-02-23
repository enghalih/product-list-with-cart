import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Utensils,
  X,
  ChevronDown,
  Filter,
} from "lucide-react";
import { MENU_MOCK } from "../../constants/mockData";
import formatPrice from "../../components/formatterPrice";

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && (
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState(MENU_MOCK);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua Kategori");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'delete'
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Waffle",
    price: "",
    stock: "",
  });

  const categories = [
    "Waffle",
    "Crème Brûlée",
    "Macaron",
    "Tiramisu",
    "Baklava",
    "Pie",
    "Cake",
    "Brownie",
    "Panna Cotta",
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "Semua Kategori" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchQuery, categoryFilter]);

  const toggleStatus = (name) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.name === name) {
          const newStatus =
            item.status === "Available" ? "Sold Out" : "Available";
          return {
            ...item,
            status: newStatus,
            stock: newStatus === "Available" ? 10 : 0,
          };
        }
        return item;
      }),
    );
  };

  const handleOpenModal = (mode, item = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    if (mode === "edit" && item) {
      setFormData({
        name: item.name,
        category: item.category,
        price: item.price,
        stock: item.stock,
      });
    } else {
      setFormData({ name: "", category: "Waffle", price: "", stock: "" });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (modalMode === "add") {
      const newItem = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        status: Number(formData.stock) > 0 ? "Available" : "Sold Out",
      };
      setMenuItems([...menuItems, newItem]);
    } else if (modalMode === "edit") {
      setMenuItems(
        menuItems.map((item) =>
          item.name === selectedItem.name
            ? {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                status: Number(formData.stock) > 0 ? "Available" : "Sold Out",
              }
            : item,
        ),
      );
    } else if (modalMode === "delete") {
      setMenuItems(menuItems.filter((item) => item.name !== selectedItem.name));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="grid gap-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Kelola Menu</h2>
          <p className="text-gray-500 mt-1">Update menu, stok, dan harga.</p>
        </div>
        <button
          onClick={() => handleOpenModal("add")}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-red text-white font-bold rounded-xl hover:bg-primary-red/90 transition-all shadow-md shadow-red-100"
        >
          <Plus className="w-5 h-5" />
          Tambah Menu Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-red/20 focus:border-primary-red transition-all w-full shadow-sm"
            />
          </div>
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-9 pr-10 py-2 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-red/20 transition-all shadow-sm appearance-none min-w-[180px]"
            >
              <option>Semua Kategori</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 uppercase text-[10px] font-bold tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Menu</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4 text-right">Harga</th>
                <th className="px-6 py-4 text-center">Stok</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredItems.map((item) => (
                <tr
                  key={item.name}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-primary-red">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-gray-900">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-500 text-sm">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-gray-900">
                      {formatPrice(item.price)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`text-sm font-medium ${item.stock === 0 ? "text-red-500" : "text-gray-500"}`}
                    >
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(item.name)}
                      className="flex items-center gap-2 group/toggle"
                    >
                      {item.status === "Available" ? (
                        <ToggleRight className="w-8 h-8 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-gray-300" />
                      )}
                      <span
                        className={`text-xs font-bold ${item.status === "Available" ? "text-green-600" : "text-gray-400"}`}
                      >
                        {item.status === "Available" ? "Tersedia" : "Habis"}
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleOpenModal("edit", item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-gray-100 hover:border-blue-200 shadow-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenModal("delete", item)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all border border-gray-100 hover:border-red-200 shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredItems.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-gray-400 font-medium">
                Tidak ada menu yang ditemukan.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Add/Edit */}
      <Modal
        isOpen={isModalOpen && modalMode !== "delete"}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "Tambah Menu Baru" : "Edit Menu"}
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gray-700"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 text-sm font-bold bg-primary-red text-white rounded-xl hover:bg-primary-red/90 shadow-md shadow-red-100"
            >
              Simpan
            </button>
          </>
        }
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Nama Menu
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-red/20 focus:border-primary-red outline-none"
              placeholder="Contoh: Waffle Chocolate"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Kategori
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Harga
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
                placeholder="Rp"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Stok
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal Confirmation Delete */}
      <Modal
        isOpen={isModalOpen && modalMode === "delete"}
        onClose={() => setIsModalOpen(false)}
        title="Konfirmasi Hapus"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gray-700"
            >
              Tidak, Batal
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 text-sm font-bold bg-red-600 text-white rounded-xl hover:bg-red-700"
            >
              Ya, Hapus
            </button>
          </>
        }
      >
        <p className="text-gray-600">
          Apakah Anda yakin ingin menghapus menu{" "}
          <span className="font-bold text-gray-900">{selectedItem?.name}</span>?
          Tindakan ini tidak dapat dibatalkan.
        </p>
      </Modal>
    </div>
  );
}
