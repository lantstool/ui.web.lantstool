import { NavLink, useParams } from 'react-router-dom';
import { Menu } from './Menu/Menu.jsx';
import { EditName } from '../../../../../_general/EditName/EditName.jsx';
import { useFileSystemContext } from '../../../../../_general/FileSystemContext/FileSystemContext.jsx';
import { useStoreEffect } from '@react-vault';
import { useState } from 'react';
import cnm from 'classnames';
import cn from './Call.module.scss';

export const Call = ({ item, wrapperProps }) => {
  const updateOneName = useStoreEffect((store) => store.nearProtocol.calls.updateOneName);
  const { callId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { openMenuId, setOpenMenuId } = useFileSystemContext();

  const isOpenMenu = openMenuId === item.callId;
  const isActive = item.callId === callId && callId;
  const isFocused = isOpenMenu || isEditing;

  const { depth, clone } = wrapperProps;

  const updateName = (formValues) => {
    updateOneName({ formValues, callId: item.callId });
  };

  const openMenu = () => setOpenMenuId(item.callId);

  const closeMenu = () => setOpenMenuId(null);

  return (
    <>
      <NavLink
        to={item.callId}
        data-edit-id={item.callId}
        className={cnm(cn.call, {
          [cn.children]: depth > 0,
          [cn.active]: isActive && !clone,
          [cn.focused]: isFocused && !isActive,
        })}
      >
        <EditName
          name={item.name}
          itemId={item.callId}
          updateName={updateName}
          styles={cn.editName}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          openMenuId={openMenuId}
        />
        <div className={cn.menuWrapper}>
          <Menu
            item={item}
            isOpenMenu={isOpenMenu}
            openMenu={openMenu}
            closeMenu={closeMenu}
            setIsEditing={setIsEditing}
          />
        </div>
      </NavLink>
    </>
  );
};
