import { useForm } from 'react-hook-form';
import { useStoreAction } from '@react-vault';
import { Tooltip } from '../../../../../../_general/Tooltip/Tooltip.jsx';
import { SignerId } from './SignerId/SignerId.jsx';
import { SignerKey } from './SignerKey/SignerKey.jsx';
import { Actions } from './Actions/Actions.jsx';
import { ReceiverId } from './ReceiverId/ReceiverId.jsx';
import { useEffect } from 'react';
import { Topbar } from './Topbar/Topbar.jsx';
import { ActionBar } from './ActionBar/ActionBar.jsx';
import { transactionSchema } from './validations/transactionSchema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from './Form.module.scss';

export const Form = ({ transaction, draft }) => {
  const { transactionId, body } = transaction;
  const setDraft = useStoreAction((store) => store.nearProtocol.transactions.setDraft);

  const form = useForm({
    defaultValues: body,
    mode: 'onSubmit',
    resolver: yupResolver(transactionSchema),
  });

  useEffect(() => {
    form.reset(draft);
    return () => setDraft({ transactionId, draft: form.getValues() });
  }, [transactionId]);

  return (
    <div className={cn.form}>
      <form className={cn.formContainer}>
        <Topbar transaction={transaction} form={form} />
        <div className={cn.label}>
          <span className={cn.icon} />
          <h3 className={cn.title}>Signer</h3>
          <Tooltip
            content={
              <div className={cn.tooltipContent}>
                The account on behalf of which the transaction is created, signed, and executed.
                <br />
                - This account pays for the gas fees;
                <br />
                - For an account to sign a transaction, its private key must be imported into the
                application.
                <br />- An imported <strong>Full Access Key</strong> can sign transactions with any
                actions, whereas a <strong>Function Call Key</strong> is limited to signing a
                Function Call action for a specific contract.
              </div>
            }
            placement="top"
            defaultContent
          />
        </div>
        <SignerId form={form} />
        <SignerKey form={form} />
        <Actions form={form} />
        <ReceiverId form={form} />
        <ActionBar form={form} transaction={transaction} />
      </form>
    </div>
  );
};
