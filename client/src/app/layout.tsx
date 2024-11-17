import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import { SITE_NAME } from '@/constants/seo.constants';

import { Providers } from './Providers';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'], // Specify subsets as needed
  weight: ['400', '500', '700'], // Specify the weights you need
  display: 'swap', // Use display=swap for better performance
});

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
      <body className={dmSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
