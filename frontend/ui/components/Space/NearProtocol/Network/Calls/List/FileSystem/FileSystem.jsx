import { SortableTree } from 'dnd-kit-sortable-tree';
import { TreeItem } from './TreeItem/TreeItem.jsx';
import { useStoreEffect } from '@react-vault';
import { prepareItems } from './preperItems.js';
import cn from './FileSystem.module.scss';

const flattenTransactions = (items) =>
  items
    .flatMap((item) => (item.itemType === 'folder' ? item.children : item))
    .filter((item) => item.itemType === 'call');

export const FileSystem = ({ list, foldersList }) => {
  const reorderCall = useStoreEffect((store) => store.nearProtocol.calls.reorder);

  const onChange = (changedItems, reason) => {
    if (reason.type !== 'dropped') return;

    const flatTxList = flattenTransactions(changedItems);
    const reorderedCallList = flatTxList.map((call, index) => ({
      callId: call.callId,
      name: call.name,
      order: index,
      parentId: call.parentId,
    }));
    reorderCall({ reorderedCallList });
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
