import cn from './Contract.module.css';
import { useParams } from 'react-router-dom';
import { useStoreState } from '../../../../../react-vault';
import { Topbar } from './Topbar/Topbar.tsx';
import { Methods } from './Methods/Methods.tsx';

export const Contract = () => {
  const { contractId } = useParams();
  const contract: any = useStoreState((store: any) => store.contracts.records[contractId]);


  return (
    <div className={cn.contract} key={contractId}>
      <Topbar contract={contract} contractId={contractId}/>
      <Methods contract={contract} contractId={contractId} />
    </div>
  );
};
