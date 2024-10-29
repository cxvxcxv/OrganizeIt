import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Tasks',
  ...NO_INDEX_PAGE,
};

export default function TasksPage() {
  return <div></div>;
}
