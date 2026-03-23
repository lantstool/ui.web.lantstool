import { effect } from '@react-vault';

const getDestination = (firstOrder, lastOrder, children, txList, activeTxId) => {
  if (txList.length === 1 && children.length > 0) return '..';

  if (children.length === 0) return `../transactions/${activeTxId}`;

  const index = txList.findIndex((tx) => tx.transactionId === activeTxId);
  if (index < firstOrder || index > lastOrder) return `../transactions/${activeTxId}`;

  const previousTx = txList.find((tx) => tx.order === firstOrder - 1);

  if (previousTx) return `../transactions/${previousTx.transactionId}`;

  const nextTx = txList.find((tx) => tx.order === lastOrder + 1);

  if (nextTx) return `../transactions/${nextTx.transactionId}`;
};

export const removeTxFolder = effect(async ({ payload, slice, store }) => {
  const { spaceId, networkId, transactionId, item, navigate, closeModal } = payload;

  const [backend] = store.getEntities((store) => store.backend);
  const [history] = store.getEntities((store) => store.history);
  const deleteOne = slice.getActions((slice) => slice.deleteOne);
  const setNotification = store.getActions((store) => store.setNotification);
  const txList = store.getState((store) => store.nearProtocol.transactions.txList);
  const getTxList = store.getEffects((store) => store.nearProtocol.transactions.getList);

  try {
    const children = item.children || [];
    const ordered = children.slice().sort((a, b) => a.order - b.order);
    const firstOrder = ordered[0]?.order;
    const lastOrder = ordered[ordered.length - 1]?.order;

    const destination = getDestination(firstOrder, lastOrder, children, txList, transactionId);

    await backend.sendRequest('nearProtocol.folders.removeTxFolder', {
      spaceId,
      networkId,
      folderId: item.folderId,
      children,
    });

    deleteOne(item);
    await getTxList({ spaceId, networkId });

    history.remove(`/space/${spaceId}/near-protocol/${networkId}/transactions/${transactionId}`);

    closeModal();

    setNotification({
      isOpen: true,
      message: 'Folder deleted',
      variant: 'black',
    });

    navigate(destination, { relative: 'path', replace: true });
  } catch (e) {
    console.error(e);
  }
});
