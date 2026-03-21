import { Link } from '@tanstack/react-router';

const iconStyle = { fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" };
const filledIconStyle = { fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" };

/**
 * @param {{ navItems: Array<{ label: string, icon: string, to?: string }> }} props
 */
export default function BottomNav({ navItems }) {
  return (
    <nav className="fixed bottom-0 z-50 flex w-full items-center justify-around px-6 pb-8 pointer-events-none">
      <div className="mx-auto flex w-full max-w-md items-center justify-around overflow-hidden rounded-full border border-surface-container bg-surface/80 shadow-[0_8px_32px_color-mix(in_srgb,var(--color-on-surface)_12%,transparent)] backdrop-blur-xl pointer-events-auto dark:bg-on-surface/80">
        {navItems.map((item) =>
          item.to ? (
            <Link
              key={item.label}
              className="flex flex-col items-center justify-center p-4 transition-all hover:bg-surface-container active:scale-90 dark:hover:bg-surface/10"
              to={item.to}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined ${isActive ? 'text-primary' : 'text-on-surface'}`}
                    style={isActive ? filledIconStyle : iconStyle}
                  >
                    {item.icon}
                  </span>
                  <span className={`mt-1 font-body text-[10px] font-bold uppercase tracking-wide ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              className="flex flex-col items-center justify-center p-4 text-on-surface transition-all hover:bg-surface-container active:scale-90 dark:hover:bg-surface/10"
            >
              <span className="material-symbols-outlined" style={iconStyle}>{item.icon}</span>
              <span className="mt-1 font-body text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">
                {item.label}
              </span>
            </button>
          ),
        )}

      </div>
    </nav>
  );
}
