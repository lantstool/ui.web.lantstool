import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { EditName } from './EditName/EditName.jsx';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { Tooltip } from '../../../../../../../_general/Tooltip/Tooltip.jsx';
import { dateFormatter } from '../../../../../../../../../store/helpers/formatDate.js';
import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import { useToggler } from '@hooks/useToggler.js';
import cn from './Topbar.module.scss';

export const Topbar = ({ transaction }) => {
  const { spaceId, networkId, transactionId } = useParams();
  const duplicateOne = useStoreEffect((store) => store.nearProtocol.transactions.duplicateOne);
  const [isModalOpen, openModal, closeModal] = useToggler();

  const duplicate = () => duplicateOne({ spaceId, networkId, transactionId });

  return (
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
        <Tooltip arrow={false} content="Export JSON" placement="top">
          <Button size="medium" color="secondary" iconLeftStyles={cn.exportIcon} />
        </Tooltip>
        <Tooltip arrow={false} content="Delete" placement="top">
          <Button
            onClick={openModal}
            size="medium"
            color="secondary"
            iconLeftStyles={cn.deleteIcon}
          />
        </Tooltip>
      </div>
      {isModalOpen && <DeleteModal transaction={transaction} closeModal={closeModal} />}
    </div>
  );
};
