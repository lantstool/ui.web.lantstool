import { useToggler } from '@hooks/useToggler.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { ImportModal } from '../../_general/ImportModal/ImportModal.jsx';
import { transactionConfig } from '../_general/transactionConfig.js';
import { transactionImportSchema } from '../_general/transactionImportSchema/transactionImportSchema.js';
import { Tooltip } from '@gc/Tooltip/Tooltip.jsx';
import { FileSystem } from '../../_general/FileSystem/FileSystem.jsx';
import cn from './List.module.scss';

export const List = ({ txList, foldersList }) => {
  const { spaceId, networkId } = useParams();
  const navigate = useNavigate();
  const createOneTransaction = useStoreEffect((store) => store.nearProtocol.transactions.create);
  const createOneFolder = useStoreEffect((store) => store.nearProtocol.folders.createOne);

  const importOneFromJson = useStoreEffect(
    (store) => store.nearProtocol.transactions.importOneFromJson,
  );
  const importOneFromFile = useStoreEffect(
    (store) => store.nearProtocol.transactions.importOneFromFile,
  );
  const [isImportOpen, openImport, closeImport] = useToggler(false);

  const withTxConfig = (fn) => (args) => fn({ ...args, transactionConfig });

  const createTransaction = () => {
    createOneTransaction({ spaceId, networkId, navigate });
  };

  const createFolder = () => {
    createOneFolder({ spaceId, networkId, type: 'transaction' });
  };

  return (
    <>
      <div className={cn.list}>
        <div className={cn.topBar}>
          <button className={cn.createBtn} onClick={createTransaction}>
            <span className={cn.addIcon} />
            <h2 className={cn.title}>Transaction</h2>
          </button>
          <button className={cn.createBtn} onClick={createFolder}>
            <span className={cn.FolderIcon} />
            <h2 className={cn.title}>Folder</h2>
          </button>
          <Tooltip style={cn.tooltip} arrow={false} content="Import transaction" placement="top">
            <button className={cn.importBtn} onClick={openImport}>
              <span className={cn.importIcon} />
            </button>
          </Tooltip>
        </div>
        <FileSystem list={txList} foldersList={foldersList} />
      </div>
      {isImportOpen && (
        <ImportModal
          closeModal={closeImport}
          yupSchema={transactionImportSchema}
          importOneFromJson={withTxConfig(importOneFromJson)}
          importOneFromFile={withTxConfig(importOneFromFile)}
          entityName="Transaction"
        />
      )}
    </>
  );
};
