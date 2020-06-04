import BasicLayout from '@/layouts/BasicLayout';
import TableTest from '@/pages/TableTest';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/power/test',
        component: TableTest,
      },
      {
        path: '/',
        redirect: '/power/test',
      },
    ],
  },
];
export default routerConfig;
