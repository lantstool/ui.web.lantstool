import { Link } from 'react-router-dom';
import { useStoreState } from '../../../../../react-vault';
import cn from './List.module.css';

export const List = () => {
  const ids: string[] = useStoreState((store: any) => store.accounts.ids);
  // const records: any = useStoreState((store: any) => store.accounts.records);

  return (
    <div className={cn.container}>
      <div className={cn.topbar}>Accounts</div>
      <div className={cn.list}>
        {ids.map((accountId: any) => (
          <div key={accountId} className={cn.item}>
            <Link to={`${accountId}/general`}>{accountId}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
