import { Skeleton } from '@gc/Skeleton/Skeleton.jsx';
import keysCn from '../AccountKeys.module.scss';
import listCn from '../KeyList/KeyList.module.scss';
import itemCn from '../KeyList/Item/Item.module.scss';
import cn from './AccountKeysSkeleton.module.scss';

export const AccountKeysSkeleton = () => (
  <div className={keysCn.keys}>
    <div className={listCn.container}>
      <h2 className={cn.title}>
        <Skeleton className={cn.titleText} />
      </h2>
      <div className={itemCn.item}>
        <div className={itemCn.wrapper}>
          <p className={itemCn.subtitle}>
            <Skeleton className={cn.keyText} />
          </p>
          <div className={itemCn.buttonWrapper}>
            <Skeleton className={cn.checkIcon} />
            <Skeleton className={cn.copyIcon} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
