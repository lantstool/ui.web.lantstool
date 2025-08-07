import { forwardRef } from 'react';
import { SimpleTreeItemWrapper } from 'dnd-kit-sortable-tree';
import { Folder } from './Folder/Folder.jsx';
import { Transaction } from './Transaction/Transaction.jsx';
import { useStoreEffect } from '@react-vault';
import { useParams } from 'react-router-dom';
import cn from './TreeItem.module.scss';

export const TreeItem = forwardRef(({ item, items, ...wrapperProps }, ref) => {
  const { spaceId, networkId } = useParams();
  const collapseOne = useStoreEffect((store) => store.nearProtocol.folders.collapseOne);
  const isFolder = item.itemType === 'folder';

  const onCollapse = () => {
    if (!isFolder || item?.children?.length === 0) return;

    collapseOne({
      spaceId,
      networkId,
      item,
      wrapperProps,
    });
  };

  return (
    <SimpleTreeItemWrapper
      {...wrapperProps}
      ref={ref}
      disableSelection
      manualDrag={isFolder}
      onCollapse={onCollapse}
      showDragHandle={false}
      hideCollapseButton
      indentationWidth={0}
      className={cn.treeItem}
      disableSorting
    >
      {isFolder ? (
        <Folder item={item} wrapperProps={wrapperProps} onCollapse={onCollapse} items={items} />
      ) : (
        <Transaction item={item} wrapperProps={wrapperProps} />
      )}
    </SimpleTreeItemWrapper>
  );
});
