import { ModalFooter } from '../../../../../../_general/modals/ModalFooter/ModalFooter.jsx';
import { ModalHeader } from '../../../../../../_general/modals/ModalHeader/ModalHeader.jsx';
import { Textarea } from '../../../../../../_general/Textarea/Textarea.jsx';
import { useForm } from 'react-hook-form';
import { useStoreEffect } from '@react-vault';
import { useParams } from 'react-router-dom';
import { createSchema } from './schema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from './PrivateKey.module.scss';

export const PrivateKey = ({ closeModal, setKey }) => {
  const { spaceId, networkId } = useParams();
  const importFromPrivateKey = useStoreEffect(
    (store) => store.nearProtocol.keys.importFromPrivateKey,
  );
  const schema = createSchema(spaceId, networkId);

  const form = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      privateKey: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = handleSubmit((formValues) => {
    importFromPrivateKey({ formValues, spaceId, networkId, closeModal, setKey });
  });

  return (
    <form className={cn.privateKeyContainer}>
      <div className={cn.topWrapper}>
        <ModalHeader title="Import from Private key" close={closeModal} />
        <p className={cn.description}>
          Import your private access key locally for transaction signing. It can be any valid
          ed25519 key, even if it is not currently associated with an account.
        </p>
        <Textarea
          control={control}
          rows={3}
          name="privateKey"
          error={errors?.privateKey?.message}
          placeholder="ed25519:5sAGQFD878c7MRoy9ACfgtTzejubjm76FPxUQpBPqUG26H9XMayZn36244vwkTuxrYFcFBE4YMXNcna1jXC6RxqU"
        />
      </div>
      <ModalFooter
        action={{
          label: 'Import',
          onClick: onSubmit,
          disabled: !isValid,
        }}
      />
    </form>
  );
};
