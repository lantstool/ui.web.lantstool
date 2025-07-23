import { SortableTree } from 'dnd-kit-sortable-tree';
import { TreeItem } from './TreeItem/TreeItem.jsx';
import { useStoreEffect } from '@react-vault';
import { prepareItems } from './preperItems.js';
import cn from './FileSystem.module.scss';

const flattenTransactions = (items) =>
  items
    .flatMap((item) => (item.itemType === 'folder' ? item.children : item))
    .filter((item) => item.itemType === 'transaction');

export const FileSystem = ({ list, foldersList }) => {
  const reorderTx = useStoreEffect((store) => store.nearProtocol.transactions.reorder);

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
      <div className={cn.wrapper}>
        <SortableTree
          items={prepareItems(list, foldersList)}
          onItemsChanged={onChange}
          TreeItemComponent={TreeItem}
          dropAnimation={null}
          sortableProps={{
            animateLayoutChanges: () => {},
          }}
        />
      </div>
    </div>
  );
};
