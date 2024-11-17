import { useProfile } from '@/hooks/useProfile';

export function DashboardTasks() {
  const { data: { tasks = [] } = {} } = useProfile();
  return (
    <section className="rounded-xl border-b border-background bg-white p-4">
      <div>
        <h3>My tasks ({tasks.length})</h3>
      </div>
    </section>
  );
}
