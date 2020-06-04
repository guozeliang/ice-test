import userService from '@/services/user';

interface IMenu {
  name: string;// 菜单名
  path: string;
  icon: string | null; // 图标
  children: IChildMenu[];
};

interface IChildMenu {
  name: string;
  path: string;
};

export default {
  state: [],

  effects: (dispatch) => ({
    async getMenuList(authtoken: string) {
      const res = await userService.getMenuList(authtoken);
      if (res.status === 'SUCCESS') {
        dispatch.menus.update(res.data);
      }
    },
  }),

  reducers: {
    update(prevState: IMenu[], payload: IMenu[]) {
      return [...payload ];
    },
    add(prevState: IMenu[], task: IMenu[]): IState {
      return [...prevState, ...task];
    },
    remove(prevState: IMenu[], taskIndex: number): IState {
      const newState = [...prevState];
      newState.splice(taskIndex, 1);
      return newState;
    },
  },
};