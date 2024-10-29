'use client';

import { MENU } from '../menu.data';

import { SidebarItem } from './SidebarItem';
import { SignOutButton } from './SignOutButton';

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-sidebar flex-col items-start bg-white md:flex">
      <h1 className="w-full border-b border-b-background py-4 text-center font-normal">
        MENU
      </h1>
      <nav className="flex w-full flex-grow flex-col">
        {MENU.map(item => (
          <SidebarItem item={item} key={item.name} />
        ))}
      </nav>
      <SignOutButton />
    </aside>
  );
}
