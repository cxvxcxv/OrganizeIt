import { CircleCheckBig, LayoutDashboard, User } from 'lucide-react';

import { IMenuItem } from '@/types/menu-item.types';

import { PAGES } from '@/config/urls.config';

export const MENU: IMenuItem[] = [
  {
    name: 'Dashboard',
    link: PAGES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    name: 'My tasks',
    link: PAGES.TASKS,
    icon: CircleCheckBig,
  },
  {
    name: 'Profile',
    link: PAGES.PROFILE,
    icon: User,
  },
];
