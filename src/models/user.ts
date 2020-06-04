import umbrella from 'umbrella-storage';
import userService from '@/services/user';
import { IRootDispatch } from 'ice';

interface IState {
  name: string;// 用户名
  userid: string | null;
  avatar: string; // 头像地址
  mail: string;// 邮箱
  authority: string;// 权限
}

export default {
  state: {
    name: '',
    userid: null,
    avatar: '',
    mail: '',
    authority: '',
  },

  effects: (dispatch: IRootDispatch) => ({
    async fetchUserProfile() {
      const res = await userService.getUserProfile();
      if (res.status === 'SUCCESS') {
        dispatch.user.update(res.data);
      }
    },
    async login(args) {
      const res = await userService.login(args.name,args.password);
      if (res.status === 'SUCCESS') {
        dispatch.user.update(res.data);
        // 保存到localstore中
        umbrella.setLocalStorage('user', res.data);
      }
      return res;
    },
  }),

  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
    add(prevState: IState, task: ITask[]): IState {
      return [...prevState, ...task];
    },
    remove(prevState: IState, taskIndex: number): IState {
      const newState = [...prevState];
      newState.splice(taskIndex, 1);
      return newState;
    },
  },
};