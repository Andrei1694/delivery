import type { ReactNode } from 'react';
import SymbolIcon from './SymbolIcon';

type PageHeaderProps = {
  title: ReactNode;
  onBack?: () => void;
  rightAction?: ReactNode;
  sticky?: boolean;
};

export default function PageHeader({ title, onBack, rightAction, sticky = false }: PageHeaderProps) {
  return (
    <header
      className={`${sticky ? 'sticky' : 'fixed'} top-0 z-50 w-full bg-surface/70 backdrop-blur-xl border-b border-surface-container`}
    >
      <div className="mx-auto flex w-full max-w-lg items-center justify-between px-6 py-4">
        <div className="w-10">
          {onBack && (
            <button
              aria-label="Go back"
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary duration-200 hover:bg-surface-container-low active:scale-95"
              type="button"
              onClick={onBack}
            >
              <SymbolIcon name="arrow_back" />
            </button>
          )}
        </div>

        <h1 className="font-headline text-xl font-bold tracking-tight text-on-surface">
          {title}
        </h1>

        <div className="flex w-10 justify-end">
          {rightAction}
        </div>
      </div>
    </header>
  );
}
