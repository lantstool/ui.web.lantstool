import { useEffect } from 'react';
import { useLoader } from '../../../../../../../hooks/useLoader.js';
import { useParams } from 'react-router-dom';
import {
  useStoreAction,
  useStoreEffect,
  useStoreState,
} from '../../../../../../../../../react-vault/index.js';
import { Item } from './Item/Item.jsx';
import cn from './Details.module.scss';

export const Details = () => {
  const { spaceId, networkId, accountId } = useParams();
  const getAccountDetails = useStoreEffect(
    (store) => store.nearProtocol.accounts.getAccountDetails,
  );
  const resetAccountDetails = useStoreAction(
    (store) => store.nearProtocol.accounts.resetAccountDetails,
  );
  const account = useStoreState((store) => store.nearProtocol.accounts.account);
  const [isLoading] = useLoader(getAccountDetails, { spaceId, networkId, accountId });

  useEffect(() => resetAccountDetails, []);

  if (isLoading) return <p>Loading...</p>;

  const { localName, balance, lockedForStorage, available, storageUsage, hasDeployedContract } =
    account.details;

  return (
    <div className={cn.details}>
      <h2 className={cn.title}>Account Details</h2>
      <Item title="Account Id" data={accountId} copy={accountId} />
      {localName && <Item title="Name" data={localName} />}
      {balance && <Item title="Account Balance" data={`${balance} NEAR`} />}
      {lockedForStorage && <Item title="Locked for Storage" data={`${lockedForStorage} NEAR`} />}
      {available && <Item title="Available for Use" data={`${available} NEAR`} />}
      {storageUsage && <Item title="Storage Used" data={`${storageUsage / 1000} KB`} />}
      <Item title="Has Deployed Contract" data={hasDeployedContract ? 'Yes' : 'No'} />
    </div>
  );
};
