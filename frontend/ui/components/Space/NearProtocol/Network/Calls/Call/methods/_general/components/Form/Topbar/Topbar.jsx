import { Button } from '../../../../../../../../../../_general/Button/Button.jsx';
import { EditName } from './EditName/EditName.jsx';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { dateFormatter } from '../../../../../../../../../../../../store/helpers/formatDate.js';
import { Tooltip } from '../../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import { ExportModal } from '../../../../../../../_general/ExportModal/ExportModal.jsx';
import { useToggler } from '@hooks/useToggler.js';
import cn from './Topbar.module.scss';

export const Topbar = ({ call, form }) => {
  const duplicateOne = useStoreEffect((store) => store.nearProtocol.calls.duplicateOne);
  const exportOneAsJson = useStoreEffect((store) => store.nearProtocol.calls.exportOneAsJson);
  const exportOneAsZip = useStoreEffect((store) => store.nearProtocol.calls.exportOneAsZip);
  const [isDeleteOpen, openDelete, closeDelete] = useToggler(false);
  const [isExportOpen, openExport, closeExport] = useToggler(false);
  const { spaceId, networkId, callId } = useParams();

  const duplicate = () => duplicateOne({ spaceId, networkId, callId });

  return (
    <>
      <div className={cn.topbar}>
        <div className={cn.container}>
          <div>
            <EditName call={call} />
            <p className={cn.date}>Created {dateFormatter(call.createdAt)}</p>
          </div>
          <div className={cn.buttonWrapper}>
            <Tooltip arrow={false} content="Duplicate" placement="top">
              <Button
                onClick={duplicate}
                size="medium"
                color="secondary"
                iconLeftStyles={cn.duplicateIcon}
              />
            </Tooltip>
            <Tooltip arrow={false} content="Export" placement="top">
              <Button
                onClick={openExport}
                size="medium"
                color="secondary"
                iconLeftStyles={cn.exportIcon}
              />
            </Tooltip>
            <Tooltip arrow={false} content="Delete" placement="top">
              <Button
                onClick={openDelete}
                size="medium"
                color="secondary"
                iconLeftStyles={cn.deleteIcon}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      {isExportOpen && (
        <ExportModal
          origin={call}
          form={form}
          closeModal={closeExport}
          exportOneAsJson={exportOneAsJson}
          exportOneAsZip={exportOneAsZip}
        />
      )}
      {isDeleteOpen && <DeleteModal call={call} closeModal={closeDelete} />}
    </>
  );
};
