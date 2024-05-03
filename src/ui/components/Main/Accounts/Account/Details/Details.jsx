import cn from './Details.module.css';
import { useParams } from 'react-router-dom';
import { useStoreState } from '../../../../../../react-vault';
import { utils } from 'near-api-js';
import { Item } from './Item/Item.jsx';

const formatNumber = (number) => {
  const formatNearAmount = utils.format.formatNearAmount(number);
  return formatNearAmount.toString().replace(/(\.\d{5})\d*$/, '$1');
};

export const Details = () => {
  const { accountId } = useParams();
  const account = useStoreState((store) => store.accounts.records[accountId]);
  const balance = formatNumber(account.balance);
  const lockedForStorage = formatNumber(account.lockedForStorage);
  const available = formatNumber(account.available);

  return (
    <div className={cn.details}>
      <h2 className={cn.title}>Account Details</h2>
      <Item title="Account Id" data={account.accountId} copy={account.accountId} />
      {account.accountName && <Item title="Name" data={account.accountName} />}
      {account.balance && <Item title="Account Balance" data={`${balance} NEAR`} />}
      {account.balance && <Item title="Locked for Storage" data={`${lockedForStorage} NEAR`} />}
      {account.balance && <Item title="Available for Use" data={`${available} NEAR`} />}
      {account.storageUsage && (
        <Item title="Storage Used" data={`${account.storageUsage / 1000} KB`} />
      )}
      <Item
        title="Has Deployed Contract"
        data={account.hasDeployedOnChainContract ? 'Yes' : 'No'}
      />
    </div>
  );
};
