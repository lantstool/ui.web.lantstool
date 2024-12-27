import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useForm } from 'react-hook-form';
import { KEY_DERIVATION_PATH } from 'near-seed-phrase';
import { ModalFooter } from '../../../../../../_general/modals/ModalFooter/ModalFooter.jsx';
import { ModalHeader } from '../../../../../../_general/modals/ModalHeader/ModalHeader.jsx';
import { Textarea } from '../../../../../../_general/Textarea/Textarea.jsx';
import { Input } from '../../../../../../_general/input/Input/Input.jsx';
import { createSchema } from './schema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Tooltip } from '../../../../../../_general/Tooltip/Tooltip.jsx';
import cn from './SeedPhrase.module.scss';

export const SeedPhrase = ({ seedPhraseSchema = null, closeModal, setKey }) => {
  const { spaceId, networkId } = useParams();
  const importFromSeedPhrase = useStoreEffect(
    (store) => store.nearProtocol.keys.importFromSeedPhrase,
  );
  const schema = seedPhraseSchema ? seedPhraseSchema : createSchema(spaceId, networkId);

  const form = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      seedPhrase: '',
      derivationPath: KEY_DERIVATION_PATH,
    },
  });

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors },
  } = form;

  const derivationPath = watch('derivationPath');

  useEffect(() => {
    if (errors?.derivationPath) {
      clearErrors('seedPhrase');
    }
  }, [derivationPath]);

  const onSubmit = handleSubmit((formValues) => {
    importFromSeedPhrase({ formValues, spaceId, networkId, closeModal, setKey });
  });

  return (
    <div className={cn.seedPhraseContainer}>
      <div className={cn.topWrapper}>
        <ModalHeader title="Import from Seed phrase" close={closeModal} />
        <p className={cn.description}>
          Enter the 12-words seed phrase without extra spaces or symbols.
        </p>
        <Textarea
          control={control}
          rows={2}
          name="seedPhrase"
          error={errors?.seedPhrase?.message}
          placeholder="word word word word word word word word word word word word "
        />
        <div className={cn.textareaWrapper}>
          <Input
            control={control}
            label="Derivation path"
            rows={1}
            copy={false}
            name="derivationPath"
            placeholder="m/44'/397'/0"
            error={errors?.derivationPath?.message}
            tooltip={
              <Tooltip
                content="A deterministic way to derive foreign addresses from one NEAR account."
                placement="top"
                defaultContent
              />
            }
          />
        </div>
      </div>
      <ModalFooter
        action={{
          label: 'Import',
          onClick: onSubmit,
        }}
      />
    </div>
  );
};
