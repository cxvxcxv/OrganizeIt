'use client';

import { Plus, User } from 'lucide-react';
import Link from 'next/link';

import { useProfile } from '@/hooks/useProfile';

import { Search } from '../search/Search';
import { ButtonActive } from '../ui/buttons/ButtonActive';

export function Header() {
  const { data } = useProfile();
  return (
    <section className="flex w-full items-center justify-between gap-8 rounded-b-xl bg-white px-8 py-2">
      <div className="w-2/3">
        <Search />
      </div>
      <div className="flex items-center gap-8">
        <ButtonActive>
          <Plus />
        </ButtonActive>
        <Link
          href="/profile"
          className="hidden rounded-full border p-2 md:block"
        >
          <User strokeWidth={1.25} />
        </Link>
      </div>
    </section>
  );
}
