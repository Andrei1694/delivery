type OrderSummaryProps = {
  subtotal: number;
  serviceFee: number;
  deliveryFee?: number | null;
  className?: string;
};

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default function OrderSummary({
  subtotal,
  serviceFee,
  deliveryFee = null,
  className = '',
}: OrderSummaryProps) {
  const total = subtotal + serviceFee + (deliveryFee ?? 0);
  return (
    <div className={`space-y-3 rounded-2xl bg-surface-container-low p-6 ${className}`.trim()}>
      <div className="flex items-center justify-between text-sm text-on-surface-variant">
        <span className="font-medium">Subtotal</span>
        <span className="font-semibold text-on-surface">{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between text-sm text-on-surface-variant">
        <span className="font-medium">Service Fee</span>
        <span className="font-semibold text-on-surface">{formatCurrency(serviceFee)}</span>
      </div>
      <div className="flex items-center justify-between text-sm text-on-surface-variant">
        <span className="font-medium">Delivery</span>
        {deliveryFee != null
          ? <span className="font-semibold text-on-surface">{formatCurrency(deliveryFee)}</span>
          : <span className="text-[10px] font-bold uppercase tracking-tighter text-primary">FREE</span>
        }
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-outline-variant/20 pt-3">
        <span className="font-headline text-xl font-bold text-on-surface">Total</span>
        <span className="font-headline text-2xl font-extrabold text-on-surface">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
