const InputField = ({
  label,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  ...inputProps
}) => {
  return (
    <div className="group">
      <label className="mb-1.5 ml-1 block text-sm font-medium text-on-surface" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          className="block w-full rounded-2xl border border-outline-variant bg-surface-container-lowest px-4 py-3 leading-5 text-on-surface placeholder:text-on-surface-variant/70 transition duration-200 ease-in-out focus:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...inputProps}
        />
      </div>
      {error && <p className="ml-1 mt-1 text-sm text-error-dim">{error}</p>}
    </div>
  );
};

export default InputField;
