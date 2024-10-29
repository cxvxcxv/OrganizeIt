import { PropsWithChildren } from 'react';

import { Header } from '@/components/header/Header';
import { Navbar } from '@/components/navigation/navbar/Navbar';
import { Sidebar } from '@/components/navigation/sidebar/Sidebar';

export default function GeneralLayout({ children }: PropsWithChildren) {
  return (
    <section className="md:flex md:pl-sidebar">
      <Sidebar />
      <section className="flex-grow md:px-8">
        <Header />
        {children}
      </section>
      <Navbar />
    </section>
  );
}
