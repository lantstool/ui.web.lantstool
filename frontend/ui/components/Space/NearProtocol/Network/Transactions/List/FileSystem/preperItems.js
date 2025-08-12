const transformTx = (list) =>
  list.map((transaction) => ({
    ...transaction,
    id: transaction.transactionId,
    itemType: 'transaction',
    canHaveChildren: false,
  }));

const transformFolders = (foldersList) =>
  foldersList.map((folder) => ({
    ...folder,
    id: folder?.folderId,
    itemType: 'folder',
    canHaveChildren: true,
    children: [],
  }));

//Prepare a sorted folder hierarchy and group transactions accordingly
export const prepareItems = (list, foldersList) => {
  const folders = transformFolders(foldersList);
  const transactions = transformTx(list);
  const sortedFolders = [...folders].sort((a, b) => a.name.localeCompare(b.name));
  const folderMap = Object.fromEntries(sortedFolders.map((folder) => [folder.folderId, folder]));
  const rootTransaction = [];

  transactions.forEach((tx) => {
    const parent = folderMap[tx.parentId];
    parent ? parent.children.push(tx) : rootTransaction.push(tx);
  });

  return [...sortedFolders, ...rootTransaction];
};
