import { useForm } from 'react-hook-form';
import { useStoreEffect, useStoreState } from '../../../../../../react-vault';
import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { SignerAccount } from './SignerAccount/SignerAccount.tsx';
import { SignerKey } from './SignerKey/SignerKey.tsx';
import { useMemo, useEffect } from 'react';
import { Button } from '../../../general/Button/Button.tsx';
import { Contract } from './Contract/Contract.tsx';
import { Method } from './Method/Method.tsx';
import sendTransaction from '../../../../../../assets/sendTransaction.svg';
import saveIcon from '../../../../../../assets/saveIcon.svg';
import cn from './Body.module.css';
import { useParams, Link } from 'react-router-dom';

const getFormDefaultValues = (call: any) => {
  return {
    callId: call.callId,
    contractId: call.contractId,
    method: call.method,
    arguments: call.arguments,
    signer: call.signer,
  };
};

export const Body = () => {
  const { callId } = useParams();
  const call = useStoreState((store: any) => store.calls.map[callId]);
  const callMethod = useStoreEffect((store: any) => store.calls.callMethod);
  const saveCall = useStoreEffect((store: any) => store.calls.saveCall);

  const formDefaultValues: any = useMemo(() => getFormDefaultValues(call), [call]);
  const form = useForm({ defaultValues: formDefaultValues });

  useEffect(() => {
    form.reset(formDefaultValues);
  }, [call]);

  const save = () => {
    const newCall = form.getValues();
    saveCall(newCall);
  };

  const onSubmit = form.handleSubmit((values: any) => {
    console.log(values);
    callMethod(values);
  });

  return (
    <>
      <div className={cn.formScrollWrapper}>
        <form className={cn.form}>
          <div>
            <h3 className={cn.title}>Contract</h3>
            <Contract form={form} />
            <Method form={form} call={call} />
            <InputGroup
              register={form.register}
              name="arguments"
              label="Arguments"
              textarea
              rows={10}
            />
          </div>
        </form>
      </div>
      <div className={cn.bottomBar}>
        <div className={cn.sendTransaction}>
          <Button text="Call Method" onClick={onSubmit} src={sendTransaction} />
        </div>
        <button className={cn.saveButton} type="button" onClick={save}>
          <img src={saveIcon} alt="Save the call" />
        </button>
      </div>
    </>
  );
};

/*
import { InputGroup } from '../../../../../../../../general/InputGroup/InputGroup.tsx';

export const FunctionCall = ({ form, getName }: any) => {
  const { register } = form;

  return (
    <>
      <InputGroup register={register} name={getName('methodName')} label="Method Name" />
      <InputGroup
        register={register}
        name={getName('arguments')}
        label="Arguments"
        textarea
        rows={10}
      />
      <InputGroup register={register} name={getName('gas')} label="Gas (Tgas)" />
      <InputGroup register={register} name={getName('deposit')} label="Deposit (NEAR)" />
    </>
  );
};
 */
