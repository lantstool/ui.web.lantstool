import { useForm } from 'react-hook-form';
import { useStoreAction, useStoreState } from '../../../../../../../../../react-vault/index.js';
import { SignerId } from './SignerId/SignerId.jsx';
import { SignerKey } from './SignerKey/SignerKey.jsx';
import { Actions } from './Actions/Actions.jsx';
import { ReceiverId } from './ReceiverId/ReceiverId.jsx';
import { useEffect } from 'react';
import cn from './Form.module.scss';
import { Footer } from './Footer/Footer.jsx';
import cnm from 'classnames';

export const Form = ({ transaction }) => {
  // const setOpenResult = useStoreAction((store) => store.transactions.setOpenResult);
  const temporaryFormValues = useStoreState(
    (store) => store.nearProtocol.transactions.drafts[transaction.transactionId],
  );
  const putTemporaryFormValues = useStoreAction(
    (store) => store.nearProtocol.transactions.putTemporaryFormValues,
  );
  const form = useForm({ defaultValues: transaction.body });

  const isResults = transaction.results?.records.length > 0;


  useEffect(() => {
    form.reset(transaction.body);

    // if (temporaryFormValues) {
    //   form.reset(
    //     { ...temporaryFormValues, results: transaction.results },
    //     { keepDefaultValues: true },
    //   );
    // }
    //
    // return () => {
    //   putTemporaryFormValues({
    //     values: form.getValues(),
    //     transactionId: transaction.transactionId,
    //   });
    // };
  }, [transaction]);

  const toResult = () => {
    // setOpenResult({ transactionId: transaction.transactionId, isOpen: true });
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
          <SignerId form={form} />
          <SignerKey form={form} />
          <Actions form={form} />
          <ReceiverId form={form} />
        </form>
      </div>
      <Footer form={form} />
    </>
  );
};
