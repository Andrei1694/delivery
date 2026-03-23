import type { ReactNode } from 'react';
import SymbolIcon from './SymbolIcon';

type FilterChipProps = {
  label: ReactNode;
  icon?: string;
  iconFilled?: boolean;
  active?: boolean;
  onClick?: () => void;
};

export default function FilterChip({
  label,
  icon,
  iconFilled = false,
  active = false,
  onClick,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-transform active:scale-95 whitespace-nowrap'
          : 'flex shrink-0 items-center gap-2 rounded-full bg-surface-container-high px-5 py-2.5 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-variant whitespace-nowrap'
      }
    >
      {icon && <SymbolIcon name={icon} className="text-[18px]" filled={iconFilled} />}
      {label}
    </button>
  );
}
