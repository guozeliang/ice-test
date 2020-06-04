/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRootDispatch } from 'ice';
import memService from '../services/memService';
import { ISelectOptData } from '../interface/interfaces';

export default {
  state: [],
  effects: (dispatch: IRootDispatch) => ({
    async getMemberNames(name) {
      const res = await memService.getMemberNames(name);
      if (res.status === 'SUCCESS') {
        dispatch.memNames.update(res.data);
      } else {
        dispatch.memNames.update([]);
      }
    },
  }),
  reducers: {
    update(prevState: ISelectOptData[], payload: ISelectOptData[]) {
      return [...payload];
    },
  },
}