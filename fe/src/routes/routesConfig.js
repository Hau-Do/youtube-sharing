import { lazy } from 'react';
import { RoutesString } from './routesString';

const CommonLayout = lazy(() => import('layouts/common'));
const HomePage = lazy(() => import('pages/home'));
const SharePage = lazy(() => import('pages/share'));
const MemberGuard = lazy(() => import('guards/member'));

export const routesConfig = [
  {
    layout: CommonLayout,
    path: RoutesString.CommonLayout,
    routes: [
      {
        page: HomePage,
        path: RoutesString.Home,
        exact: true,
      },
      {
        page: SharePage,
        path: RoutesString.Share,
        guard: MemberGuard,
        exact: true,
      },
    ],
  },
  {
    page: HomePage,
    path: '*',
  },
];
