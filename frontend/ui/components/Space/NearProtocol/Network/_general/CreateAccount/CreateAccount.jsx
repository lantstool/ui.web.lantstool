import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { BaseModal } from '@gc/modals/BaseModal/BaseModal.jsx';
import { ModalFooter } from '@gc/modals/ModalFooter/ModalFooter.jsx';
import { ModalHeader } from '@gc/modals/ModalHeader/ModalHeader.jsx';
import { FormInputActionGroup } from '@gc/input/FormInputActionGroup/FormInputActionGroup.jsx';
import { createSchema } from './schema.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import cn from './CreateAccount.module.scss';

export const CreateAccount = ({ closeModal, onCreated }) => {
  const { spaceId, networkId } = useParams();
  const createTestnetAccount = useStoreEffect(
    (store) => store.nearProtocol.accounts.createTestnetAccount,
  );
  const [defaultPrefix] = useState(() => Math.random().toString(36).slice(2, 12));
  const masterAccountId = import.meta.env.VITE_MASTER_ACCOUNT_ID;

  const schema = createSchema(spaceId, networkId);
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      subAccountId: defaultPrefix,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async ({ subAccountId }) => {
    await createTestnetAccount({
      accountId: `${subAccountId}.${masterAccountId}`,
      spaceId,
      networkId,
      closeModal,
      onCreated,
    });
  });

  return (
    <BaseModal close={closeModal} classes={{ modal: cn.modal }}>
      <ModalHeader title="Create a new .lantstool.testnet account" close={closeModal} />
      <div className={cn.body}>
        <FormInputActionGroup
          control={control}
          name="subAccountId"
          inputGroup="text"
          singleValue={`.${masterAccountId}`}
          label="Account Id"
          placeholder="newaccount"
        />
        <p className={cn.subtitle}>
          The private key for this account will be saved in the{' '}
          <Link to={`/space/${spaceId}/near-protocol/testnet/keys`} className={cn.link}>
            Keys
          </Link>{' '}
          section.
        </p>
      </div>
      <ModalFooter
        close={closeModal}
        action={{
          label: isSubmitting ? <span className={cn.spinner} /> : 'Create',
          onClick: onSubmit,
          disabled: !isValid || isSubmitting,
          buttonClass: cn.submitButton,
        }}
      />
    </BaseModal>
  );
};
