import { useForm } from 'react-hook-form';
import { useStoreAction, useStoreState } from '../../../../../../../../../react-vault/index.js';
import { SignerId } from './SignerId/SignerId.jsx';
import { SignerKey } from './SignerKey/SignerKey.jsx';
import { Actions } from './Actions/Actions.jsx';
import { ReceiverId } from './ReceiverId/ReceiverId.jsx';
import { useEffect } from 'react';
import { Footer } from './Footer/Footer.jsx';
import cnm from 'classnames';
import cn from './Form.module.scss';

export const Form = ({ transaction, isResultExists }) => {
  const { transactionId, body } = transaction;
  const setResult = useStoreAction((store) => store.nearProtocol.transactions.setResult);
  const draft = useStoreState((store) => store.nearProtocol.transactions.drafts[transactionId]);
  const setDraft = useStoreAction((store) => store.nearProtocol.transactions.setDraft);

  const form = useForm({ defaultValues: body });

  useEffect(() => {
    form.reset(body);
    if (draft) form.reset(draft, { keepDefaultValues: true });

    return () => {
      setDraft({ transactionId, draft: form.getValues() });
    };
  }, [transactionId]);

  const openResult = () => setResult({ transactionId, isOpen: true });

  return (
    <>
      <div className={cn.formScrollWrapper}>
        <div className={cnm(cn.topNav, isResultExists && cn.topNavActive)}>
          {isResultExists && (
            <button className={cn.resultBtn} onClick={openResult}>
              Result
            </button>
          )}
        </div>
        <form className={cnm(cn.form, isResultExists && cn.formWithoutNav)}>
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
