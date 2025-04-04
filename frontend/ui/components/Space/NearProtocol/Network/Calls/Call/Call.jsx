import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { Result } from './Result/Result.jsx';
import { methods } from './methods/methods.js';
import cn from './Call.module.scss';

export const Call = () => {
  const { callId } = useParams();
  const callResult = useStoreState((store) => store.nearProtocol.calls.results[callId], [callId]);
  const onMountCall = useStoreEffect((store) => store.nearProtocol.calls.onMountCall);
  const callDraft = useStoreState((store) => store.nearProtocol.calls.drafts[callId], [callId]);

  useSaveToHistory();
  useLoader(onMountCall, callId, [callId]);

  if (!callDraft) return null;

  const Method = methods[callDraft.currentMethod].component;

  return (
    <div className={cn.call}>
      {callResult?.isOpen ? (
        <Result callResult={callResult} call={callDraft.origin} />
      ) : (
        <Method call={callDraft.origin} draft={callDraft[callDraft.currentMethod]} />
      )}
    </div>
  );
};
