import { Skeleton } from '@gc/Skeleton/Skeleton.jsx';
import { SkeletonItem } from './SkeletonItem/SkeletonItem.jsx';
import detailsCn from '../Details.module.scss';
import cnm from 'classnames';
import cn from './DetailsSkeleton.module.scss';

export const DetailsSkeleton = () => (
  <div>
    <div className={detailsCn.details}>
      <SkeletonItem valueClassName={cn.value1} />
      <SkeletonItem valueClassName={cn.value2} />
      <SkeletonItem valueClassName={cn.value3} />
      <SkeletonItem valueClassName={cn.value4} />
      <SkeletonItem valueClassName={cn.value5} />
    </div>
    <hr className={detailsCn.border} />
    <div className={cn.note}>
      <Skeleton className={cn.noteLabel} />
      <Skeleton className={cn.noteInput} />
    </div>
    <hr className={cnm(detailsCn.border, cn.border)} />
    <div className={detailsCn.faucetWrapper}>
      <Skeleton className={cn.faucetTitle} />
      <Skeleton className={cn.faucetButton} />
    </div>
  </div>
);
