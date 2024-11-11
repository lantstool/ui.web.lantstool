import { effect } from '@react-vault';

const getReorderedList = (txList, txMap, source, destination) => {
  const list = txList.map((id) => txMap[id]);
  // remove tx from the source position and insert into destination position
  const [removedKey] = list.splice(source, 1);
  list.splice(destination, 0, removedKey);
  // update 'order' field for all transactions
  return list.map((tx, index) => ({ ...tx, order: index }));
};

export const reorder = effect(async ({ store, slice, payload }) => {
  const { source, destination } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const txList = slice.getState((slice) => slice.txList);
  const txMap = slice.getState((slice) => slice.txMap);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    const reorderedList = getReorderedList(txList, txMap, source, destination);
    setList(reorderedList);
    await backend.sendRequest('nearProtocol.transactions.reorder', { reorderedList });
  } catch (e) {
    console.log(e);
  }
});
