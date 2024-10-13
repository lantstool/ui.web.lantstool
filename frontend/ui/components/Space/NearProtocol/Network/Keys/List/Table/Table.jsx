import { useStoreState } from '../../../../../../../../../react-vault/index.js';
import { Item } from './Item/Item.jsx';
import cn from './Table.module.scss';

export const Table = ({ ids }) => {
  const records = useStoreState((store) => store.nearProtocol.keys.records);

  return (
    <div className={cn.table}>
      <div className={cn.head}>
        <p className={cn.subtitle}>Access Key</p>
      </div>
      {ids.map((publicKey) => (
        <Item key={publicKey} keyData={records[publicKey]} />
      ))}
    </div>
  );
};
