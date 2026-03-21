const iconStyle = { fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" };
const filledIconStyle = { fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" };

export default function SymbolIcon({ name, className = '', filled = false }) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`.trim()}
      style={filled ? filledIconStyle : iconStyle}
    >
      {name}
    </span>
  );
}
