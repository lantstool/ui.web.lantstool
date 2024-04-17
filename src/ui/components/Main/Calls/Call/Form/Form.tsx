import { useForm } from 'react-hook-form';
import { useStoreState, useStoreAction } from '../../../../../../react-vault';
import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { useMemo, useEffect } from 'react';
import { ContractId } from './ContractId/ContractId.tsx';
import { Method } from './Method/Method.tsx';
import cn from './Form.module.css';
import { Footer } from './Footer/Footer.tsx';
import cnm from 'classnames';
import { createSchema } from './schema.ts';
import { yupResolver } from '@hookform/resolvers/yup';

const getFormValues = (call: any) => ({
  callId: call.callId,
  contractId: call.contractId,
  type: call.type,
  method: call.method,
  arguments: call.arguments,
  params: {
    finality: '',
    accountId: 'dev-1588039999690',
    methodName: 'get_num',
    argsBase64: 'e30=',
  },
  results: call.results,
});

export const Form = ({ call }: any) => {
  const setOpenResult: any = useStoreAction((store: any) => store.calls.setOpenResult);
  const temporaryFormValues: any = useStoreState(
    (store: any) => store.calls.temporaryFormValues[call.callId],
  );
  const putTemporaryFormValues = useStoreAction((store: any) => store.calls.putTemporaryFormValues);
  const rpc = useStoreState((store: any) => store.networks.current.url.rpc);
  const formDefaultValues: any = useMemo(() => getFormValues(call), [call.callId]);
  const isResults = call.results?.records.length > 0;

  const schema = createSchema(rpc);
  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: formDefaultValues,
  });

  // We save the current form data to store cuz we want to render all changes which ones
  // he did before navigate to another page again when user returns back to this call page
  useEffect(() => {
    form.reset(formDefaultValues);
    if (temporaryFormValues)
      form.reset({ ...temporaryFormValues, results: call.results }, { keepDefaultValues: true });
    return () => {
      // TODO try to optimise and don't call it if the form haven't changed
      putTemporaryFormValues({
        values: form.getValues(),
        callId: call.callId,
      });
    };
  }, []);

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
          <h3 className={cn.title}>Contract</h3>
          <ContractId form={form} />
          <Method form={form} />
          <InputGroup
            register={form.register}
            name="arguments"
            label="Arguments"
            textarea
            rows={10}
          />
        </form>
      </div>
      <Footer form={form} />
    </div>
  );
};
