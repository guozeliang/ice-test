const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '组织结构',
    path: '/',
    icon: 'org',
    children: [
      {
        name: '员工管理',
        path: '/org/test',
      },
    ],
  },
  {
    name: '权限管理',
    path: '/',
    icon: 'power',
    children: [
      {
        name: '角色管理',
        path: '/power/test',
      },
      {
        name: '菜单管理',
        path: '/power/test11',
      },
    ],
  },
  {
    name: '数据管理',
    path: '/',
    icon: 'chart-pie',
    children: [
      {
        name: '字典管理',
        path: '/analysis/test',
      },
    ],
  },
  {
    name: '组件平台',
    path: '/',
    icon: 'platform',
    children: [
      {
        name: '组件目录',
        path: '/platform/test',
      },
    ],
  }
];

export { headerMenuConfig, asideMenuConfig };
