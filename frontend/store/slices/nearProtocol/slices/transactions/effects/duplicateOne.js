import { effect } from '@react-vault';

export const duplicateOne = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, transactionId } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    const updatedList = await backend.sendRequest('nearProtocol.transactions.duplicateOne', {
      spaceId,
      networkId,
      targetId: transactionId,
    });

    setList(updatedList);
  } catch (e) {
    console.log(e);
  }
});
