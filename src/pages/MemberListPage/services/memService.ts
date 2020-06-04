import { request } from 'ice';

export interface IPageInfo {
  pageSize: number;// 显示条数
  curPage: number;// 当前页数
}

export default {
  // 分页查询员工
  async getMembers(pageInfo: IPageInfo) {
    return await request.post('/api/memberlist', { pageSize: pageInfo.pageSize, curPage: pageInfo.curPage });
  },
  // 员工姓名列表
  async getMemberNames(name: string) {
    return await request.get('/api/getMemberNames', { params: { name } });
  },
  // 获取title字典
  async getTitleDict() {
    return await request.get('/api/getTitleDict', { params: { name } });
  },
  // 搜索员工列表
  async searchMembers(searchName: string, searchTitle: string, pageSize, curPage) {
    return await request.get('/api/searchMembers', { params: { name: searchName, title: searchTitle, pageSize, curPage } });
  },
  // 删除员工信息
  async removeMember(selectedRows: string[]) {
    return await request.post('/api/deleteMembers', { selectedRows });
  }
}