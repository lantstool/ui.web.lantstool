// import { Button } from '../../../../../_general/Button/Button.jsx';
// import { ExportLinear } from '../../../../../_general/icons/ExportLinear.jsx';
import { formatDate } from '../../../../../../../store/helpers/formatDate.js';
import cn from './HeadCard.module.scss';

export const HeadCard = ({ network }) => {
  const { createdAt, networkId } = network;
  const { date, hourMinute } = formatDate(createdAt);

  return (
    <div className={cn.headCard}>
      <div className={cn.leftSide}>
        <span className={cn.pageName}>Network</span>
        <h1 className={cn.networkId}>{networkId}</h1>
        <span className={cn.date}>{`Added ${date}, ${hourMinute}`}</span>
      </div>
      <div className={cn.rightSide}>
        {/*<Button size="medium" color="secondary" IconLeft={ExportLinear}>*/}
        {/*  Export data*/}
        {/*</Button>*/}
      </div>
    </div>
  );
};
