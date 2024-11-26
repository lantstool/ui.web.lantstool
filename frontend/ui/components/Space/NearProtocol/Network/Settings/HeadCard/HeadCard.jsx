import { Button } from '../../../../../_general/Button/Button.jsx';
import { ExportLinear } from '../../../../../_general/icons/ExportLinear.jsx';
import { BadgeSelector } from '../../../../../_general/BadgeSelector/BadgeSelector.jsx';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../../../../../../store/helpers/formatDate.js';
import { EditName } from './EditName/EditName.jsx';
import { schema } from './schema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from './HeadCard.module.scss';


export const HeadCard = ({ network }) => {
  const { createdAt, networkId } = network;
  const { date, hourMinute } = formatDate(createdAt);

  return (
    <form className={cn.headCard}>
      <div className={cn.container}>
        <span>Network</span>
        <span>{networkId}</span>
        <span className={cn.date}>{`Added ${date}, ${hourMinute}`}</span>
      </div>
      <div className={cn.buttonWrapper}>
        <Button size="medium" color="secondary" IconLeft={ExportLinear}>
          Export data
        </Button>
      </div>
    </form>
  );
};
