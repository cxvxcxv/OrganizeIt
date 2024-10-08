import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import { SITE_NAME } from '@/constants/seo.constants';

import './globals.css';
import { Providers } from './providers';

const dm_sans = DM_Sans({ subsets: ['latin'] });

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
      <body className={`${dm_sans.className} bg-background`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
