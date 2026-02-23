const TakeawayToggle = ({ isTakeaway, onToggle }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-preset-3 text-rose-900">Makanan dibungkus?</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
          isTakeaway ? "bg-primary-red" : "bg-rose-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isTakeaway ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default TakeawayToggle;
