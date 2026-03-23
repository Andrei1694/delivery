import type { CSSProperties } from 'react';

const iconStyle: CSSProperties = { fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" };
const filledIconStyle: CSSProperties = { fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" };

type SymbolIconProps = {
  name: string;
  className?: string;
  filled?: boolean;
};

export default function SymbolIcon({ name, className = '', filled = false }: SymbolIconProps) {
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
