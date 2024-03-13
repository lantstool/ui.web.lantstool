import { Method } from './Method/Method.tsx';
import cn from './Form.module.css';
import { Button } from '../../../../general/Button/Button.tsx';
import saveIcon from '../../../../../../assets/saveIcon.svg';
import closeBtnGreen from '../../../../../../assets/closeIconGreen.svg';
import { useStoreEffect } from '../../../../../../../react-vault';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema.ts';

const getDefaultValue = (contract: any) => ({
  change: contract.methods.change,
  view: contract.methods.view,
});

export const Form = ({
  edit,
  isEmptyEditMode,
  isEditMode,
  setEdit,
  contractId,
  contract,
  openEdit,
}: any) => {
  const addMethod = useStoreEffect((store: any) => store.contracts.addMethod);

  const formDefaultValues: any = useMemo(() => getDefaultValue(contract), [contract]);

  const form = useForm({
    defaultValues: formDefaultValues,
    mode: 'all',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    form.reset(formDefaultValues);
  }, [contract]);

  const closeEdit = () => setEdit(false);

  const onSubmit = (formValues: any) => addMethod({ formValues, contractId, setEdit });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Method type="change" edit={edit} text="Change" form={form} />
      <Method type="view" edit={edit} text="View" form={form} />

      {isEmptyEditMode && (
        <div className={cn.editWrapper}>
          <Button src={saveIcon} text="Edit Methods" style="secondary" onClick={openEdit} />
        </div>
      )}

      {isEditMode && (
        <div className={cn.btnWrapper}>
          <Button src={closeBtnGreen} text="Cancel" style="outlined" onClick={closeEdit} />
          <Button src={saveIcon} text="Save" style="secondary" type="submit" />
        </div>
      )}
    </form>
  );
};
