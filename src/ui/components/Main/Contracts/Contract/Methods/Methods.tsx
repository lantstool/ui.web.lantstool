import { useForm } from 'react-hook-form';
import { useState } from 'react';
import cn from './Methods.module.css';
import { Button } from '../../../general/Button/Button.tsx';
import { Method } from './Method/Method.tsx';
import saveIcon from '../../../../../assets/saveIcon.svg';
import { useStoreEffect } from '../../../../../../react-vault';

const getDefaultValue = (contract: any) => {
  return {
    change: contract.methods.change,
    view: contract.methods.view,
  };
};

const selector = (change: any, view: any, edit: any) => {
  if (change.length === 0 && view.length === 0 && !edit) {
    return 'empty';
  }
  if ((change.length > 0 || view.length > 0) && !edit) {
    return 'edit';
  }
};

export const Methods = ({ contract, contractId }) => {
  const addMethod = useStoreEffect((store: any) => store.contracts.addMethod);
  const [edit, setEdit] = useState(false);

  const { view, change } = contract.methods;
  const defaultValues = getDefaultValue(contract);
  const form = useForm({ defaultValues });

  const content = selector(change, view, edit);

  const openEdit = () => setEdit(true);
  const closeEdit = () => setEdit(false);

  const onSubmit = (formValues: any) => addMethod({ formValues, contractId, setEdit });

  return (
    <form className={cn.methods} onSubmit={form.handleSubmit(onSubmit)}>
      {content === 'empty' && (
        <div className={cn.addWrapper}>
          <h4>This contract doesn’t have any methods. Please add one to start using it</h4>
          <Button text="Add Methods" style="secondary" onClick={openEdit} />
        </div>
      )}

      <Method type="change" edit={edit} text="Change" form={form} />
      <Method type="view" edit={edit} text="View" form={form} />

      {content === 'edit' && (
        <div className={cn.editWrapper}>
          <Button src={saveIcon} text="Edit Methods" style="secondary" onClick={openEdit} />
        </div>
      )}

      {edit && (
        <div className={cn.btnWrapper}>
          <Button src={saveIcon} text="Cansel" style="secondary" onClick={closeEdit} />
          <Button src={saveIcon} text="Save" style="secondary" type="submit" />
        </div>
      )}
    </form>
  );
};
