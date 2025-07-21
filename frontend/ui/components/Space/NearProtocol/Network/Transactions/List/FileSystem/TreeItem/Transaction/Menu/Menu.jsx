import { useStoreEffect, useStoreState } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { Popper } from '@gc/Popper/Popper.jsx';
import { DeleteModal } from '../../_general/DeleteModal/DeleteModal.jsx';
import { useToggler } from '@hooks/useToggler.js';
import { ExportModal } from '../../../../../../_general/ExportModal/ExportModal.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { transactionSchema } from '../../../../../Transaction/Form/validations/transactionSchema.js';
import cnm from 'classnames';
import cn from './Menu.module.scss';

export const Menu = ({ item, isOpenMenu, openMenu, closeMenu }) => {
  const { spaceId, networkId } = useParams();
  const exportOneAsZip = useStoreEffect((store) => store.nearProtocol.transactions.exportOneAsZip);
  const navigate = useNavigate();
  const transactionDraft = useStoreState(
    (store) => store.nearProtocol.transactions.drafts[item.transactionId],
    [item.transactionId],
  );
  const duplicateOne = useStoreEffect((store) => store.nearProtocol.transactions.duplicateOne);
  const removeOne = useStoreEffect((store) => store.nearProtocol.transactions.removeOne);
  const exportOneAsJson = useStoreEffect(
    (store) => store.nearProtocol.transactions.exportOneAsJson,
  );
  const exportOneAsJsonFile = useStoreEffect(
    (store) => store.nearProtocol.transactions.exportOneAsJsonFile,
  );

  const [isDeleteOpen, openDelete, closeDelete] = useToggler(false);
  const [isExportOpen, openExport, closeExport] = useToggler(false);

  const form = useForm({
    defaultValues: transactionDraft?.origin?.body,
    mode: 'onSubmit',
    resolver: yupResolver(transactionSchema),
  });

  const exportModal = () => {
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
    removeOne({
      spaceId,
      networkId,
      transactionId: item.transactionId,
      navigate,
      closeModal: closeMenu,
    });
    closeMenu();
  };

  return (
    <>
      <div className={cn.menu}>
        <button className={cnm(cn.menuButton, isOpenMenu && cn.activeBtn)} onClick={openMenu}>
          <span className={cn.menuIcon} />
        </button>
        <Popper isOpen={isOpenMenu} closeMenu={closeMenu} position="right">
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
      </div>
      {isDeleteOpen && (
        <DeleteModal closeModal={closeDelete} item={item} text="transactin" remove={remove} />
      )}
      {isExportOpen && (
        <ExportModal
          origin={transactionDraft?.origin}
          form={form}
          closeModal={closeExport}
          exportOneAsJson={exportOneAsJson}
          exportOneAsJsonFile={exportOneAsJsonFile}
          exportOneAsZip={exportOneAsZip}
        />
      )}
    </>
  );
};
