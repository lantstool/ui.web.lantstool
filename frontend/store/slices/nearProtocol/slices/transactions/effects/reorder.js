import { effect } from '@react-vault';

export const reorder = effect(async ({ store, slice, payload }) => {
  const { reorderedTxList } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    setList(reorderedTxList);

    await backend.sendRequest('nearProtocol.transactions.reorder', { reorderedTxList });
  } catch (e) {
    console.log(e);
  }
});
