'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IMenuItem } from '@/types/menu-item.types';

export function SidebarItem({ item }: { item: IMenuItem }) {
  const pathname = usePathname();
  const isActive =
    item.link === '/' ? pathname === item.link : pathname.startsWith(item.link);

  return (
    <Link
      href={item.link}
      aria-label={item.name}
      className={clsx(
        'flex items-center border-b border-l-8 border-b-background px-8 py-4',
        {
          'border-l-primary bg-primary bg-opacity-15 font-bold': isActive,
          'border-l-transparent': !isActive,
        },
      )}
    >
      <item.icon
        className="mr-3 inline-block"
        strokeWidth={isActive ? 2 : 1.5}
      />
      {item.name}
    </Link>
  );
}
