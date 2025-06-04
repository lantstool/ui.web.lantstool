import { useStoreEffect } from '@react-vault';
import { useParams } from 'react-router-dom';
import {KeyList} from './KeyList/KeyList.jsx';
import { useLoader } from '@hooks/useLoader.js';
import cn from './AccountKeys.module.scss';

export const AccountKeys = () => {
  const { spaceId, networkId, accountId } = useParams();
  const getAccountKeys = useStoreEffect((store) => store.nearProtocol.accounts.getAccountKeys);
  const [isLoading, keys] = useLoader(getAccountKeys, { spaceId, networkId, accountId }, [
    accountId,
  ]);

  if (isLoading) return <p>Loading...</p>;

  if (!keys?.fullAccess.length > 0 && !keys?.functionCall.length > 0)
    return (
      <div className={cn.empty}>
        <span className={cn.icon} />
        <h1 className={cn.title}>This account is not yet on-chain or has no associated keys.</h1>
      </div>
    );

  return (
    <div className={cn.keys}>
      <KeyList keys={keys.fullAccess} type="fullAccess" name="Full Access" />
      <KeyList keys={keys.functionCall} type="functionCall" name="Function Call" />
    </div>
  );
};
