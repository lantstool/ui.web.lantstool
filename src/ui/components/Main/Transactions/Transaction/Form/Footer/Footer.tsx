import cn from './Footer.module.css';
import { Button } from '../../../../general/Button/Button.tsx';
import sendTx from '../../../../../../assets/sendTransaction.svg';
import { RestorIcon } from '../../../../../../assets/components/RestorIcon.tsx';
import { SaveIcon } from '../../../../../../assets/components/SaveIcon.tsx';
import { useStoreEffect } from '../../../../../../../react-vault';
import { useFormState } from 'react-hook-form';

export const Footer = ({ form, setResult, setOpen }) => {
  const sendTransaction = useStoreEffect((store: any) => store.transactions.onSendTransaction);
  const saveTransaction = useStoreEffect((store: any) => store.transactions.onSaveTransaction);
  const revertTransaction = useStoreEffect((store: any) => store.transactions.revertTransaction);
  const { isDirty } = useFormState({ control: form.control });

  const onSubmit = form.handleSubmit((formValues: any) => {
    setOpen(true);
    sendTransaction({ formValues, setResult });
  });

  const revert = () => revertTransaction(form);

  const save = () => {
    const data = form.getValues();
    saveTransaction(data);
  };

  return (
    <div className={cn.bottomBar}>
      <div className={cn.sendTransaction}>
        <Button text="Sent Transaction" onClick={onSubmit} src={sendTx} />
      </div>
      {isDirty && (
        <div className={cn.buttonWrapper}>
          <button className={cn.button} type="button" onClick={revert}>
            <RestorIcon style={cn.icon} />
          </button>
          <button className={cn.button} type="button" onClick={save}>
            <SaveIcon style={cn.icon} />
          </button>
        </div>
      )}
    </div>
  );
};
