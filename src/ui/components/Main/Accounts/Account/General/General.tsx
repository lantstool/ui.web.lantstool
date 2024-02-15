import cn from './General.module.css';
import { useParams } from 'react-router-dom';
import { useStoreState } from '../../../../../../react-vault';
import { utils } from "near-api-js";

export const General = () => {
  const { accountId } = useParams();
  const account: any = useStoreState((store: any) => store.accounts.records[accountId]);

  return (
    <div className={cn.general}>
      <p>Balance: {utils.format.formatNearAmount(account.balance)}</p>
      <p>Storage: {account.storageUsage / 1000} KB</p>
    </div>
  );
};
