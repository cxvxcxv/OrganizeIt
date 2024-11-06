'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IMenuItem } from '@/types/menu-item.types';

export function NavbarItem({ item }: { item: IMenuItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.link;
  return (
    <Link
      href={item.link}
      className={clsx('flex flex-grow items-center justify-center', {
        'bg-primary bg-opacity-15': isActive,
      })}
    >
      <item.icon strokeWidth={isActive ? 2 : 1.5} />
    </Link>
  );
}
