import { useStoreEffect } from '@react-vault';
import { useParams } from 'react-router-dom';
import { Items } from './Items/Items.jsx';
import { useLoader } from '@hooks/useLoader.js';
import { KeySquareBold } from '../../../../../../_general/icons/KeySquareBold.jsx';
import cn from './AccountKeys.module.scss';

export const AccountKeys = () => {
  const { spaceId, networkId, accountId } = useParams();
  const getAccountKeys = useStoreEffect((store) => store.nearProtocol.accounts.getAccountKeys);
  const [isLoading, keys] = useLoader(getAccountKeys, { spaceId, networkId, accountId }, [
    accountId,
  ]);

  if (isLoading || !keys) return <p>Loading...</p>;

  const { fullAccess, functionCall } = keys;

  if (fullAccess.length === 0 && functionCall.length === 0)

    return (
      <div className={cn.empty}>
        <KeySquareBold style={cn.icon} />
        <h1 className={cn.title}>This account is not yet on-chain or has no associated keys.</h1>
      </div>
    );

  return (
    <div className={cn.keys}>
      <Items keys={fullAccess} type="fullAccess" name="Full Access" />
      <Items keys={functionCall} type="functionCall" name="Function Call" />
    </div>
  );
};
