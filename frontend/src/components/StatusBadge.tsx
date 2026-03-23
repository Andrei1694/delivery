export default function StatusBadge({ label, className }) {
  return (
    <span
      className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${className}`}
    >
      {label}
    </span>
  );
}
