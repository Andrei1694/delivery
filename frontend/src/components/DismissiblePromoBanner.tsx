import { useState } from 'react';
import SymbolIcon from './SymbolIcon';

export default function DismissiblePromoBanner({
  icon,
  title,
  subtitle,
  className = '',
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (!title || !subtitle || isDismissed) {
    return null;
  }

  return (
    <div
      className={[
        'grid origin-top overflow-hidden transition-all duration-300 ease-out',
        isClosing
          ? 'pointer-events-none grid-rows-[0fr] -translate-y-2 opacity-0'
          : 'grid-rows-[1fr] translate-y-0 opacity-100',
        className,
      ].join(' ')}
      onTransitionEnd={(event) => {
        if (event.target !== event.currentTarget || !isClosing) {
          return;
        }

        setIsDismissed(true);
      }}
    >
      <div className="min-h-0">
        <div className="relative overflow-hidden rounded-xl bg-tertiary p-3 text-on-tertiary shadow-[0_12px_28px_rgba(130,62,155,0.18)]">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.28),transparent_70%)]" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/16 ring-1 ring-white/18">
                <SymbolIcon name={icon} className="text-xl" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-headline text-sm font-bold leading-none">{title}</h2>
                <p className="mt-0.5 text-[10px] text-on-tertiary/90">{subtitle}</p>
              </div>
            </div>

            <button
              type="button"
              className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/12 transition-all duration-200 hover:bg-white/18 active:scale-90"
              aria-label={`Dismiss ${title}`}
              onClick={() => setIsClosing(true)}
            >
              <SymbolIcon name="close" className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
