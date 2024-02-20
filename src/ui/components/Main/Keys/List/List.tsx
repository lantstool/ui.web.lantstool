import cn from './List.module.css';
import { Item } from './Item/Item.tsx';
import { useStoreState } from '../../../../../react-vault';

export const List = () => {
  const ids: any = useStoreState((store: any) => store.keys.ids);
  const records: any = useStoreState((store: any) => store.keys.records);

  return (
    <div className={cn.list}>
      <div className={cn.head}>
        <p className={cn.subtitle}>Access Key</p>
        <p className={cn.subtitle}>Wallet</p>
      </div>
      {ids.map((key: any) => (
        <Item key={records[key].importedAt} data={records[key]} />
      ))}
    </div>
  );
};
