import { Textarea } from '../../../../../../_general/Textarea/Textarea.jsx';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { CloseCircleOutline } from '../../../../../../_general/icons/CloseCircleOutline.jsx';
import { useForm } from 'react-hook-form';
import { useStoreEffect } from '@react-vault';
import { useParams } from 'react-router-dom';
import { createSchema } from './schema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from './PrivateKey.module.scss';

export const PrivateKey = ({ closeModal }) => {
  const { spaceId, networkId } = useParams();
  const importFromPrivateKey = useStoreEffect(
    (store) => store.nearProtocol.keys.importFromPrivateKey,
  );
  const schema = createSchema(spaceId, networkId);

  const form = useForm({
    mode: 'all',
    // resolver: yupResolver(schema),
    defaultValues: {
      publicKey: '',
      privateKey: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (formValues) => {
    importFromPrivateKey({ formValues, spaceId, networkId, closeModal });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn.privateKey}>
      <div className={cn.container}>
        <h1 className={cn.title}>Import from Private key</h1>
        <Button size="small" IconLeft={CloseCircleOutline} onClick={closeModal} />
      </div>
      <div className={cn.wrapper}>
        <p className={cn.subtitle}>
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
      <div className={cn.buttonWrapper}>
        <Button size="medium" type="submit">
          Import
        </Button>
      </div>
    </form>
  );
};
