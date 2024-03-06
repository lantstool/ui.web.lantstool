import cn from './Contract.module.css';
import { useParams } from 'react-router-dom';
import { useStoreState } from '../../../../../../react-vault';
import { NoContract } from './NoContract/NoContract.tsx';
// import { Methods } from './Methods/Methods.tsx';

export const Contract = () => {
  const { accountId } = useParams();
  const account: any = useStoreState((store: any) => store.accounts.records[accountId]);

  if (!account.hasDeployedOnChainContract) return <NoContract />;

  return (
    <div className={cn.contract}>
      Contract methods
      {/*<p>{account.contract.name}</p>*/}
      {/*<Methods account={account} />*/}
    </div>
  );
};
