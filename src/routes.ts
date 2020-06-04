import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import TestPower from '@/pages/Testpower';
import TableListPage from '@/pages/MemberListPage';
import TestAnalysis from '@/pages/TestAnalysis';
import TestPlatform from '@/pages/TestPlatform';

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/org/test',
        component: TableListPage,
      },
      {
        path: '/power/test',
        component: TestPower,
      },
      {
        path: '/analysis/test',
        component: TestAnalysis,
      },
      {
        path: '/platform/test',
        component: TestPlatform,
      },
      {
        path: '/',
        redirect: '/org/test',
      },
    ],
  },
];
export default routerConfig;
