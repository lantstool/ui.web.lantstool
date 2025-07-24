import { EditName } from '../_general/EditName/EditName.jsx';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { Menu } from './Menu/Menu.jsx';
import { useToggler } from '@hooks/useToggler.js';
import cnm from 'classnames';
import cn from './Folder.module.scss';

export const Folder = ({ item, wrapperProps }) => {
  const { spaceId, networkId } = useParams();
  const collapseOne = useStoreEffect((store) => store.nearProtocol.folders.collapseOne);
  const updateOneName = useStoreEffect((store) => store.nearProtocol.folders.updateOneName);
  const [isOpenMenu, openMenu, closeMenu] = useToggler(false);

  const updateName = (formValues) => updateOneName({ formValues, folderId: item.folderId });

  const onCollapse = () => {
    collapseOne({
      spaceId,
      networkId,
      item,
      wrapperProps,
    });
  };
  return (
    <>
      <div className={cnm(cn.folder, isOpenMenu && cn.activeFolder)}>
        <div className={cn.titleWrapper}>
          {wrapperProps?.childCount > 0 && (
            <button onClick={onCollapse} className={cn.collapseButton}>
              <span className={wrapperProps?.collapsed ? cn.plusIcon : cn.minusIcon} />
            </button>
          )}
          <span className={wrapperProps?.childCount > 0 ? cn.folderIcon : cn.emptyFolderIcon} />
        </div>
        <EditName
          styles={cn.editName}
          name={item.name}
          itemId={item.folderId}
          updateName={updateName}
        />
        <Menu item={item} isOpenMenu={isOpenMenu} openMenu={openMenu} closeMenu={closeMenu} />
      </div>
    </>
  );
};
