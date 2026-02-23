const InputGroup = ({ label, id, type = "text", placeholder, ...props }) => {
  return (
    <div className="grid gap-2 text-start">
      <label className="text-preset-4 bold text-rose-900" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-4 py-3 rounded-lg border border-rose-300 focus:outline-none focus:border-primary-red transition-all"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default InputGroup;
