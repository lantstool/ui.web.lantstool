import { useToggler } from '@hooks/useToggler.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '@react-vault';
import { callImportSchema } from '../_general/validations/callImportSchema.js';
import { Tooltip } from '@gc/Tooltip/Tooltip.jsx';
import { ImportModal } from '../../_general/ImportModal/ImportModal.jsx';
import { CreateMenu } from '../../_general/CreateMenu/CreateMenu.jsx';
import { FileSystem } from './FileSystem/FileSystem.jsx';
import { useResizableSidebar } from '../../_general/hooks/useResizeSidebar.js';
import cn from './List.module.scss';

export const List = ({ list, foldersList }) => {
  const [isImportOpen, openImport, closeImport] = useToggler(false);
  const sidebarSize = useStoreState((store) => store.nearProtocol.callsSidebarSize);
  const updateSidebarSize = useStoreEffect((store) => store.nearProtocol.updateSidebarSize);
  const createOne = useStoreEffect((store) => store.nearProtocol.calls.createOne);
  const importOneFromJson = useStoreEffect((store) => store.nearProtocol.calls.importOneFromJson);
  const importOneFromFile = useStoreEffect((store) => store.nearProtocol.calls.importOneFromFile);

  const { spaceId, networkId } = useParams();
  const navigate = useNavigate();

  const { sidebarRef, handleMouseDown, newWidth } = useResizableSidebar({
    initialWidth: sidebarSize,
    onResizeEnd: (newSize) => {
      updateSidebarSize({ type: 'callsSidebarSize', size: newSize });
    },
  });

  const createCall = () => createOne({ spaceId, networkId, navigate });

  return (
    <>
      <div className={cn.listWrapper}>
        <div className={cn.list} ref={sidebarRef} style={{ width: `${newWidth}px` }}>
          <div className={cn.topBar}>
            <CreateMenu create={createCall} type="call" text="Call">
              <span className={cn.callIcon} />
            </CreateMenu>
            <Tooltip style={cn.tooltip} arrow={false} content="Import Call" placement="top">
              <button className={cn.importBtn} onClick={openImport}>
                <span className={cn.importIcon} />
                <h2 className={cn.title}>Import</h2>
              </button>
            </Tooltip>
          </div>
          <FileSystem list={list} foldersList={foldersList} />
        </div>
        <div className={cn.resizer} onMouseDown={handleMouseDown} />
      </div>

      {isImportOpen && (
        <ImportModal
          closeModal={closeImport}
          yupSchema={callImportSchema}
          importOneFromJson={importOneFromJson}
          importOneFromFile={importOneFromFile}
          entityName="Call"
        />
      )}
    </>
  );
};
