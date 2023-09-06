function InputField({
  label,
  type,
  required,
  name,
  value,
  disabled,
  handleChange,
}) {
  return (
    <div className="w-full">
      <label
        className="block h-6 uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <input
        type={type}
        required={required}
        name={name}
        className={`border-0 px-2 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 focus:ring-blue-500 focus:border-blue-500  ${
          required && "ring-4 ring-red-500"
        }`}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}

export default InputField;
