import { useState, useEffect } from 'react';
import { SortableTree } from 'dnd-kit-sortable-tree';
import { TreeItem } from './TreeItem/TreeItem.jsx';
import { useStoreEffect } from '@react-vault';
import cn from './FileSystem.module.scss';

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

const prepareNestedItems = (list, foldersList) => {
  const folders = transformFolders(foldersList);
  const transactions = transformTx(list);
  const sortedFolders = folders.sort((a, b) => a.name.localeCompare(b.name));
  const folderMap = Object.fromEntries(folders.map((folder) => [folder.folderId, folder]));
  const rootTransaction = [];

  transactions.forEach((tx) => {
    const parent = folderMap[tx.parentId];
    parent ? parent.children.push(tx) : rootTransaction.push(tx);
  });

  return [...sortedFolders, ...rootTransaction];
};

const flattenTransactions = (items) =>
  items
    .flatMap((item) => (item.itemType === 'folder' ? item.children : item))
    .filter((item) => item.itemType === 'transaction');

export const FileSystem = ({ list, foldersList }) => {
  const [items, setItems] = useState([]);
  const reorderTx = useStoreEffect((store) => store.nearProtocol.transactions.reorder);

  useEffect(() => {
    setItems(prepareNestedItems(list, foldersList));
  }, [list, foldersList]);

  const onChange = (changedItems, reason) => {
    if (reason.type !== 'dropped') return;

    const flatTxList = flattenTransactions(changedItems);
    const reorderedTxList = flatTxList.map((tx, index) => ({
      transactionId: tx.transactionId,
      name: tx.name,
      order: index,
      parentId: tx.parentId,
    }));

    reorderTx({ reorderedTxList });
  };

  return (
    <div className={cn.fileSystem}>
      <SortableTree
        items={items}
        onItemsChanged={onChange}
        TreeItemComponent={TreeItem}
        dropAnimation={{ duration: 200 }}
      />
    </div>
  );
};
