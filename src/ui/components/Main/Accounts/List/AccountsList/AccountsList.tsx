import cn from './AccountsList.module.css';
import { Link } from 'react-router-dom';
import { useStoreState } from '../../../../../../react-vault';
import { CopyButton } from '../../../general/CopyButton/CopyButton.tsx';

export const AccountsList = () => {
  const ids: string[] = useStoreState((store: any) => store.accounts.ids);
  const records: any = useStoreState((store: any) => store.accounts.records);
  const contracts: any = useStoreState((store: any) => store.contracts.records);

  return (
    <div>
      <div className={cn.wrapper}>
        <h4 className={cn.title}>Account Id</h4>
        <h4 className={cn.title}>Account Name</h4>
        <h4 className={cn.title}>Contract</h4>
      </div>
      <div className={cn.list}>
        {ids.map((accountId: any) => (
          <Link key={accountId} className={cn.item} to={`${accountId}/details`}>
            <p className={cn.subtitle}>{records[accountId].accountId}</p>
            <p className={cn.subtitle}>{records[accountId].accountName}</p>
            {contracts[records[accountId].contractId] && (
              <div className={cn.contract}>
                <p className={cn.subtitle}>{contracts[records[accountId].contractId].name}</p>
                <CopyButton text={contracts[records[accountId].contractId].name} />
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
