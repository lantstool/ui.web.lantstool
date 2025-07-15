import { forwardRef } from 'react';
import { SimpleTreeItemWrapper } from 'dnd-kit-sortable-tree';
import { NavLink, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import cnm from 'classnames';
import cn from './TreeItem.module.scss';

export const TreeItem = forwardRef(({ item, ...wrapperProps }, ref) => {
  const { spaceId, networkId, transactionId } = useParams();
  const collapseOne = useStoreEffect((store) => store.nearProtocol.folders.collapseOne);
  const isActive = item?.transactionId === transactionId;

  const onCollapse = () => {
    wrapperProps?.onCollapse();
    collapseOne({ spaceId, networkId, item, collapsed: wrapperProps?.collapsed });
  };

  return (
    <SimpleTreeItemWrapper
      {...wrapperProps}
      disableSelection={true}
      manualDrag={item.type === 'folder'}
      disableCollapseOnItemClick={true}
      showDragHandle={false}
      className={cnm(cn.treeItem, isActive && cn.active)}
      ref={ref}
    >
      {item.type === 'folder' ? (
        <div className={cn.folderWrapper}>
          <div className={cn.titleWrapper}>
            <span className={cn.folderIcon} />
            <p className={cn.title}>{item.label}</p>
          </div>
          {wrapperProps?.childCount > 0 && (
            <button onClick={onCollapse} className={cn.collapseButton}>
              <span className={wrapperProps?.collapsed ? cn.plusIcon : cn.minusIcon} />
            </button>
          )}
        </div>
      ) : (
        <NavLink to={item.transactionId} className={cn.link}>
          <p className={cn.title}>{item.label}</p>
        </NavLink>
      )}
    </SimpleTreeItemWrapper>
  );
});
