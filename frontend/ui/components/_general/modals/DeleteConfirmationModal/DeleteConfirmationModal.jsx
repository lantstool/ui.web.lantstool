import { BaseModal } from '../BaseModal/BaseModal.jsx';
import { Input } from '../../input/Input/Input.jsx';
import { Button } from '../../Button/Button.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSchema } from './schema.js';
import cn from './DeleteConfirmationModal.module.scss';

export const DeleteConfirmationModal = ({
  close,
  submit,
  confirmationValue,
  text: { title, description, inputLabelText, submitButtonText },
  baseModalClasses,
}) => {
  const form = useForm({
    defaultValues: { confirmation: '' },
    resolver: yupResolver(createSchema(confirmationValue)),
    mode: 'onTouched',
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = handleSubmit(submit);

  return (
    <BaseModal close={close} classes={baseModalClasses}>
      <div className={cn.textWrapper}>
        <h2 className={cn.title}>{title}</h2>
        <p className={cn.description}>{description}</p>
      </div>
      <Input
        name="confirmation"
        error={errors?.confirmation?.message}
        control={control}
        label={inputLabelText}
        copy={false}
      />
      <div className={cn.buttonWrapper}>
        <Button color="secondary" size="medium" onClick={close}>
          Cancel
        </Button>
        <Button disabled={!isValid} color="danger" size="medium" onClick={onSubmit}>
          {submitButtonText}
        </Button>
      </div>
    </BaseModal>
  );
};
