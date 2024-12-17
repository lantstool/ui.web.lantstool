import { effect } from '@react-vault';

const getReorderedList = (transactions, source, destination) => {
  // We need this to bypass Immer protection - you can't mutate Immer object outside Immer
  const list = [...transactions];
  // remove transaction from the source position and insert into destination position
  const [removedKey] = list.splice(source, 1);
  list.splice(destination, 0, removedKey);
  // update 'order' field for all transactions
  return list.map((transaction, index) => ({ ...transaction, order: index }));
};

export const reorder = effect(async ({ store, slice, payload }) => {
  const { source, destination } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const txList = slice.getState((slice) => slice.txList);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    const reorderedList = getReorderedList(txList, source, destination);
    setList(reorderedList);
    await backend.sendRequest('nearProtocol.transactions.reorder', { reorderedList });
  } catch (e) {
    console.log(e);
  }
});
