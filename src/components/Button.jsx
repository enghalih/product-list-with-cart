export default function Button({ onClick, children, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-primary-red h-min p-4 rounded-full min-w-40 flex justify-center text-white text-preset-3 hover:bg-primary-red-hover ${className}`}
    >
      {children}
    </button>
  );
}