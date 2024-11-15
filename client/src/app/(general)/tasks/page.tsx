import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Tasks } from './Tasks';

export const metadata: Metadata = {
  title: 'Tasks',
  ...NO_INDEX_PAGE,
};

export default function TasksPage() {
  return <Tasks />;
}
