const OrderTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "order", label: "Order" },
    { id: "pre-order", label: "Pre-Order" },
  ];

  return (
    <div className="flex gap-8 border-b border-rose-100 pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative pb-2 text-preset-3 transition-colors cursor-pointer ${
            activeTab === tab.id ? "text-rose-900" : "text-rose-400"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute -bottom-px left-0 w-full h-0.75 bg-primary-red rounded-full animate-in fade-in zoom-in duration-300" />
          )}
        </button>
      ))}
    </div>
  );
};

export default OrderTabs;
