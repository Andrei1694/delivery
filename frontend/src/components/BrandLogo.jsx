const BrandLogo = ({ className = '', title = 'Daily Crave', subtitle = 'Fresh picks, faster checkout' }) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-container text-base font-bold text-on-primary-container"
        aria-hidden
      >
        DC
      </div>
      <div className="flex flex-col">
        <p className="font-display text-2xl font-bold uppercase tracking-[0.18em] text-on-surface">
          {title}
        </p>
        <p className="leading-none text-sm text-on-surface-variant">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default BrandLogo;
