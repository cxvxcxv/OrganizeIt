import { PropsWithChildren } from 'react';

import { Navbar } from '@/components/navigation/navbar/Navbar';
import { Sidebar } from '@/components/navigation/sidebar/Sidebar';

export default function GeneralLayout({ children }: PropsWithChildren) {
  return (
    <section className="md:pl-sidebar md:flex">
      <Sidebar />
      <section>{children}</section>
      <Navbar />
    </section>
  );
}
