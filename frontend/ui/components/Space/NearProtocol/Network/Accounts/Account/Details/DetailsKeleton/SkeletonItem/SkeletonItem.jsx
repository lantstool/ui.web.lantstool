import { Skeleton } from '@gc/Skeleton/Skeleton.jsx';
import itemCn from '../../Item/Item.module.scss';
import cn from './SkeletonItem.module.scss';

export const SkeletonItem = ({ valueClassName }) => (
  <div className={itemCn.item}>
    <div className={itemCn.label}>
      <Skeleton className={cn.icon} />
      <p className={itemCn.title}>
        <Skeleton className={cn.titleText} />
      </p>
    </div>
    <div className={itemCn.wrapper}>
      <p className={itemCn.data}>
        <Skeleton className={valueClassName} />
      </p>
    </div>
  </div>
);
