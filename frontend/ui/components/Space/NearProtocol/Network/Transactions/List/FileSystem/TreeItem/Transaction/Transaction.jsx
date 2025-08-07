import { NavLink, useParams } from 'react-router-dom';
import { Menu } from './Menu/Menu.jsx';
import { EditName } from '../../../../../_general/EditName/EditName.jsx';
import { useStoreEffect } from '@react-vault';
import { useFileSystemContext } from '../../../../../_general/FileSystemContext/FileSystemContext.jsx';
import { useState } from 'react';
import cnm from 'classnames';
import cn from './Transaction.module.scss';

export const Transaction = ({ item, wrapperProps }) => {
  const updateOneName = useStoreEffect((store) => store.nearProtocol.transactions.updateOneName);
  const { transactionId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { openMenuId, setOpenMenuId } = useFileSystemContext();

  const isOpenMenu = openMenuId === item.transactionId;
  const isActive = item.transactionId === transactionId && transactionId;
  const isFocused = isOpenMenu || isEditing;
  const { depth, clone } = wrapperProps;

  const updateName = (formValues) =>
    updateOneName({ formValues, transactionId: item.transactionId });

  const openMenu = () => setOpenMenuId(item.transactionId);

  const closeMenu = () => setOpenMenuId(null);

  return (
    <>
      <NavLink
        to={item.transactionId}
        data-edit-id={item.transactionId}
        className={cnm(cn.transaction, {
          [cn.children]: depth > 0,
          [cn.active]: isActive && !clone,
          [cn.focused]: isFocused && !isActive,
        })}
      >
        <EditName
          name={item.name}
          itemId={item.transactionId}
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
