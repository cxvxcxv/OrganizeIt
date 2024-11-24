import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Task } from './Task';

export const metadata: Metadata = {
  title: 'Task',
  ...NO_INDEX_PAGE,
};

export default function TaskPage() {
  return <Task />;
}
