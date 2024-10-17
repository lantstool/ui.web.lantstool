import { effect } from '../../../../../../../react-vault/index.js';

// TODO: handle the case when we delete the last tx in the list - we also need
// to clear navigation state for transactions and we shouldn't navigate to last
// deleted tx

const getDestination = (transactions, activeTxId) => {
  // If we have only 1 tx and delete it - redirect to '/transactions'
  if (transactions.length === 1) return `..`;
  const index = transactions.findIndex((id) => id === activeTxId);
  // If we want to delete the second or further tx - return the upper one
  if (index > 0) return `../${transactions[index - 1]}`;
  // If we want to delete is first tx in the list - return the lower one
  if (index === 0) return `../${transactions[index + 1]}`;
};

export const removeOne = effect(async ({ payload, slice, store }) => {
  const { spaceId, networkId, transactionId, navigate, closeMenu } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const txList = slice.getState((slice) => slice.txList);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    const destination = getDestination(txList, transactionId);

    const updatedList = await backend.sendRequest('nearProtocol.transactions.removeOne', {
      spaceId,
      networkId,
      transactionId,
    });

    setList(updatedList);
    closeMenu();
    navigate(destination, { relative: 'path ', replace: true });
  } catch (e) {
    console.log(e);
  }
});
