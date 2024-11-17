import type { Metadata } from 'next';

import { Dashboard } from './Dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'dashboard page',
};

export default function DashboardPage() {
  return <Dashboard />;
}
