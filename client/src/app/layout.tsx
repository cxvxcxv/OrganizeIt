import type { Metadata } from 'next';

import { SITE_NAME } from '@/constants/seo.constants';

import { Providers } from './Providers';
import './globals.css';

// const dm_sans = DM_Sans({ subsets: ['latin'] });

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
