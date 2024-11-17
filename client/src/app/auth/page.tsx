import type { Metadata } from 'next';

import { Auth } from './Auth';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Auth page',
};

export default function AuthPage() {
  return <Auth />;
}
