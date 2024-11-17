'use client';

import { DashboardCategories } from '@/components/dashboard/categories/DashboardCategories';
import { DashboardTasks } from '@/components/dashboard/tasks/DashboardTasks';

export function Dashboard() {
  return (
    <section className="grid gap-8 md:grid-cols-2">
      <DashboardCategories />
      <DashboardTasks />
    </section>
  );
}
