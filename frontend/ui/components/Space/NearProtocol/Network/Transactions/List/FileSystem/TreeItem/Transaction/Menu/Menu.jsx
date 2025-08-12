import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteModal } from '../../../../../../_general/DeleteModal/DeleteModal.jsx';
import { ItemPopperMenu } from '../../../../../../_general/PopperMenu/ItemPopperMenu/ItemPopperMenu.jsx';
import { ExportTransaction } from './ExportTransaction/ExportTransaction.jsx';
import { useRef, useState } from 'react';
import cn from './Menu.module.scss';

export const Menu = ({ item, isOpenMenu, openMenu, closeMenu, setIsEditing }) => {
  const { spaceId, networkId, transactionId } = useParams();
  const navigate = useNavigate();
  const duplicateOne = useStoreEffect((store) => store.nearProtocol.transactions.duplicateOne);
  const removeOne = useStoreEffect((store) => store.nearProtocol.transactions.removeOne);
  const onMountTransaction = useStoreEffect(
    (store) => store.nearProtocol.transactions.onMountTransaction,
  );
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
    await onMountTransaction(item.transactionId);
    setExportOpen(true);
  };

  const closeExport = () => setExportOpen(false);

  const duplicate = () => {
    closeMenu();
    duplicateOne({ spaceId, networkId, transactionId: item.transactionId });
  };

  const remove = () => {
    closeMenu();
    removeOne({
      spaceId,
      networkId,
      transactionId: item.transactionId,
      activeTxId: transactionId,
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
        <ExportTransaction
          transactionId={item.transactionId}
          closeExport={closeExport}
          isExportOpen={closeExport}
        />
      )}
      {isDeleteOpen && (
        <DeleteModal closeModal={closeDelete} item={item} text="transactin" remove={remove} />
      )}
    </div>
  );
};
