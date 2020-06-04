import { IRootDispatch } from 'ice';

const result = [];
for (let i = 0; i < 5; i++) {
  result.push({
    title: { name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible` },
    id: 100306660940 + i,
    time: 2000 + i
  });
}

export default {
  state: result,
  effects: (dispatch: IRootDispatch) => ({
    async add(item) {
      dispatch.default.update([item]);
    },
    async remove(index) {
      dispatch.default.remove(index);
    },
  }),
  reducers: {
    update(prevState, payload) {
      return [...prevState, ...payload];
    },
    remove(prevState, index) {
    //   debugger;
      console.log('remove');
      const tmpSource = [...prevState];
      tmpSource.splice(index, 1);
      return result;
    },
  },
}
