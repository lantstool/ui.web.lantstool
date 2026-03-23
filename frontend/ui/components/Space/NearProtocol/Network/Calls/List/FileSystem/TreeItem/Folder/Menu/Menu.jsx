import { DeleteModal } from '../../../../../../_general/DeleteModal/DeleteModal.jsx';
import { FolderPopperMenu } from '../../../../../../_general/PopperMenu/FolderPopperMenu/FolderPopperMenu.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useState } from 'react';

export const Menu = ({ item, isOpenMenu, openMenu, closeMenu, setIsEditing }) => {
  const navigate = useNavigate();
  const { spaceId, networkId, callId } = useParams();
  const removeCallFolder = useStoreEffect((store) => store.nearProtocol.folders.removeCallFolder);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const openDelete = () => {
    setDeleteOpen(true);
    closeMenu();
  };

  const closeDelete = () => {
    setDeleteOpen(false);
  };

  const remove = () =>
    removeCallFolder({
      spaceId,
      networkId,
      callId,
      item,
      navigate,
      closeModal: closeDelete,
    });

  const openEditMode = () => {
    setIsEditing(true);
    closeMenu();
  };

  return (
    <>
      <FolderPopperMenu
        isOpenMenu={isOpenMenu}
        openMenu={openMenu}
        closeMenu={closeMenu}
        openEditMode={openEditMode}
        openDelete={openDelete}
      />
      {isDeleteOpen && (
        <DeleteModal closeModal={closeDelete} item={item} text={'folder'} remove={remove} />
      )}
    </>
  );
};
