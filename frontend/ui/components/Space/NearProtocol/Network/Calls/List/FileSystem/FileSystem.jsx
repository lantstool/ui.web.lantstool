import { SortableTree } from 'dnd-kit-sortable-tree';
import { TreeItem } from './TreeItem/TreeItem.jsx';
import { useStoreEffect } from '@react-vault';
import { prepareItems } from './preperItems.js';
import { forwardRef, useMemo } from 'react';
import { FileSystemProvider } from '../../../_general/FileSystemContext/FileSystemContext.jsx';
import cn from './FileSystem.module.scss';

const flattenTransactions = (items) =>
  items
    .flatMap((item) => (item.itemType === 'folder' ? item.children : item))
    .filter((item) => item.itemType === 'call');

export const FileSystem = ({ list, foldersList }) => {
  const reorderCall = useStoreEffect((store) => store.nearProtocol.calls.reorder);
  const items = useMemo(() => prepareItems(list, foldersList), [list, foldersList]);

  const onChange = (changedItems, reason) => {
    if (reason.type !== 'dropped') return;

    const flatCallList = flattenTransactions(changedItems);
    const reorderedCallList = flatCallList.map((call, index) => ({
      callId: call.callId,
      name: call.name,
      order: index,
      parentId: call.parentId,
    }));

    reorderCall({ reorderedCallList });
  };

  return (
    <FileSystemProvider>
      <div className={cn.fileSystem}>
        <div className={cn.wrapper}>
          <SortableTree
            items={items}
            onItemsChanged={onChange}
            TreeItemComponent={forwardRef((props, ref) => (
              <TreeItem {...props} ref={ref} items={items} />
            ))}
            dropAnimation={null}
            sortableProps={{
              animateLayoutChanges: () => {},
            }}
          />
        </div>
      </div>
    </FileSystemProvider>
  );
};
