import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import cn from './Methods.module.css';
import { Button } from '../../../general/Button/Button.tsx';
import { Method } from './Method/Method.tsx';
import saveIcon from '../../../../../assets/saveIcon.svg';
import closeBtnGreen from '../../../../../assets/closeIconGreen.svg';
import { useStoreEffect } from '../../../../../../react-vault';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.ts';

const getDefaultValue = (contract: any) => {
  return {
    change: contract.methods.change,
    view: contract.methods.view,
  };
};

const selector = (change: any, view: any, edit: any) => {
  return {
    isEditMode: edit,
    isEmptyEditMode: (change.length > 0 || view.length > 0) && !edit,
    isEmpty: change.length === 0 && view.length === 0 && !edit,
  };
};

export const Methods = ({ contract, contractId }) => {
  const addMethod = useStoreEffect((store: any) => store.contracts.addMethod);
  const [edit, setEdit] = useState(false);

  const { view, change } = contract.methods;
  const { isEditMode, isEmpty, isEmptyEditMode } = selector(change, view, edit);
  const formDefaultValues: any = useMemo(() => getDefaultValue(contract), [contract]);

  const form = useForm({
    defaultValues: formDefaultValues,
    mode: 'all',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    form.reset(formDefaultValues);
  }, [contract]);

  const openEdit = () => setEdit(true);
  const closeEdit = () => setEdit(false);

  const onSubmit = (formValues: any) => addMethod({ formValues, contractId, setEdit });

  return (
    <form className={cn.methods} onSubmit={form.handleSubmit(onSubmit)}>
      {isEmpty && (
        <div className={cn.addWrapper}>
          <h4>This contract doesn’t have any methods. Please add one to start using it</h4>
          <Button text="Add Methods" style="secondary" onClick={openEdit} />
        </div>
      )}

      <Method type="change" edit={edit} text="Change" form={form} />
      <Method type="view" edit={edit} text="View" form={form} />

      {isEmptyEditMode && (
        <div className={cn.editWrapper}>
          <Button src={saveIcon} text="Edit Methods" style="secondary" onClick={openEdit} />
        </div>
      )}

      {isEditMode && (
        <div className={cn.btnWrapper}>
          <Button src={closeBtnGreen} text="Cansel" style="outlined" onClick={closeEdit} />
          <Button src={saveIcon} text="Save" style="secondary" type="submit" />
        </div>
      )}
    </form>
  );
};
