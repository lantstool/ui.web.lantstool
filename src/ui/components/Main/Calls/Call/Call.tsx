import { Topbar } from './Topbar/Topbar.tsx';
import cn from './Call.module.css';
import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../react-vault';
import { Form } from './Form/Form.tsx';
import { useEffect } from 'react';

export const Call = () => {
  const { callId } = useParams();
  const call: any = useStoreState((store: any) => store.calls.records[callId]);
  const loadCall = useStoreEffect((store: any) => store.calls.loadCall);

  useEffect(() => {
    loadCall(callId);
  }, [callId]);

  if (!call) return null;

  return (
    <div className={cn.call} key={callId}>
      <Topbar call={call} callId={callId}/>
      <Form call={call} />
    </div>
  );
};
