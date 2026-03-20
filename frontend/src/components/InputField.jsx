const InputField = ({
  label,
  id,
  name,
  type,
  placeholder,
  icon,
  value,
  onChange,
  onBlur,
  showVisibilityToggle,
  error,
  ...inputProps
}) => {
  const withIcon = Boolean(icon);
  const inputPaddingClass = withIcon ? 'pl-10 pr-3' : 'px-3';

  return (
    <div className="group">
      <label className="mb-1.5 ml-1 block text-sm font-medium text-cusens-text-primary" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        {withIcon ? (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-cusens-text-secondary">
            <span className="text-sm font-semibold">{icon}</span>
          </div>
        ) : null}
        <input
          className={`block w-full rounded-xl border border-cusens-border bg-cusens-surface py-3 leading-5 text-cusens-text-primary placeholder-cusens-text-secondary/70 transition duration-200 ease-in-out focus:border-cusens-primary focus:outline-none focus:ring-2 focus:ring-cusens-primary sm:text-sm ${inputPaddingClass}`.trim()}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...inputProps}
        />
        {showVisibilityToggle && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            <span className="text-xs text-cusens-text-secondary">SHOW</span>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600 ml-1">{error}</p>}
    </div>
  );
};

export default InputField;
