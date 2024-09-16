import { useStoreState } from '../../../../../../../../react-vault/index.js';
import { useParams } from 'react-router-dom';
import cn from './Keys.module.css';
import { Items } from './Items/Items.jsx';

const separateKeys = (keys) => {
  const fullAccess = keys?.filter((key) => key.accessKey.permission === 'FullAccess');
  const functionCall = keys?.filter((key) => key.accessKey.permission !== 'FullAccess');
  return { fullAccess, functionCall };
};

export const Keys = () => {
  const { accountId } = useParams();
  const keys = useStoreState((store) => store.accounts.records[accountId].keys);
  const { fullAccess, functionCall } = separateKeys(keys);

  if (!keys) return <h4>Keys not exists</h4>;

  return (
    <div className={cn.keys}>
      <Items keys={fullAccess} type="fullAccess" name="Full Access" />
      <Items keys={functionCall} type="functionCall" name="Function Call" />
    </div>
  );
};
