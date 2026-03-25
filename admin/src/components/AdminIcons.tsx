import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon(props: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function PlateIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4.5 12a7.5 7.5 0 1 0 15 0a7.5 7.5 0 1 0-15 0Z" />
      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0Z" />
      <path d="M5 5.5h14" />
    </BaseIcon>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
      <path d="m19 14 .7 2.2L22 17l-2.3.8L19 20l-.7-2.2L16 17l2.3-.8L19 14Z" />
      <path d="m5 14 .7 2.2L8 17l-2.3.8L5 20l-.7-2.2L2 17l2.3-.8L5 14Z" />
    </BaseIcon>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </BaseIcon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </BaseIcon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m21 21-4.35-4.35" />
      <path d="M16 10.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 1 1 11 0Z" />
    </BaseIcon>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3.5 2.57 5.21 5.75.84-4.16 4.05.98 5.73L12 16.63l-5.14 2.7.98-5.73L3.68 9.55l5.75-.84L12 3.5Z" />
    </BaseIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 21a9 9 0 1 0 0-18a9 9 0 1 0 0 18Z" />
      <path d="M12 7v5l3 2" />
    </BaseIcon>
  );
}

export function CoinIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <ellipse cx="12" cy="7" rx="6.5" ry="3.5" />
      <path d="M5.5 7v10c0 1.93 2.91 3.5 6.5 3.5s6.5-1.57 6.5-3.5V7" />
      <path d="M5.5 12c0 1.93 2.91 3.5 6.5 3.5s6.5-1.57 6.5-3.5" />
    </BaseIcon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z" />
      <path d="M12 13.2a2.2 2.2 0 1 0 0-4.4a2.2 2.2 0 0 0 0 4.4Z" />
    </BaseIcon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3 5 6v5c0 5 3.4 8.2 7 10 3.6-1.8 7-5 7-10V6l-7-3Z" />
      <path d="m9.5 12 1.7 1.7 3.3-3.7" />
    </BaseIcon>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3 15 4.4-4.4a1.6 1.6 0 0 1 2.26 0L14 15" />
      <path d="m13 14 1.8-1.8a1.6 1.6 0 0 1 2.26 0L21 16" />
      <path d="M8 9.2a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 0 0-2.4 0Z" />
    </BaseIcon>
  );
}

export function NoteIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5Z" />
      <path d="M14 3.5V8h4" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </BaseIcon>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m15 18-6-6 6-6" />
    </BaseIcon>
  );
}

export function PencilIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 20h9" />
      <path d="m16.5 3.5 4 4L8 20H4v-4L16.5 3.5Z" />
    </BaseIcon>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V4.5h6V7" />
      <path d="M18 7v12A1.5 1.5 0 0 1 16.5 20.5h-9A1.5 1.5 0 0 1 6 19V7" />
      <path d="M10 11.5v5" />
      <path d="M14 11.5v5" />
    </BaseIcon>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </BaseIcon>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 21a9 9 0 1 0 0-18a9 9 0 1 0 0 18Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </BaseIcon>
  );
}

export function DashboardIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </BaseIcon>
  );
}

export function OrdersIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 7h12l-1.2 8.4a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L6 7Z" />
      <path d="M9 7V5.5A2.5 2.5 0 0 1 11.5 3h1A2.5 2.5 0 0 1 15 5.5V7" />
      <path d="M9.5 11.5h5" />
    </BaseIcon>
  );
}

export function CustomersIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M16.5 20a4.5 4.5 0 0 0-9 0" />
      <path d="M12 12a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7Z" />
      <path d="M20 20a3.5 3.5 0 0 0-3-3.46" />
      <path d="M17 5.4a3.5 3.5 0 0 1 0 6.2" />
    </BaseIcon>
  );
}

export function AnalyticsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 20h16" />
      <path d="M7 16v-4" />
      <path d="M12 16V8" />
      <path d="M17 16V5" />
      <path d="m6.5 11.5 4-3.5 4 1.5 3.5-4" />
    </BaseIcon>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Z" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.4l-1 1a1 1 0 0 1-1.4 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 1-1.4 0l-1-1a1 1 0 0 1 0-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1 1 0 0 1-1-1v-1.5a1 1 0 0 1 1-1h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 0 1 0-1.4l1-1a1 1 0 0 1 1.4 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v.2a1 1 0 0 0 .7.9 1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.4 0l1 1a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1h-.2a1 1 0 0 0-.4 1Z" />
    </BaseIcon>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 4h6v6H4Z" />
      <path d="M14 4h6v6h-6Z" />
      <path d="M4 14h6v6H4Z" />
      <path d="M14 14h6v6h-6Z" />
    </BaseIcon>
  );
}

export function AlertCircleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </BaseIcon>
  );
}
