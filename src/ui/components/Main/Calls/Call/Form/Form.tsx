import { useForm } from 'react-hook-form';
import { useStoreState, useStoreAction } from '../../../../../../react-vault';
import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { useMemo, useEffect } from 'react';
import { ContractId } from './ContractId/ContractId.tsx';
import { Method } from './Method/Method.tsx';
import cn from './Form.module.css';
import { Footer } from './Footer/Footer.tsx';
import { Result } from './Result/Result.tsx';

const getFormValues = (call: any) => ({
  callId: call.callId,
  contractId: call.contractId,
  method: call.method,
  arguments: call.arguments,
  signer: call.signer,
});

export const Form = ({ call }: any) => {
  const temporaryFormValues: any = useStoreState(
    (store: any) => store.calls.temporaryFormValues[call.callId],
  );
  const putTemporaryFormValues = useStoreAction((store: any) => store.calls.putTemporaryFormValues);
  const formDefaultValues: any = useMemo(() => getFormValues(call), [call.callId]);
  const form = useForm({ defaultValues: formDefaultValues });

  // We save the current form data to store cuz we want to render all changes which ones
  // he did before navigate to another page again when user returns back to this call page
  useEffect(() => {
    if (temporaryFormValues) form.reset(temporaryFormValues, { keepDefaultValues: true });
    return () => {
      // TODO try to optimise and don't call it if the form haven't changed
      putTemporaryFormValues({
        values: form.getValues(),
        callId: call.callId,
      });
    };
  }, []);

  return (
    <div className={cn.container}>
      <div className={cn.formScrollWrapper}>
        <form className={cn.form}>
          <div>
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
          </div>
        </form>
        {call.result && <Result result={call.result} />}
      </div>

      <Footer form={form} />
    </div>
  );
};
