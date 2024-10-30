import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useForm } from 'react-hook-form';
import { KEY_DERIVATION_PATH } from 'near-seed-phrase';
import { Textarea } from '../../../../../../_general/Textarea/Textarea.jsx';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { CloseCircleOutline } from '../../../../../../_general/icons/CloseCircleOutline.jsx';
import { Input } from '../../../../../../_general/Input/Input.jsx';
import { createSchema } from './schema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from './SeedPhrase.module.scss';

export const SeedPhrase = ({ closeModal }) => {
  const { spaceId, networkId } = useParams();
  const importFromSeedPhrase = useStoreEffect(
    (store) => store.nearProtocol.keys.importFromSeedPhrase,
  );
  const schema = createSchema(spaceId, networkId);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      publicKey: '',
      seedPhrase: '',
      derivationPath: KEY_DERIVATION_PATH,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = (formValues) => {
    importFromSeedPhrase({ formValues, spaceId, networkId, reset, closeModal });
  };

  return (
    <form className={cn.seedPhrase} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn.container}>
        <h1 className={cn.title}>Import from Seed phrase</h1>
        <Button size="small" IconLeft={CloseCircleOutline} onClick={closeModal} />
      </div>
      <div className={cn.wrapper}>
        <p className={cn.subtitle}>
          Enter the 12-words seed phrase without extra spaces or symbols.
        </p>
        <Textarea
          control={control}
          rows={2}
          name="seedPhrase"
          error={errors?.seedPhrase?.message}
          placeholder="word word word word word word word word word word word word "
        />
      </div>
      <Input
        control={control}
        label="Derivation path"
        rows={1}
        copy={false}
        name="derivationPath"
        placeholder="m/44'/397'/0"
      />
      <div className={cn.buttonWrapper}>
        <Button size="medium" type="submit">
          Import
        </Button>
      </div>
    </form>
  );
};
