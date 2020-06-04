
// 初始化员工列表
const memberList = [];
for (let i = 0; i <= 50; i += 1) {
  memberList.push({
    userId: i + 1,
    order: i + 1,
    name: `员工 ${String.fromCharCode(97 + i).toUpperCase()}`,
    position: Math.random() > 0.5 ? '24小时页面' : 'Banner 广告A',
    title: ['CEO', '产品经理', '运营总监'][i % 3],
  });
}
// 菜单配置
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
        path: '/power/test1',
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

module.exports = {
  // 支持参数
  'POST /api/users/:id': (req, res) => {
    const { id } = req.params;
    res.send({ id });
  },
  // 获取用户信息
  'GET /api/profile': {
    status: 'SUCCESS',
    data: {
      name: '淘小宝',
      mail: '12345678@qq.com',
      avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
      userid: 10001,
    },
  },
  // 用户登录
  'POST /api/login': (req, res) => {
    const { name, password } = req.body;
    if (name !== 'admin' || password !== 'admin') {
      res.send({
        status: 'FAIL',
        msg: '用户名或密码错误！'
      });
      return;
    };
    const authority = 'admin';
    res.cookie('authority', authority);
    res.send({
      status: 'SUCCESS',
      data: {
        name: '淘小宝',
        mail: '12345678@qq.com',
        avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
        userid: 10001,
        authority,
      },
    });
  },

  // 用户注册
  'POST /api/register': (req, res) => {
    const { name, password } = req.body;
    console.log(password);
    const authority = 'admin';
    res.cookie('authority', authority);
    res.send({
      status: 'SUCCESS',
      data: {
        authority,
        name,
      },
    });
  },

  // 获取验证码
  'POST /api/sendcode': (req, res) => {
    const { phone } = req.body;
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10);
    }
    res.send({
      status: 'SUCCESS',
      data: {
        phone,
        code
      }
    });
  },
  // 获取菜单列表
  'POST /api/menulist': (req, res) => {
    res.send({
      status: 'SUCCESS',
      data: [
        ...asideMenuConfig
      ]
    });
  },
  // 获取员工信息
  'POST /api/memberlist': (req, res) => {
    const { pageSize, curPage } = req.body;
    const pageIndex = (curPage - 1) * pageSize + 1;
    const resMembers = memberList.slice(pageIndex - 1, pageIndex + pageSize - 1);
    console.log(`pageIndex : ${pageIndex}  curPage：${curPage}  pageSize:${pageSize} taotal:${memberList.length}`);
    res.send({
      status: 'SUCCESS',
      data: {
        totalRecords: memberList.length,
        pageSize: 20,
        members: resMembers
      }
    });
  },
  // 获取用户姓名列表用于查询
  'GET /api/getMemberNames': (req, res) => {
    const names = [
      { value: '张一', title: '张一title' },
      { value: '张二', title: '张二title' },
      { value: '张三', title: '张三title' },
      { value: '李国', title: '李国title' },
      { value: '王五', title: '王五title' },
      { value: '赵六', title: '赵六title' },
      { value: '刘八', title: '刘八title' },
      { value: '史九', title: '史九title' },
      { value: '测试', title: '测试title' },
      { value: '员工A', title: '员工Atitle' },
    ];
    if (!req.query.name || req.query.name.length === 0) {
      res.send({
        status: 'SUCCESS',
        data: []
      });
      return;
    }
    const resNames = names.filter((item) => {
      if (item.value.indexOf(req.query.name) > -1) {
        return true;
      }
      return false;
    });
    res.send({
      status: 'SUCCESS',
      data: resNames
    });
  },
  'GET /api/getTitleDict': {
    status: 'SUCCESS',
    data: [
      { value: 'CEO', label: 'CEO', title: 'CEO title' },
      { value: '产品经理', label: '产品经理', title: 'CFO title' },
      { value: 'CTO', label: 'CTO', title: 'CTO title' },
      { value: '运营总监', label: '运营总监', title: 'CHO title' },
    ]
  },
  'GET /api/searchMembers': (req, res) => {
    // 姓名为空
    const members = memberList.filter((item) => {
      if (item.name.indexOf(req.query.name) > -1 && item.title === req.query.title) {
        return true;
      }
      return false;
    });
    const { pageSize, curPage } = req.query;
    const pageIndex = (curPage - 1) * pageSize + 1;
    const resMembers = members.slice(pageIndex - 1, pageIndex + pageSize - 1);
    res.send({
      status: 'SUCCESS',
      data: {
        totalRecords: memberList.length,
        pageSize: 20,
        members: resMembers
      }
    });
  },
  // 删除员工信息
  'POST /api/deleteMembers': (req, res) => {
    const { selectedRows, pageSize, curPage } = req.body;
    for (let index = memberList.length - 1; index >= 0; index--) {
      if (selectedRows.indexOf(memberList[index].userId) > -1) {
        memberList.splice(index, 1);
      }
    }
    // const pageIndex = (curPage - 1) * pageSize + 1;
    // const resMembers = memberList.slice(pageIndex - 1, pageIndex + pageSize - 1);
    res.send({
      status: 'SUCCESS',
      data: {
        totalRecords: memberList.length,
        pageSize: 20,
        members: memberList
      }
    });
  },

}