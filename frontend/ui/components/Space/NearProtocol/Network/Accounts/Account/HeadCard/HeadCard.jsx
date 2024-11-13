import { useParams } from 'react-router-dom';
import { formatDate } from '../../../../../../../../store/helpers/formatDate.js';
import { CopyButton } from '../../../../../../_general/CopyButton/CopyButton.jsx';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { TrashBinOutline } from '../../../../../../_general/icons/TrashBinOutline.jsx';
import { useStoreState } from '@react-vault';
import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import { useState } from 'react';
import cn from './HeadCard.module.scss';

export const HeadCard = () => {
  const { accountId } = useParams();
  const { createdAt } = useStoreState(
    (store) => store.nearProtocol.accounts.records[accountId],
    [accountId],
  );
  const { date, hourMinute } = formatDate(createdAt);
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);

  return (
    <div className={cn.container}>
      <div>
        <h2 className={cn.subtitle}>Account ID</h2>
        <h1 className={cn.accountId}>{accountId}</h1>
        <span className={cn.date}>{`Imported ${date}, ${hourMinute}`}</span>
      </div>
      <div className={cn.btnWrapper}>
        <CopyButton event="onClick" type="bordered" value={accountId} />
        <Button IconLeft={TrashBinOutline} size="medium" color="secondary" onClick={openModal} />
      </div>
      <DeleteModal isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
};
