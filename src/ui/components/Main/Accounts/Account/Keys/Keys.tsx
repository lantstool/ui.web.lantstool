import { useStoreState } from '../../../../../../react-vault';
import { useParams } from 'react-router-dom';
import cn from './Keys.module.css';
import { Items } from './Items/Items.tsx';

const separateKeys = (keys: any) => {
  const fullAccess = keys?.filter((key: any) => key.accessKey.permission === 'FullAccess');
  const functionCall = keys?.filter((key: any) => key.accessKey.permission !== 'FullAccess');
  return { fullAccess, functionCall };
};

export const Keys = () => {
  const { accountId } = useParams();
  const keys: any = useStoreState((store: any) => store.accounts.records[accountId].keys);
  const { fullAccess, functionCall } = separateKeys(keys);

  if (!keys) return <h4>Keys not exists</h4>;

  return (
    <div className={cn.keys}>
      <Items keys={fullAccess} type="fullAccess" name="Full Access" />
      <Items keys={functionCall} type="functionCall" name="Function Call" />
    </div>
  );
};
