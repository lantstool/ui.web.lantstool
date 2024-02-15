import cn from './Contract.module.css';
import { useParams } from 'react-router-dom';
import { useStoreState } from '../../../../../react-vault';
// import { Form } from './Form/Form.tsx';
// import { Topbar } from './Topbar/Topbar.tsx';

export const Contract = () => {
  const { contractId } = useParams();
  const contract: any = useStoreState((store: any) => store.contracts.records[contractId]);

  if (!contract) return null;

  return (
    <div className={cn.call} key={contractId}>
      <p>{contract.name}</p>
      <p>{contractId}</p>
      {/*<Topbar call={call} />*/}
      {/*<Form call={call} />*/}
    </div>
  );
};
