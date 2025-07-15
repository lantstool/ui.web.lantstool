import { useState, useEffect } from 'react';
import { SortableTree } from 'dnd-kit-sortable-tree';
import { TreeItem } from './TreeItem/TreeItem.jsx';
import { useStoreEffect } from '@react-vault';
import cn from './FileSystem.module.scss';


const transformTx = (list) =>
  list.map(({ transactionId, name, ...rest }) => ({
    transactionId,
    ...rest,
    id: transactionId,
    label: name,
    type: 'transaction',
    canHaveChildren: false,
  }));

const transformFolders = (foldersList) =>
  foldersList.map(({ folderId, name, ...rest }) => ({
    folderId,
    ...rest,
    id: folderId,
    label: name,
    type: 'folder',
    canHaveChildren: true,
    children: [],
  }));

const prepareNestedItems = (list, foldersList) => {
  const folders = transformFolders(foldersList);
  const transactions = transformTx(list);
  const folderMap = Object.fromEntries(folders.map((f) => [f.folderId, f]));

  const rootItems = [];
  transactions.forEach((tx) => {
    const parent = folderMap[tx.parentId];
    parent ? parent.children.push(tx) : rootItems.push(tx);
  });

  return [...folders, ...rootItems];
};

const flattenTransactions = (items) =>
  items
    .flatMap((item) => (item.type === 'folder' ? item.children || [] : item))
    .filter((item) => item.type === 'transaction');

const sortByFolderFirst = (items) =>
  [...items].sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return 0;
  });

export const FileSystem = ({ list, foldersList }) => {
  const [items, setItems] = useState([]);
  const reorder = useStoreEffect((store) => store.nearProtocol.transactions.reorder);

  useEffect(() => {
    setItems(prepareNestedItems(list, foldersList));
  }, [list, foldersList]);

  const onChange = (changedItems, reason) => {
    if (reason.type === 'dropped') {
      const flatList = flattenTransactions(changedItems);
      const reorderedTxList = flatList.map((tx, index) => ({
        transactionId: tx.transactionId,
        name: tx.label,
        order: index,
        parentId: tx.parentId,
      }));

      reorder({ reorderedTxList });
    }

    setItems(sortByFolderFirst(changedItems));
  };

  return (
    <div className={cn.fileSystem}>
      <SortableTree
        items={items}
        onItemsChanged={onChange}
        TreeItemComponent={TreeItem}
        dropAnimation={null}
      />
    </div>
  );
};
