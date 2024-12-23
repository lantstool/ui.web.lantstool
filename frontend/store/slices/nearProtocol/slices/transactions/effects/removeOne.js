import { effect } from '@react-vault';

const getDestination = (transactions, activeTxId) => {
  // If we have only 1 tx and delete it - redirect to '/transactions'
  if (transactions.length === 1) return `..`;
  const index = transactions.findIndex(({ transactionId }) => transactionId === activeTxId);
  // // If we want to delete the second or further tx - return the upper one
  if (index > 0) return `../${transactions[index - 1].transactionId}`;
  // // If we want to delete is first tx in the list - return the lower one
  if (index === 0) return `../${transactions[index + 1].transactionId}`;
};

export const removeOne = effect(async ({ payload, slice, store }) => {
  const { spaceId, networkId, transactionId, navigate, closeModal } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const [history] = store.getEntities((store) => store.history);
  const txList = slice.getState((slice) => slice.txList);
  const setList = slice.getActions((slice) => slice.setList);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    const destination = getDestination(txList, transactionId);

    const updatedList = await backend.sendRequest('nearProtocol.transactions.removeOne', {
      spaceId,
      networkId,
      transactionId,
    });

    setList(updatedList);

    history.remove(`/space/${spaceId}/near-protocol/${networkId}/transactions/${transactionId}`);
    closeModal();

    setNotification({ isOpen: true, message: 'Transaction deleted', variant: 'black' });
    navigate(destination, { relative: 'path ', replace: true });
  } catch (e) {
    console.log(e);
  }
});
