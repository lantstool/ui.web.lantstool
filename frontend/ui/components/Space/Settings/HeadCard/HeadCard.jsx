import { Button } from '../../../_general/Button/Button.jsx';
import { ExportLinear } from '../../../_general/icons/ExportLinear.jsx';
import { BadgeSelector } from '../../../_general/BadgeSelector/BadgeSelector.jsx';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../../../../store/helpers/formatDate.js';
import { EditName } from './EditName/EditName.jsx';
import { schema } from './schema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from './HeadCard.module.scss';


export const HeadCard = ({ space }) => {
  const { name, type, createdAt, badge, spaceId } = space;
  const { date, hourMinute } = formatDate(createdAt);

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name, badge },
  });

  return (
    <form className={cn.headCard}>
      <div className={cn.container}>
        <p className={cn.type}>{type}</p>
        <EditName name={name} form={form} spaceId={spaceId}/>
        <span className={cn.date}>{`Imported ${date}, ${hourMinute}`}</span>
      </div>
      <div className={cn.buttonWrapper}>
        <BadgeSelector form={form} size="medium" type="submit" spaceId={spaceId} />
        <Button size="medium" color="secondary" IconLeft={ExportLinear}>
          Export data
        </Button>
      </div>
    </form>
  );
};
