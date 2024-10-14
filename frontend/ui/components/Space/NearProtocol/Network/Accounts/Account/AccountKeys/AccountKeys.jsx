import { useStoreEffect } from '../../../../../../../../../react-vault/index.js';
import { useParams } from 'react-router-dom';
import { Items } from './Items/Items.jsx';
import { useLoader } from '../../../../../../../hooks/useLoader.js';
import cn from './AccountKeys.module.scss';

export const AccountKeys = () => {
  const { spaceId, networkId, accountId } = useParams();
  const getAccountKeys = useStoreEffect((store) => store.nearProtocol.accounts.getAccountKeys);
  const [isLoading, keys] = useLoader(getAccountKeys, { spaceId, networkId, accountId }, [
    accountId,
  ]);

  if (isLoading || !keys) return null;

  const { fullAccess, functionCall } = keys;

  if (fullAccess.length === 0 && functionCall.length === 0)
    return <p>This account has no keys</p>;

  return (
    <div className={cn.keys}>
      <Items keys={fullAccess} type="fullAccess" name="Full Access" />
      <Items keys={functionCall} type="functionCall" name="Function Call" />
    </div>
  );
};
