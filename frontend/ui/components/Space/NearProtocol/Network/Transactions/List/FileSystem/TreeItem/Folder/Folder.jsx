import { EditName } from '../../../../../_general/EditName/EditName.jsx';
import { useStoreEffect } from '@react-vault';
import { Menu } from './Menu/Menu.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useFileSystemContext } from '../../../../../_general/FileSystemContext/FileSystemContext.jsx';
import cnm from 'classnames';
import cn from './Folder.module.scss';

export const Folder = ({ item, wrapperProps, onCollapse, items }) => {
  const { spaceId, networkId } = useParams();
  const navigate = useNavigate();
  const updateOneName = useStoreEffect((store) => store.nearProtocol.folders.updateOneName);
  const createOneTransaction = useStoreEffect(
    (store) => store.nearProtocol.transactions.createInFolder,
  );
  const [isEditing, setIsEditing] = useState(false);
  const { openMenuId, setOpenMenuId } = useFileSystemContext();

  const isOpenMenu = openMenuId === item.folderId;
  const isActive = isOpenMenu || isEditing;
  const { childCount, collapsed } = wrapperProps;

  const updateName = (formValues) => {
    updateOneName({ formValues, folderId: item.folderId, items, type: 'transaction' });
  };

  const addTransaction = () =>
    createOneTransaction({ spaceId, networkId, navigate, parentId: item.folderId, items });

  const openMenu = () => setOpenMenuId(item.folderId);
  const closeMenu = () => setOpenMenuId(null);

  return (
    <>
      <div className={cnm(cn.folder, isActive && cn.activeFolder)} data-edit-id={item.folderId}>
        <div className={cn.wrapper}>
          <div className={cn.titleWrapper}>
            {childCount > 0 && (
              <button onClick={onCollapse} className={cn.collapseButton}>
                <span className={collapsed ? cn.plusIcon : cn.minusIcon} />
              </button>
            )}
            <span className={childCount > 0 ? cn.folderIcon : cn.emptyFolderIcon} />
          </div>
          <EditName
            name={item.name}
            itemId={item.folderId}
            updateName={updateName}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            openMenuId={openMenuId}
          />
        </div>
        <div className={cn.settingsWrapper} onClick={(e) => e.stopPropagation()}>
          <button className={cn.addButton} onClick={addTransaction}>
            <span className={cn.addIcon} />
          </button>
          <Menu
            item={item}
            isOpenMenu={isOpenMenu}
            openMenu={openMenu}
            closeMenu={closeMenu}
            setIsEditing={setIsEditing}
          />
        </div>
      </div>
    </>
  );
};
