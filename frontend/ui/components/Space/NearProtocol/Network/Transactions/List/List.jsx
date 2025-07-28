import { useToggler } from '@hooks/useToggler.js';
import { useStoreEffect, useStoreState } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { ImportModal } from '../../_general/ImportModal/ImportModal.jsx';
import { transactionConfig } from '../_general/transactionConfig.js';
import { transactionImportSchema } from '../_general/transactionImportSchema/transactionImportSchema.js';
import { Tooltip } from '@gc/Tooltip/Tooltip.jsx';
import { FileSystem } from './FileSystem/FileSystem.jsx';
import { CreateMenu } from '../../_general/CreateMenu/CreateMenu.jsx';
import { useResizableSidebar } from '../../_general/hooks/useResizeSidebar.js';
import cn from './List.module.scss';

export const List = ({ txList, foldersList }) => {
  const { spaceId, networkId } = useParams();
  const navigate = useNavigate();
  const importOneFromJson = useStoreEffect(
    (store) => store.nearProtocol.transactions.importOneFromJson,
  );
  const importOneFromFile = useStoreEffect(
    (store) => store.nearProtocol.transactions.importOneFromFile,
  );

  const createOneTransaction = useStoreEffect((store) => store.nearProtocol.transactions.create);
  const sidebarSize = useStoreState((store) => store.nearProtocol.transactionsSidebarSize);
  const updateSidebarSize = useStoreEffect((store) => store.nearProtocol.updateSidebarSize);

  const [isImportOpen, openImport, closeImport] = useToggler(false);

  const withTxConfig = (fn) => (args) => fn({ ...args, transactionConfig });

  const { sidebarRef, handleMouseDown, newWidth } = useResizableSidebar({
    initialWidth: sidebarSize,
    onResizeEnd: (newSize) => {
      updateSidebarSize({ type: 'transactionsSidebarSize', size: newSize });
    },
  });

  const createTransaction = () => createOneTransaction({ spaceId, networkId, navigate });

  return (
    <>
      <div className={cn.listWrapper}>
        <div className={cn.list} ref={sidebarRef} style={{ width: `${newWidth}px` }}>
          <div className={cn.topBar}>
            <CreateMenu type="transaction" text="Transaction" create={createTransaction}>
              <span className={cn.transactionIcon} />
            </CreateMenu>
            <Tooltip style={cn.tooltip} arrow={false} content="Import transaction" placement="top">
              <button className={cn.importBtn} onClick={openImport}>
                <span className={cn.importIcon} />
                <h2 className={cn.title}>Import</h2>
              </button>
            </Tooltip>
          </div>
          <FileSystem list={txList} foldersList={foldersList} />
        </div>
        <div className={cn.resizer} onMouseDown={handleMouseDown} />
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
