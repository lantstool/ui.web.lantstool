import { effect } from '../../../../../../../react-vault/index.js';

export const duplicateOne = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, transactionId, closeMenu } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    const updatedList = await backend.sendRequest('nearProtocol.transactions.duplicateOne', {
      spaceId,
      networkId,
      targetId: transactionId,
    });

    setList(updatedList);
    closeMenu();
    // navigate(`../${duplicate.transactionId}`, { relative: 'path ', replace: true });
  } catch (e) {
    console.log(e);
  }
});
