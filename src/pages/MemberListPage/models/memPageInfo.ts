import { IRootDispatch } from 'ice';
import memService, { IPageInfo } from '../services/memService';

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

export default {
  state: {
    totalRecords: memberList.length,
    pageSize: 20,
    members: memberList
  },
  effects: (dispatch: IRootDispatch) => ({
    async getMembers(pageInfo: IPageInfo) {
      const res = await memService.getMembers(pageInfo);
      if (res.status === 'SUCCESS') {
        dispatch.memPageInfo.update(res.data);
      }
    },
    async remove(selectedRowKeys: string[]) {
      const res = await memService.removeMember(selectedRowKeys);
      if (res.status === 'SUCCESS') {
        dispatch.memPageInfo.remove(selectedRowKeys);
      }
      // dispatch.memPageInfo.remove(selectedRowKeys);
    },
    async searchMembers(searchData) {
      const res = await memService.searchMembers(searchData.searchName, searchData.searchTitle, searchData.pageSize, searchData.curPage);
      if (res.status === 'SUCCESS') {
        dispatch.memPageInfo.update(res.data);
      }
    }
  }),
  reducers: {
    update(prevState, payload) {
      return { ...payload };
    },
    remove(prevState, selectedRowKeys: string[]): IState {
      // debugger;
      console.log('remove');
      const newState = [...prevState.members];
      newState.splice(selectedRowKeys[0], 1);
      return { ...prevState, ...{ members: newState } };
    },
  },
}



// for (let index = newState.length - 1; index >= 0; index--) {
//   if (selectedRowKeys.indexOf(newState[index].userId) > -1) {
//     newState.splice(index, 1);
//   }
// }
// payload.members = newState;
// const mewpage = { pageSize: 10 };