import { useForm } from 'react-hook-form';
import { useStoreAction, useStoreState } from '@react-vault';
import { SignerId } from './SignerId/SignerId.jsx';
import { SignerKey } from './SignerKey/SignerKey.jsx';
import { Actions } from './Actions/Actions.jsx';
import { ReceiverId } from './ReceiverId/ReceiverId.jsx';
import { useEffect } from 'react';
import { AccountCircleOutline } from '../../../../../../_general/icons/AccountCircleOutline.jsx';
import cn from './Form.module.scss';
import { Topbar } from './Topbar/Topbar.jsx';

export const Form = ({ transaction }) => {
  const { transactionId, body } = transaction;
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


  return (
    <>
      <Topbar transaction={transaction} form={form} />
      <div className={cn.formScrollWrapper}>
        <form className={cn.form}>
          <div className={cn.details}>
            <AccountCircleOutline style={cn.icon} />
            <h3 className={cn.title}>Signer details</h3>
          </div>
          <SignerId form={form} />
          <SignerKey form={form} />
          <Actions form={form} />
          <ReceiverId form={form} />
        </form>
      </div>
    </>
  );
};
