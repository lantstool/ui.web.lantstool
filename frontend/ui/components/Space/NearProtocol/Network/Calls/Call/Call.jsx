import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { getMethod } from './methods/getMethod.js';
import { Result } from './Result/Result.jsx';
import cn from './Call.module.scss';

export const Call = () => {
  const { callId } = useParams();
  const callResult = useStoreState((store) => store.nearProtocol.calls.results[callId]);
  const onMountCall = useStoreEffect((store) => store.nearProtocol.calls.onMountCall);
  const callDraft = useStoreState((store) => store.nearProtocol.calls.drafts[callId]);

  useSaveToHistory();
  useLoader(onMountCall, callId, [callId]);

  if (!callDraft) return null;

  const Method = getMethod(callDraft.currentMethod);

  return (
    <div className={cn.call}>
      {callResult?.isOpen ? (
        <Result callResult={callResult} />
      ) : (
        <Method call={callDraft.origin} draft={callDraft[callDraft.currentMethod]} />
      )}
    </div>
  );
};
