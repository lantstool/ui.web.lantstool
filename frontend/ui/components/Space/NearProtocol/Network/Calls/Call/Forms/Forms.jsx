import cnm from 'classnames';
import { useStoreAction, useStoreState } from '@react-vault';
import { useEffect, useMemo } from 'react';
import { MethodSelector } from './MethodSelector/MethodSelector.jsx';
import { Contracts } from './Contracts/Contracts.jsx';
import { useForm, useWatch } from 'react-hook-form';
import { AccessKeysForms } from './AccessKeysForms/AccessKeysForms.jsx';
import { AccountsForms } from './AccountsForms/AccountsForms.jsx';
import { BlockForm } from './BlockForm/BlockForm.jsx';
import { ChunkForms } from './ChunkForms/ChunkForms.jsx';
import { GasForm } from './GasForm/GasForm.jsx';
import { Topbar } from './Topbar/Topbar.jsx';
import { TransactionsForms } from './TransactionsForms/TransactionsForms.jsx';
import { ProtocolForms } from './ProtocolForms/ProtocolForms.jsx';
import { NetworkForms } from './NetworkForms/NetworkForms.jsx';
import cn from './Forms.module.scss';

const getFormDefaultValues = (call) => ({
  callId: call.callId,
  type: call.type,
  params: call.params,
  method: call.method,
  results: call.results,
});

export const Forms = ({ call }) => {
  const { callId, body } = call;
  const draft = useStoreState((store) => store.nearProtocol.calls.drafts[callId]);
  const setDraft = useStoreAction((store) => store.nearProtocol.calls.setDraft);

  const form = useForm({ defaultValues: body });

  const type = useWatch({ control: form.control, name: 'type.value' });

  useEffect(() => {
    form.reset(body);
    if (draft) form.reset(draft, { keepDefaultValues: true });

    return () => {
      setDraft({ callId, draft: form.getValues() });
    };
  }, [callId]);

  // const isResults = call.results?.records.length > 0;
  // const toResult = () => {
  //   setOpenResult({ callId: call.callId, isOpen: true });
  // };

  return (
    <div className={cn.container}>
      <Topbar call={call} form={form} />
      <div className={cn.formScrollWrapper}>
        {/*<div className={cnm(cn.topNav, isResults && cn.topNavActive)}>*/}
        {/*  {isResults && (*/}
        {/*    <button className={cn.resultBtn} onClick={toResult}>*/}
        {/*      Result*/}
        {/*    </button>*/}
        {/*  )}*/}
        {/*</div>*/}
        <form className={cnm(cn.form /*isResults && cn.formWithoutNav*/)}>
          <h3 className={cn.title}>{type}</h3>
          <MethodSelector form={form} />
          {/*<Contracts form={form} type={type} />*/}
          {/*<AccessKeysForms form={form} type={type} />*/}
          {/*<AccountsForms form={form} type={type} />*/}
          {/*<BlockForm form={form} type={type} />*/}
          {/*<ChunkForms form={form} type={type} />*/}
          {/*<GasForm form={form} type={type} />*/}
          {/*<ProtocolForms form={form} type={type} />*/}
          {/*<NetworkForms form={form} type={type} />*/}
          {/*<TransactionsForms form={form} type={type} />*/}
        </form>
      </div>
    </div>
  );
};
