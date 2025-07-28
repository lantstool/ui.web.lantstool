import { forwardRef } from 'react';
import { SimpleTreeItemWrapper } from 'dnd-kit-sortable-tree';
import { Folder } from './Folder/Folder.jsx';
import {Call} from './Call/Call.jsx';
import cn from './TreeItem.module.scss';

export const TreeItem = forwardRef(({ item, ...wrapperProps }, ref) => (
  <SimpleTreeItemWrapper
    {...wrapperProps}
    ref={ref}
    disableSelection={true}
    manualDrag={item.itemType === 'folder'}
    disableCollapseOnItemClick={true}
    showDragHandle={false}
    indentationWidth={0}
    className={cn.treeItem}
  >
    {item.itemType === 'folder' ? (
      <Folder item={item} wrapperProps={wrapperProps} />
    ) : (
      <Call item={item} wrapperProps={wrapperProps} />
    )}
  </SimpleTreeItemWrapper>
));
