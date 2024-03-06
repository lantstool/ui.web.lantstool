import { useParams } from 'react-router-dom';
import { useStoreState } from '../../../../../react-vault';
import { Item } from './Item/Item.tsx';
import cn from './List.module.css';
import { CreateContract } from '../general/CreateContract/CreateContract.tsx';

export const List = ({ ids }: any) => {
  const records: any = useStoreState((store: any) => store.contracts.records);
  const params = useParams();

  return (
    <div className={cn.container}>
      <h1 className={cn.title}>Contracts</h1>
      <div className={cn.list}>
        {ids.map((contractId: any) => (
          <Item
            key={contractId}
            isActive={contractId === params?.contractId}
            contractId={contractId}
            name={records[contractId].name}
          />
        ))}
      </div>
      <div className={cn.bottom}>
        <CreateContract styles={cn.modalContainer} />
      </div>
    </div>
  );
};
