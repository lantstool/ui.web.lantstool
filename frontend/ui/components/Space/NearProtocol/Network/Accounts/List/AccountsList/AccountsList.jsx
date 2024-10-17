import { Link } from 'react-router-dom';
import { useStoreState } from '../../../../../../../../../react-vault/index.js';
import cn from './AccountsList.module.scss';

export const AccountsList = () => {
  const ids = useStoreState((store) => store.nearProtocol.accounts.ids);
  const records = useStoreState((store) => store.nearProtocol.accounts.records);

  return (
    <>
      <div className={cn.wrapper}>
        <h4 className={cn.title}>Account Id</h4>
        <h4 className={cn.title}>Local Name</h4>
      </div>
      <div className={cn.list}>
        {ids.map((accountId) => (
          <Link key={accountId} className={cn.item} to={`${accountId}/details`}>
            <p className={cn.subtitle}>{records[accountId].accountId}</p>
            <p className={cn.subtitle}>{records[accountId].note}</p>
          </Link>
        ))}
      </div>
    </>
  );
};
