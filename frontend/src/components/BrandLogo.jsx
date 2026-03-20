const sizeMap = {
  sm: {
    badge: 'h-9 w-9 text-xs',
    title: 'text-base',
    subtitle: 'text-[11px]',
  },
  md: {
    badge: 'h-11 w-11 text-sm',
    title: 'text-lg',
    subtitle: 'text-xs',
  },
  lg: {
    badge: 'h-14 w-14 text-base',
    title: 'text-2xl',
    subtitle: 'text-sm',
  },
};

const BrandLogo = ({ size = 'md', className = '', title = 'Auth Starter', subtitle = 'Template' }) => {
  const token = sizeMap[size] ?? sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <div
        className={`flex shrink-0 items-center justify-center rounded-full bg-cusens-primary font-bold text-cusens-text-primary ${token.badge}`}
        aria-hidden
      >
        AS
      </div>
      <div className="flex flex-col">
        <p className={`font-display font-bold uppercase tracking-[0.18em] text-cusens-text-primary ${token.title}`.trim()}>
          {title}
        </p>
        <p className={`leading-none text-cusens-text-secondary ${token.subtitle}`.trim()}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default BrandLogo;
