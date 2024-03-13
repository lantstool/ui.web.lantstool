import cn from './Contract.module.css';
import { useParams } from 'react-router-dom';
import { useStoreState } from '../../../../../../react-vault';
import { NoContract } from './NoContract/NoContract.tsx';
import { Form } from './Form/Form.tsx';
import { Methods } from './Methods/Methods.tsx';

export const Contract = () => {
  const { accountId } = useParams();
  const account: any = useStoreState((store: any) => store.accounts.records[accountId]);
  const contract: any = useStoreState((store: any) => store.contracts.records[account.contractId]);

  if (!account.hasDeployedOnChainContract) return <NoContract />;

  return (
    <div className={cn.contract}>
      <h2 className={cn.title}>Contract methods</h2>
      <Form accountId={accountId} contract={contract} />
      <Methods contract={contract} />
    </div>
  );
};
