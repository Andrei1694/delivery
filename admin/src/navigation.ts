import type { ComponentType, SVGProps } from 'react';
import {
  AnalyticsIcon,
  CustomersIcon,
  DashboardIcon,
  OrdersIcon,
  PlateIcon,
  SettingsIcon,
} from './components/AdminIcons';

export type AdminModuleKey =
  | 'dashboard'
  | 'restaurants'
  | 'orders'
  | 'customers'
  | 'analytics'
  | 'settings';

export interface AdminModule {
  key: AdminModuleKey;
  label: string;
  description: string;
  live: boolean;
  to?: '/' | '/restaurants';
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const adminModules: AdminModule[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    description: 'Operational overview',
    live: true,
    to: '/',
    icon: DashboardIcon,
  },
  {
    key: 'restaurants',
    label: 'Restaurants',
    description: 'Catalog and content',
    live: true,
    to: '/restaurants',
    icon: PlateIcon,
  },
  {
    key: 'orders',
    label: 'Orders',
    description: 'Fulfillment queue',
    live: false,
    icon: OrdersIcon,
  },
  {
    key: 'customers',
    label: 'Customers',
    description: 'Accounts and retention',
    live: false,
    icon: CustomersIcon,
  },
  {
    key: 'analytics',
    label: 'Analytics',
    description: 'Performance reporting',
    live: false,
    icon: AnalyticsIcon,
  },
  {
    key: 'settings',
    label: 'Settings',
    description: 'System configuration',
    live: false,
    icon: SettingsIcon,
  },
];

export const liveModuleCount = adminModules.filter((module) => module.live).length;
export const plannedModuleCount = adminModules.filter((module) => !module.live).length;
