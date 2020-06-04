/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRootDispatch } from 'ice';
import memService from '../services/memService';
import { ISelectOptData } from '../interface/interfaces';

export default {
  state: [],
  effects: (dispatch: IRootDispatch) => ({
    async getTitleDict() {
      const res = await memService.getTitleDict();
      if (res.status === 'SUCCESS') {
        dispatch.memTitle.update(res.data);
      }
    },
  }),
  reducers: {
    update(prevState: ISelectOptData[], payload: ISelectOptData[]) {
      return [...payload];
    },
  },
}