import cn from './AccountsList.module.css';
import { Link } from 'react-router-dom';
import { useStoreState } from '../../../../../../../../../react-vault/index.js';

export const AccountsList = () => {
  const ids = useStoreState((store) => store.accounts.ids);
  const records = useStoreState((store) => store.accounts.records);

  return (
    <div>
      <div className={cn.wrapper}>
        <h4 className={cn.title}>Account Id</h4>
        <h4 className={cn.title}>Account Name</h4>
      </div>
      <div className={cn.list}>
        {ids.map((accountId) => (
          <Link key={accountId} className={cn.item} to={`${accountId}/details`}>
            <p className={cn.subtitle}>{records[accountId].accountId}</p>
            <p className={cn.subtitle}>{records[accountId].accountName}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
