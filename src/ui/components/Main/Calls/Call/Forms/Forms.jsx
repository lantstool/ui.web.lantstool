import cn from './Forms.module.css';
import cnm from 'classnames';
import { Footer } from './Footer/Footer.jsx';
import { useStoreAction } from '../../../../../../react-vault/store/actions/useStoreAction.js';
import { useStoreState } from '../../../../../../react-vault/store/state/useStoreState.js';
import { useEffect, useMemo } from 'react';
import { MethodSelector } from './MethodSelector/MethodSelector.jsx';
import { Contracts } from './Contracts/Contracts.jsx';
import { useForm, useWatch } from 'react-hook-form';
import { AccessKeysForms } from './AccessKeysForms/AccessKeysForms.jsx';
import { AccountsForms } from './AccountsForms/AccountsForms.jsx';
import { BlockForm } from './BlockForm/BlockForm.jsx';
import { ChunkForms } from './ChunkForms/ChunkForms.jsx';
import { GasForm } from './GasForm/GasForm.jsx';
import { TransactionsForms } from './TransactionsForms/TransactionsForms.jsx';
import { ProtocolForms } from './ProtocolForms/ProtocolForms.jsx';
import { NetworkForms } from './NetworkForms/NetworkForms.jsx';

const getFormDefaultValues = (call) => ({
  callId: call.callId,
  type: call.type,
  params: call.params,
  method: call.method,
  results: call.results,
});

export const Forms = ({ call }) => {
  const setOpenResult = useStoreAction((store) => store.calls.setOpenResult);
  const temporaryFormValues = useStoreState(
    (store) => store.calls.temporaryFormValues[call.callId],
  );
  const putTemporaryFormValues = useStoreAction((store) => store.calls.putTemporaryFormValues);
  const formDefaultValues = useMemo(() => getFormDefaultValues(call), [call]);

  const form = useForm({
    mode: 'all',
    defaultValues: formDefaultValues,
  });

  const type = useWatch({ control: form.control, name: 'type.value' });

  useEffect(() => {
    form.reset(formDefaultValues);

    if (temporaryFormValues)
      form.reset({ ...temporaryFormValues, results: call.results }, { keepDefaultValues: true });

    return () => {
      putTemporaryFormValues({
        values: form.getValues(),
        callId: call.callId,
      });
    };
  }, []);

  const isResults = call.results?.records.length > 0;
  const toResult = () => {
    setOpenResult({ callId: call.callId, isOpen: true });
  };

  return (
    <div className={cn.container}>
      <div className={cn.formScrollWrapper}>
        <div className={cnm(cn.topNav, isResults && cn.topNavActive)}>
          {isResults && (
            <button className={cn.resultBtn} onClick={toResult}>
              Result
            </button>
          )}
        </div>
        <form className={cnm(cn.form, isResults && cn.formWithoutNav)}>
          <h3 className={cn.title}>{type}</h3>
          <MethodSelector form={form} />
          <Contracts form={form} type={type} />
          <AccessKeysForms form={form} type={type} />
          <AccountsForms form={form} type={type} />
          <BlockForm form={form} type={type} />
          <ChunkForms form={form} type={type} />
          <GasForm form={form} type={type} />
          <ProtocolForms form={form} type={type} />
          <NetworkForms form={form} type={type} />
          <TransactionsForms form={form} type={type} />
        </form>
      </div>
      <Footer form={form} />
    </div>
  );
};
