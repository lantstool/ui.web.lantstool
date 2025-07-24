import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { Popper } from '@gc/Popper/Popper.jsx';
import { DeleteModal } from '../../_general/DeleteModal/DeleteModal.jsx';
import { useToggler } from '@hooks/useToggler.js';
import { ExportTransaction } from './ExportTransaction/ExportTransaction.jsx';
import { useRef } from 'react';
import cnm from 'classnames';
import cn from './Menu.module.scss';

export const Menu = ({ item }) => {
  const { spaceId, networkId, transactionId } = useParams();
  const navigate = useNavigate();
  const duplicateOne = useStoreEffect((store) => store.nearProtocol.transactions.duplicateOne);
  const removeOne = useStoreEffect((store) => store.nearProtocol.transactions.removeOne);
  const anchorRef = useRef(null);

  const [isOpenMenu, openMenu, closeMenu] = useToggler(false);
  const [isDeleteOpen, openDelete, closeDelete] = useToggler(false);
  const [isExportOpen, openExport, closeExport] = useToggler(false);

  const onMountTransaction = useStoreEffect(
    (store) => store.nearProtocol.transactions.onMountTransaction,
  );

  const exportModal = async () => {
    await onMountTransaction(item.transactionId);
    openExport();
    closeMenu();
  };

  const deleteModal = () => {
    closeMenu();
    openDelete();
  };

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

  return (
    <div
      className={cn.menu}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button
        ref={anchorRef}
        className={cnm(cn.menuButton, isOpenMenu && cn.activeBtn)}
        onClick={openMenu}
      >
        <span className={cn.menuIcon} />
      </button>
      <Popper
        isOpen={isOpenMenu}
        closeMenu={closeMenu}
        position="left"
        anchorEl={anchorRef.current}
      >
        <div className={cn.container}>
          <button className={cn.txButton} onClick={duplicate}>
            <span className={cn.duplicateIcon} />
            <p className={cn.title}>Duplicate</p>
          </button>
          <button className={cn.folderButton} onClick={exportModal}>
            <span className={cn.exportIcon} />
            <p className={cn.title}>Export</p>
          </button>
          <button className={cn.folderButton} onClick={deleteModal}>
            <span className={cn.deleteIcon} />
            <p className={cn.title}>Delete</p>
          </button>
        </div>
      </Popper>
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
