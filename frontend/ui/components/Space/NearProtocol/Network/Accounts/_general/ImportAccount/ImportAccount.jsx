import { useParams } from 'react-router-dom';
import { BaseModal } from '../../../../../../_general/modals/BaseModal/BaseModal.jsx';
import { useForm } from 'react-hook-form';
import { Input } from '../../../../../../_general/Input/Input.jsx';
import { useStoreEffect, useStoreState } from '@react-vault';
import { ModalFooter } from '../../../../../../_general/modals/ModalFooter/ModalFooter.jsx';
import { ModalHeader } from '../../../../../../_general/modals/ModalHeader/ModalHeader.jsx';
import { createSchema } from './schema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from './ImportAccount.module.scss';

export const ImportAccount = ({ setOpen }) => {
  const { spaceId, networkId } = useParams();
  const records = useStoreState((store) => store.nearProtocol.accounts.records);
  const create = useStoreEffect((store) => store.nearProtocol.accounts.create);
  const schema = createSchema(records);

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

  const closeModal = () => {
    clearErrors();
    setOpen(false);
  };

  const onSubmit = handleSubmit((formValues) => {
    create({ formValues, resetField, spaceId, networkId });
    closeModal();
  });

  return (
    <BaseModal close={closeModal} classes={{ modal: cn.modal }}>
      <ModalHeader title="Import account" close={closeModal} />
      <div className={cn.inputs}>
        <Input
          control={control}
          name="accountId"
          error={errors?.accountId?.message}
          placeholder="name.near"
          label="Enter an Account ID. You can also add accounts that are not yet on-chain."
        />
        <Input
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
