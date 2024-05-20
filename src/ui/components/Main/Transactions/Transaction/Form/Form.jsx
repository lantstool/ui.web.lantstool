import { Actions } from './Actions/Actions.jsx';
import { Receiver } from './Receiver/Receiver.jsx';
import { useForm } from 'react-hook-form';
import { useStoreAction, useStoreState } from '../../../../../../react-vault';
import { SignerAccount } from './SignerAccount/SignerAccount.jsx';
import { SignerKey } from './SignerKey/SignerKey.jsx';
import { useMemo, useEffect } from 'react';
import cn from './Form.module.css';
import { Footer } from './Footer/Footer.jsx';
import cnm from 'classnames';

const getFormDefaultValues = (transaction) => {
  return {
    transactionId: transaction.transactionId,
    signerId: transaction.signerId,
    signerKey: transaction.signerKey,
    receiver: transaction.receiver,
    actions: transaction.actions,
    results: transaction.results,
  };
};

export const Form = ({ transaction }) => {
  const setOpenResult = useStoreAction((store) => store.transactions.setOpenResult);
  const formDefaultValues = useMemo(() => getFormDefaultValues(transaction), [transaction]);
  const temporaryFormValues = useStoreState(
    (store) => store.transactions.temporaryFormValues[transaction.transactionId],
  );
  const putTemporaryFormValues = useStoreAction(
    (store) => store.transactions.putTemporaryFormValues,
  );

  const isResults = transaction.results?.records.length > 0;
  const form = useForm({ defaultValues: formDefaultValues });

  useEffect(() => {
    form.reset(formDefaultValues);
    if (temporaryFormValues)
      form.reset(
        { ...temporaryFormValues, results: transaction.results },
        { keepDefaultValues: true },
      );
    return () => {
      putTemporaryFormValues({
        values: form.getValues(),
        transactionId: transaction.transactionId,
      });
    };
  }, [transaction]);

  const toResult = () => {
    setOpenResult({ transactionId: transaction.transactionId, isOpen: true });
  };

  return (
    <>
      <div className={cn.formScrollWrapper}>
        <div className={cnm(cn.topNav, isResults && cn.topNavActive)}>
          {isResults && (
            <button className={cn.resultBtn} onClick={toResult}>
              Result
            </button>
          )}
        </div>
        <form className={cnm(cn.form, isResults && cn.formWithoutNav)}>
          <h3 className={cn.title}>Sender</h3>
          <SignerAccount form={form} />
          <SignerKey form={form} />
          <Actions form={form} />
          <Receiver form={form} />
        </form>
      </div>
      <Footer form={form} />
    </>
  );
};
