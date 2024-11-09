'use client';

import { useProfile } from '@/hooks/useProfile';

import { Search } from '../search/Search';
import { CreateTask } from '../task/CreateTask';

export function Header() {
  const { data } = useProfile();
  return (
    <section className="mb-8 flex w-full items-center justify-between gap-8 rounded-b-xl bg-white px-8 py-2">
      <div className="flex-grow">
        <Search />
      </div>
      <div className="flex items-center gap-8">
        <CreateTask />
      </div>
    </section>
  );
}
