import { formatDate } from '../../../../../../../../store/helpers/formatDate.js';
import { CopyButton } from '../../../../../../_general/CopyButton/CopyButton.jsx';
import cn from './HeadCard.module.scss';

export const HeadCard = ({ keyData }) => {
  const { publicKey, createdAt } = keyData;
  const { date, hourMinute } = formatDate(createdAt);

  return (
    <div className={cn.container}>
      <div>
        <h2 className={cn.subtitle}>Access key</h2>
        <h1 className={cn.publicKey}>{publicKey}</h1>
        <span className={cn.date}>{`Imported ${date}, ${hourMinute}`}</span>
      </div>
      <div className={cn.btnWrapper}>
        <CopyButton event="onClick" type="bordered" value={publicKey} />
      </div>
    </div>
  );
};
