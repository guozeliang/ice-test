import { request } from 'ice';

export default {

  // 登录接口
  async login(name: string, password: string) {
    return await request.post('/api/login', { name, password });
  },

  // 用户注册
  async register() {
    return await request.post('/api/register');
  },

  // 获取验证码
  async sendPhoneCode(phone: string) {
    return await request.post('/api/sendcode', { phone });
  },

  // 获取用户菜单
  async getMenuList(authToken: string) {
    // const tmp = await request.post('/api/menulist', { authToken });
    return await request.post('/api/menulist', { authToken });
    // return tmp;
  },

  async getUserProfile() {
    return await request('/api/profile');
  },
  // 简单场景
  async getUser() {
    return await request('/api/user');
  },

  // 参数场景
  async getRepo(id) {
    return await request(`/api/repo/${id}`);
  },

}