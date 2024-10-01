import cn from './KeyList.module.css';
import { Item } from './Item/Item.jsx';
import { useStoreState } from '../../../../../../../../../react-vault/index.js';

export const KeyList = () => {
  const ids = useStoreState((store) => store.keys.ids);
  const records = useStoreState((store) => store.keys.records);

  return (
    <div className={cn.list}>
      <div className={cn.head}>
        <p className={cn.subtitle}>Access Key</p>
        <p className={cn.subtitle}>Wallet</p>
      </div>
      {ids.map((key) => (
        <Item key={records[key].privateKey} data={records[key]} />
      ))}
    </div>
  );
};
