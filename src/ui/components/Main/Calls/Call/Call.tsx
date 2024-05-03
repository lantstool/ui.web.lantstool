import { Topbar } from './Topbar/Topbar.tsx';
import cn from './Call.module.css';
import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../react-vault';
import { useLoader } from '../../../../../store/hooks/useLoader.js';
import { Result } from './Result/Result.tsx';
import { Forms } from './Forms/Forms.tsx';

export const Call = () => {
  const { callId } = useParams();
  const call: any = useStoreState((store: any) => store.calls.records[callId]);
  const getOnceAccounts = useStoreEffect((store: any) => store.accounts.getOnceAccounts);
  const [isLoading] = useLoader(getOnceAccounts);

  if (isLoading) return null;
  if (!call) return null;

  return (
    <div className={cn.call} key={callId}>
      <Topbar call={call} callId={callId} />
      {!call.results.isOpen ? <Forms call={call} /> : <Result call={call} />}
    </div>
  );
};
