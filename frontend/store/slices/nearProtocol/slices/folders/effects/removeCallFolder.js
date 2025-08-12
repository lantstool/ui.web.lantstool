import { effect } from '@react-vault';

const getDestination = (firstOrder, lastOrder, children, list, activeCallId) => {
  if (list.length === 1 && children.length > 0) return '..';

  if (children.length === 0) return `../calls/${activeCallId}`;

  const index = list.findIndex((tx) => tx.callId === activeCallId);
  if (index < firstOrder || index > lastOrder) return `../calls/${activeCallId}`;

  const previousTx = list.find((tx) => tx.order === firstOrder - 1);

  if (previousTx) return `../calls/${previousTx.callId}`;

  const nextTx = list.find((tx) => tx.order === lastOrder + 1);

  if (nextTx) return `../calls/${nextTx.callId}`;
};

export const removeCallFolder = effect(async ({ payload, slice, store }) => {
  const { spaceId, networkId, callId, item, navigate, closeModal } = payload;

  const [backend] = store.getEntities((store) => store.backend);
  const [history] = store.getEntities((store) => store.history);
  const deleteOne = slice.getActions((slice) => slice.deleteOne);
  const setNotification = store.getActions((store) => store.setNotification);
  const list = store.getState((store) => store.nearProtocol.calls.list);
  const getList = store.getEffects((store) => store.nearProtocol.calls.getList);

  try {
    const children = item.children || [];
    const ordered = children.slice().sort((a, b) => a.order - b.order);
    const firstOrder = ordered[0]?.order;
    const lastOrder = ordered[ordered.length - 1]?.order;

    const destination = getDestination(firstOrder, lastOrder, children, list, callId);

    await backend.sendRequest('nearProtocol.folders.removeCallFolder', {
      spaceId,
      networkId,
      folderId: item.folderId,
      children,
    });

    deleteOne(item);
    await getList({ spaceId, networkId });

    history.remove(`/space/${spaceId}/near-protocol/${networkId}/calls/${callId}`);

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
