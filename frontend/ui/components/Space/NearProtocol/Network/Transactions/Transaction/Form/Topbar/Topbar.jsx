import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { ExportModal } from '../../../../_general/ExportModal/ExportModal.jsx';
import { EditName } from './EditName/EditName.jsx';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { Tooltip } from '../../../../../../../_general/Tooltip/Tooltip.jsx';
import { dateFormatter } from '../../../../../../../../../store/helpers/formatDate.js';
import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import { useToggler } from '@hooks/useToggler.js';
import cn from './Topbar.module.scss';

export const Topbar = ({ transaction, form }) => {
  const { spaceId, networkId, transactionId } = useParams();
  const duplicateOne = useStoreEffect((store) => store.nearProtocol.transactions.duplicateOne);
  const exportOneAsJson = useStoreEffect((store) => store.nearProtocol.transactions.exportOneAsJson);
  const exportOneAsZip = useStoreEffect((store) => store.nearProtocol.transactions.exportOneAsZip);
  const [isDeleteOpen, openDelete, closeDelete] = useToggler(false);
  const [isExportOpen, openExport, closeExport] = useToggler(false);

  const duplicate = () => duplicateOne({ spaceId, networkId, transactionId });

  return (
    <>
      <div className={cn.topbar}>
        <div>
          <EditName transaction={transaction} />
          <p className={cn.date}>Created {dateFormatter(transaction.createdAt)}</p>
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
      {isExportOpen && (
        <ExportModal
          origin={transaction}
          form={form}
          closeModal={closeExport}
          exportOneAsJson={exportOneAsJson}
          exportOneAsZip={exportOneAsZip}
        />
      )}
      {isDeleteOpen && <DeleteModal transaction={transaction} closeModal={closeDelete} />}
    </>
  );
};
