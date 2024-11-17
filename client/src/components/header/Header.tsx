'use client';

import { Search } from '../search/Search';
import { CreateTask } from '../task/CreateTask';

export function Header() {
  return (
    <section className="mb-2 flex w-full items-center justify-between gap-8 rounded-b-xl bg-white px-8 py-2 md:mb-8">
      <div className="flex-grow">
        <Search />
      </div>
      <div className="flex items-center gap-8">
        <CreateTask />
      </div>
    </section>
  );
}
