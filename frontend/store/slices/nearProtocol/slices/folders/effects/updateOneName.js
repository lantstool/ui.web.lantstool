import { effect } from '@react-vault';

const flattenItems = (items, type) =>
  items
    .flatMap((item) => (item.itemType === 'folder' ? item.children : item))
    .filter((item) => item.itemType === type);

// Check if renaming the folder changes its position in the list
const wasIndexChanged = (updatedItems, sortedItems, folderId) => {
  const oldIndex = updatedItems.findIndex((item) => item.folderId === folderId);
  const newIndex = sortedItems.findIndex((item) => item.folderId === folderId);

  return oldIndex !== newIndex;
};

// Sort items: folders first (A–Z), then transactions/calls
const sortItemsByFoldersFirst = (updatedItems, type) => {
  const idKey = `${type}Id`;
  const folders = updatedItems.filter((item) => item.type === type && !item[idKey]);
  const items = updatedItems.filter((item) => item[idKey]);
  const sortedFolders = [...folders].sort((a, b) => a.name.localeCompare(b.name));

  return [...sortedFolders, ...items];
};

const reorderList = async (type, sortedItems, reorderTx, reorderCall) => {
  const flatList = flattenItems(sortedItems, type);

  if (type === 'transaction') {
    const reorderedTxList = flatList.map((tx, index) => ({
      transactionId: tx.transactionId,
      name: tx.name,
      order: index,
      parentId: tx.parentId,
    }));
    return await reorderTx({ reorderedTxList });
  }

  if (type === 'call') {
    const reorderedCallList = flatList.map((call, index) => ({
      callId: call.callId,
      name: call.name,
      order: index,
      parentId: call.parentId,
    }));
    return await reorderCall({ reorderedCallList });
  }
};

export const updateOneName = effect(async ({ payload, slice, store }) => {
  const { folderId, items, type } = payload;
  const { name } = payload.formValues;
  const [backend] = store.getEntities((store) => store.backend);
  const editOneName = slice.getActions((slice) => slice.editOneName);
  const reorderTx = store.getEffects((store) => store.nearProtocol.transactions.reorder);
  const reorderCall = store.getEffects((store) => store.nearProtocol.calls.reorder);

  try {
    editOneName({ name, folderId });

    await backend.sendRequest('nearProtocol.folders.updateOneName', {
      name,
      folderId,
    });
    // Get items with new folder name
    const updatedItems = items.map((item) =>
      item.folderId === folderId ? { ...item, name } : item,
    );

    const sortedItems = sortItemsByFoldersFirst(updatedItems, type);
    const isIndexChanged = wasIndexChanged(updatedItems, sortedItems, folderId);

    if (!isIndexChanged) return;

    await reorderList(type, sortedItems, reorderTx, reorderCall);
  } catch (e) {
    console.log(e);
  }
});
