import cn from './Footer.module.css';
import { useStoreEffect } from '../../../../../../../react-vault/index.ts';
import { Button } from '../../../../general/Button/Button.jsx';
import sendTransaction from '../../../../../../assets/sendTransaction.svg';
import { useFormState } from 'react-hook-form';
import { RestorIcon } from '../../../../../../assets/components/RestorIcon.jsx';
import { SaveIcon } from '../../../../../../assets/components/SaveIcon.jsx';

export const Footer = ({ form }) => {
  const callMethod = useStoreEffect((store) => store.calls.callMethod);
  const saveCall = useStoreEffect((store) => store.calls.saveCall);
  const revertCall = useStoreEffect((store) => store.calls.revertCall);
  const { isDirty } = useFormState({ control: form.control });

  const save = () => saveCall(form);
  const revert = () => revertCall(form);

  const submit = form.handleSubmit((formValues) => {
    callMethod(formValues);
  });

  return (
    <div className={cn.footer}>
      <div className={cn.sendTransaction}>
        <Button text="Call Method" onClick={submit} src={sendTransaction} />
      </div>
      {isDirty && (
        <div className={cn.actions}>
          <button className={cn.saveButton} type="button" onClick={revert}>
            <RestorIcon style={cn.icon} />
          </button>
          <button className={cn.saveButton} type="button" onClick={save}>
            <SaveIcon style={cn.icon} />
          </button>
        </div>
      )}
    </div>
  );
};
