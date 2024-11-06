'use client';

import { MENU } from '../menu.data';

import { NavbarItem } from './NavbarItem';

export function Navbar() {
  return (
    <section className="h-navbar fixed bottom-0 left-0 flex w-screen bg-white md:hidden">
      {MENU.map(item => (
        <NavbarItem item={item} key={item.name} />
      ))}
    </section>
  );
}
