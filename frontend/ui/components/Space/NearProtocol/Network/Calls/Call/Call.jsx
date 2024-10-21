import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { Result } from './Result/Result.jsx';
import { Form } from './Form/Form.jsx';
import cn from './Call.module.scss';

export const Call = () => {
  const { callId } = useParams();
  const call = useStoreState((store) => store.nearProtocol.calls.call);
  const result = useStoreState((store) => store.nearProtocol.calls.results[callId]);
  const getOne = useStoreEffect((store) => store.nearProtocol.calls.getOne);

  useLoader(getOne, callId, [callId]);
  useSaveToHistory();
  // We use it instead of 'isLoading' to avoid a screen blinking
  if (!call) return null;

  return (
    <div className={cn.call}>
      {result?.isOpen ? <Result result={result} /> : <Form call={call} />}
    </div>
  );
};
