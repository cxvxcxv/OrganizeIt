'use client';

import { MenuItem } from '../MenuItem';
import { MENU } from '../menu.data';

import { SignOutButton } from './SignOutButton';

export function Sidebar() {
  return (
    <aside className="w-sidebar fixed left-0 top-0 hidden h-screen flex-col items-start bg-white md:flex">
      <h1 className="self-center p-2 font-normal">MENU</h1>
      <nav className="flex w-full flex-grow flex-col">
        {MENU.map(item => (
          <MenuItem item={item} key={item.name} />
        ))}
      </nav>
      <SignOutButton />
    </aside>
  );
}
