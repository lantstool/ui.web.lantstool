import { useParams } from 'react-router-dom';
import { BaseModal } from '@gc/modals/BaseModal/BaseModal.jsx';
import { useForm } from 'react-hook-form';
import { FormInput } from '@gc/input/FormInput/FormInput.jsx';
import { useStoreEffect } from '@react-vault';
import { ModalFooter } from '@gc/modals/ModalFooter/ModalFooter.jsx';
import { ModalHeader } from '@gc/modals/ModalHeader/ModalHeader.jsx';
import { createSchema } from './schema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from './ImportAccount.module.scss';

export const ImportAccount = ({ closeModal, setAccount = () => ({}) }) => {
  const { spaceId, networkId } = useParams();
  const create = useStoreEffect((store) => store.nearProtocol.accounts.create);
  const schema = createSchema(spaceId, networkId);

  const form = useForm({
    defaultValues: { accountId: '', note: '' },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const {
    control,
    handleSubmit,
    resetField,
    clearErrors,
    formState: { errors, isValid },
  } = form;

  const close = () => {
    clearErrors();
    closeModal();
  };

  const onSubmit = handleSubmit((formValues) => {
    create({ formValues, resetField, spaceId, networkId });
    setAccount(formValues.accountId);
    closeModal();
  });

  return (
    <BaseModal close={close} classes={{ modal: cn.modal }}>
      <ModalHeader title="Import account" close={close} />
      <div className={cn.inputs}>
        <FormInput
          control={control}
          name="accountId"
          error={errors?.accountId?.message}
          placeholder="name.near"
          label="Enter an Account ID. You can also add accounts that are not yet on-chain."
        />
        <FormInput
          control={control}
          name="note"
          error={errors?.note?.message}
          placeholder="Work account"
          label="Leave a short note about this account (optionally)."
        />
      </div>
      <ModalFooter
        action={{
          label: 'Import',
          onClick: onSubmit,
          disabled: !isValid,
        }}
      />
    </BaseModal>
  );
};
