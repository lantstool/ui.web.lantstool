import { Actions } from './Actions/Actions.tsx';
import { Receiver } from './Receiver/Receiver.tsx';
import { useForm } from 'react-hook-form';
import { useStoreAction, useStoreState } from '../../../../../../react-vault';
import { SignerAccount } from './SignerAccount/SignerAccount.tsx';
import { SignerKey } from './SignerKey/SignerKey.tsx';
import { useMemo, useEffect, useState } from 'react';
import cn from './Form.module.css';
import { Result } from './Result/Result.tsx';
import { Footer } from './Footer/Footer.tsx';

const getFormDefaultValues = (transaction: any) => {
  return {
    transactionId: transaction.transactionId,
    signerId: transaction.signerId,
    signerKey: transaction.signerKey,
    receiver: transaction.receiver,
    actions: transaction.actions,
  };
};

export const Form = ({ transaction }: any) => {
  const formDefaultValues: any = useMemo(() => getFormDefaultValues(transaction), [transaction]);
  const temporaryFormValues: any = useStoreState(
    (store: any) => store.transactions.temporaryFormValues[transaction.transactionId],
  );

  const putTemporaryFormValues: any = useStoreAction(
    (store: any) => store.transactions.putTemporaryFormValues,
  );

  const form: any = useForm({ defaultValues: formDefaultValues });
  const [result, setResult] = useState('');
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setResult('')
    setOpen(false)
    form.reset(formDefaultValues);
    if (temporaryFormValues) form.reset(temporaryFormValues, { keepDefaultValues: true });
    return () => {
      putTemporaryFormValues({
        values: form.getValues(),
        transactionId: transaction.transactionId,
      });
    };
  }, [transaction]);


  return (
    <>
      {!result && !isOpen ? (
        <>
          <div className={cn.formScrollWrapper}>
            <form className={cn.form}>
              <div>
                <h3 className={cn.title}>Sender</h3>
                <SignerAccount form={form} />
                <SignerKey form={form} />
              </div>
              <Actions form={form} />
              <Receiver form={form} />
            </form>
          </div>
          <Footer form={form} setResult={setResult} setOpen={setOpen}/>
        </>
      ) : (
        <Result result={result} setResult={setResult} setOpen={setOpen}/>
      )}
    </>
  );
};
