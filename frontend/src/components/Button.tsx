import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const Button = ({
  children,
  type = 'button',
  className = '',
  ...buttonProps
}: ButtonProps) => {
  const baseStyle =
    'flex w-full justify-center rounded-full px-4 py-3.5 text-sm font-bold font-headline tracking-wide shadow-[0_12px_24px_rgba(172,44,0,0.18)] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0';

  const buttonStyle =
    'border border-primary bg-primary text-on-primary hover:-translate-y-0.5 hover:bg-primary-fixed-dim focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background';

  return (
    <button type={type} className={`${baseStyle} ${buttonStyle} ${className}`} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
