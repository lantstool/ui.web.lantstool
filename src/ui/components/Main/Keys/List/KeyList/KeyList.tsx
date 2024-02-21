import cn from './KeyList.module.css';
import { Item } from './Item/Item.tsx';
import { useStoreState } from '../../../../../../react-vault';

export const KeyList = () => {
  const ids: any = useStoreState((store: any) => store.keys.ids);
  const records: any = useStoreState((store: any) => store.keys.records);

  return (
    <div className={cn.list}>
      <div className={cn.head}>
        <p className={cn.subtitle}>Access Key</p>
        <p className={cn.subtitle}>Wallet</p>
      </div>
      {ids.map((key: any) => (
        <Item key={records[key].privateKey} data={records[key]} />
      ))}
    </div>
  );
};
