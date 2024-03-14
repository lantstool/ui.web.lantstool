import cn from './Footer.module.css';
import { useStoreEffect } from '../../../../../../../react-vault';
import { Button } from '../../../../general/Button/Button.tsx';
import sendTransaction from '../../../../../../assets/sendTransaction.svg';
import restore from '../../../../../../assets/restore_white_24dp.svg';
import saveIcon from '../../../../../../assets/saveIcon.svg';
import { useFormState } from 'react-hook-form';

export const Footer = ({ form }: any) => {
  const callMethod = useStoreEffect((store: any) => store.calls.callMethod);
  const saveCall = useStoreEffect((store: any) => store.calls.saveCall);
  const revertCall = useStoreEffect((store: any) => store.calls.revertCall);
  const { isDirty } = useFormState({ control: form.control });

  const save = () => saveCall(form);
  const revert = () => revertCall(form);

  const submit = form.handleSubmit((values: any) => {
    callMethod(values);
  });

  return (
    <div className={cn.footer}>
      <div className={cn.sendTransaction}>
        <Button text="Call Method" onClick={submit} src={sendTransaction} />
      </div>
      {isDirty && (
        <div className={cn.actions}>
          <button className={cn.saveButton} type="button" onClick={revert}>
            <img src={restore} alt="Revert" />
          </button>
          <button className={cn.saveButton} type="button" onClick={save}>
            <img src={saveIcon} alt="Save the call" />
          </button>
        </div>
      )}
    </div>
  );
};
