import { Actions } from './Actions/Actions.tsx';
import { useForm } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../react-vault';
import { SignerAccount } from './SignerAccount/SignerAccount.tsx';
import { SignerKey } from './SignerKey/SignerKey.tsx';
import { useMemo, useEffect } from 'react';
import { Button } from '../../../general/Button/Button.tsx';
import sendTransaction from '../../../../../../assets/sendTransaction.svg';
import saveIcon from '../../../../../../assets/saveIcon.svg';
import cn from './Body.module.css';
import { useParams, Link } from 'react-router-dom';

const getFormDefaultValues = (call: any) => {
  return {
    callId: call.callId,
    contractId: call.contractId,
    method: call.method,
    args: call.args,
    signer: call.signer,
  };
};

export const Body = () => {
  const { currentNetworkId, callId } = useParams();
  // const onSendTransaction = useStoreEffect((store: any) => store.transactions.onSendTransaction);
  // const onSaveTransaction = useStoreEffect((store: any) => store.transactions.onSaveTransaction);
  //
  // const formDefaultValues: any = useMemo(() => getFormDefaultValues(transaction), [transaction]);
  // const form = useForm({ defaultValues: formDefaultValues });
  //
  // const onSubmit = form.handleSubmit((data: any) => {
  //   onSendTransaction(data);
  // });
  //
  // useEffect(() => {
  //   form.reset(formDefaultValues);
  // }, [transaction]);
  //
  // const save = () => {
  //   const data = form.getValues();
  //   onSaveTransaction(data);
  // };

  return (
    <div>
      {callId}
      <Link to="result">Result</Link>
    </div>
  );
  return (
    <>
      <div className={cn.formScrollWrapper}>
        <form className={cn.form}>
          <div>
            <h3 className={cn.title}>Sender</h3>
            <SignerAccount form={form} />
            <SignerKey form={form} />
          </div>
          <Actions form={form} />
        </form>
      </div>
      <div className={cn.bottomBar}>
        <div className={cn.sendTransaction}>
          <Button text="Send" onClick={onSubmit} src={sendTransaction} />
        </div>
        <button className={cn.saveButton} type="button" onClick={save}>
          <img src={saveIcon} alt="Save the call" />
        </button>
      </div>
    </>
  );
};
