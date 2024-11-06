'use client';

import { Plus } from 'lucide-react';

import { useProfile } from '@/hooks/useProfile';

import { Search } from '../search/Search';
import { ButtonActive } from '../ui/buttons/ButtonActive';

export function Header() {
  const { data } = useProfile();
  return (
    <section className="mb-8 flex w-full items-center justify-between gap-8 rounded-b-xl bg-white px-8 py-2">
      <div className="flex-grow">
        <Search />
      </div>
      <div className="flex items-center gap-8">
        <ButtonActive>
          <Plus />
          <span className="hidden md:block">New Task</span>
        </ButtonActive>
      </div>
    </section>
  );
}
