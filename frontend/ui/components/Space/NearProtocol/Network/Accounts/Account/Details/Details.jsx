import { useEffect } from 'react';
import { useLoader } from '@hooks/useLoader.js';
import { useParams } from 'react-router-dom';
import { useStoreAction, useStoreEffect, useStoreState } from '@react-vault';
import { Item } from './Item/Item.jsx';
import { Note } from './Note/Note.jsx';
import accountCircleOutline from '@assets/accountCircleOutline.svg';
import lockKeyholeOutline from '@assets/lockKeyholeOutline.svg';
import walletOutline from '@assets/walletOutline.svg';
import storageSquareOutline from '@assets/storageSquareOutline.svg';
import deployContractLinear from '@assets/deployContractLinear.svg';
import cn from './Details.module.scss';

export const Details = () => {
  const { spaceId, networkId, accountId } = useParams();
  const getAccountDetails = useStoreEffect(
    (store) => store.nearProtocol.accounts.getAccountDetails,
  );
  const resetAccountDetails = useStoreAction(
    (store) => store.nearProtocol.accounts.resetAccountDetails,
  );
  const details = useStoreState((store) => store.nearProtocol.accounts.account.details);
  const [isLoading] = useLoader(getAccountDetails, { spaceId, networkId, accountId });
  // We have to reset data because we will display the wrong data (of prev account)
  // if user will try to open the non-existing account details page
  useEffect(() => resetAccountDetails, []);

  if (isLoading) return <p>Loading...</p>;

  const {
    note,
    balance,
    lockedForStorage,
    available,
    storageUsage,
    hasDeployedContract,
    codeHash,
  } = details;

  if (!balance)
    return (
      <div className={cn.empty}>
        <span className={cn.icon} />
        <h1 className={cn.title}>This account is not yet on-chain.</h1>
      </div>
    );

  return (
    <div>
      <div className={cn.details}>
        {balance && <Item title="Account Balance" data={`${balance} NEAR`} icon={walletOutline} />}
        {available && (
          <Item title="Available for Use" data={`${available} NEAR`} icon={walletOutline} />
        )}
        {lockedForStorage && (
          <Item
            title="Locked for Storage"
            data={`${lockedForStorage} NEAR`}
            icon={lockKeyholeOutline}
          />
        )}
        {storageUsage && (
          <Item
            title="Storage Used"
            data={`${storageUsage / 1000} KB`}
            icon={storageSquareOutline}
          />
        )}
        <Item
          title="Has Deployed Contract"
          data={hasDeployedContract ? 'Yes' : 'No'}
          icon={deployContractLinear}
        />
        {codeHash && (
          <Item title="Contract WASM Hash" data={codeHash} icon={accountCircleOutline} />
        )}
      </div>
      <hr className={cn.border} />
      <Note note={note} />
    </div>
  );
};
