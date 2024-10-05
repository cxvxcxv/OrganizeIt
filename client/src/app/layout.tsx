import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { SITE_NAME } from '@/constants/seo.constants';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Create and organize your tasks in more convinient way',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
