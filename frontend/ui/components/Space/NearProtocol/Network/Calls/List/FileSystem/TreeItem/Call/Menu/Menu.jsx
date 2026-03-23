import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteModal } from '../../../../../../_general/DeleteModal/DeleteModal.jsx';
import { ItemPopperMenu } from '../../../../../../_general/PopperMenu/ItemPopperMenu/ItemPopperMenu.jsx';
import { ExportCall } from './ExportCall/ExportСall.jsx';
import { useRef, useState } from 'react';
import cn from './Menu.module.scss';

export const Menu = ({ item, isOpenMenu, openMenu, closeMenu, setIsEditing }) => {
  const { spaceId, networkId, callId } = useParams();
  const navigate = useNavigate();
  const duplicateOne = useStoreEffect((store) => store.nearProtocol.calls.duplicateOne);
  const removeOne = useStoreEffect((store) => store.nearProtocol.calls.removeOne);
  const onMountCall = useStoreEffect((store) => store.nearProtocol.calls.onMountCall);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isExportOpen, setExportOpen] = useState(false);
  const anchorRef = useRef(null);

  const openDelete = () => {
    closeMenu();
    setDeleteOpen(true);
  };

  const closeDelete = () => setDeleteOpen(false);

  const openExport = async () => {
    closeMenu();
    await onMountCall(item.callId);
    setExportOpen(true);
  };

  const closeExport = () => setExportOpen(false);

  const duplicate = () => {
    closeMenu();
    duplicateOne({ spaceId, networkId, callId: item.callId });
  };

  const remove = () => {
    closeMenu();
    removeOne({
      spaceId,
      networkId,
      callId: item.callId,
      activeCallId: callId,
      navigate,
      closeModal: closeDelete,
    });
  };

  const openEditMode = () => {
    setIsEditing(true);
    closeMenu();
  };

  return (
    <div
      className={cn.menu}
      onClick={(e) => e.preventDefault()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <ItemPopperMenu
        isOpenMenu={isOpenMenu}
        openMenu={openMenu}
        closeMenu={closeMenu}
        anchorRef={anchorRef}
        duplicate={duplicate}
        openExport={openExport}
        openEditMode={openEditMode}
        openDelete={openDelete}
      />
      {isExportOpen && (
        <ExportCall callId={item.callId} closeExport={closeExport} isExportOpen={closeExport} />
      )}
      {isDeleteOpen && (
        <DeleteModal closeModal={closeDelete} item={item} text="call" remove={remove} />
      )}
    </div>
  );
};
