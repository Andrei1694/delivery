export default function PaymentMethodForm({
  value,
  onChange,
  onSave,
  onCancel,
  saveLabel = 'Save',
  className = '',
}) {
  return (
    <div className={`rounded-lg border border-outline/20 bg-surface-container-high p-4 space-y-3 ${className}`.trim()}>
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            Card Type
          </label>
          <select
            className="w-full rounded-lg border-none bg-surface-container px-3 py-2 text-sm"
            value={value.type}
            onChange={(event) => onChange({ ...value, type: event.target.value })}
          >
            <option value="VISA">VISA</option>
            <option value="MC">Mastercard</option>
            <option value="AMEX">American Express</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            Last 4 Digits
          </label>
          <input
            className="w-full rounded-lg border-none bg-surface-container px-3 py-2 text-sm"
            inputMode="numeric"
            maxLength={4}
            type="text"
            value={value.last4}
            onChange={(event) =>
              onChange({
                ...value,
                last4: event.target.value.replace(/\D/g, '').slice(0, 4),
              })
            }
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            Expires
          </label>
          <input
            className="w-full rounded-lg border-none bg-surface-container px-3 py-2 text-sm"
            maxLength={5}
            placeholder="MM/YY"
            type="text"
            value={value.expires}
            onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
              const expires = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
              onChange({ ...value, expires });
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input
            checked={value.active}
            type="checkbox"
            onChange={(event) => onChange({ ...value, active: event.target.checked })}
          />
          <span>Set as active method</span>
        </label>

        <div className="flex gap-2">
          <button
            className="rounded-full bg-surface-container px-4 py-1.5 text-xs font-bold transition-colors hover:bg-surface-container-highest"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={value.last4.length !== 4 || value.expires.length < 5}
            type="button"
            onClick={onSave}
          >
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
