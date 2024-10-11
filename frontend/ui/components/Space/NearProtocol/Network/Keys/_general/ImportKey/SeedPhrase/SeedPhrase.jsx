import { useParams } from 'react-router-dom';
import { ModalGroup } from '../../../../../../../_general/ModalGroup/ModalGroup.jsx';
import { InputGroup } from '../../../../../../../_general/InputGroup/InputGroup.jsx';
import { Button } from '../../../../_general/Button/Button.jsx';
import { useForm, useWatch } from 'react-hook-form';
import cn from './SeedPhrase.module.scss';
import addIcon from '../../../../../../../../assets/addIcon.svg';
import { KEY_DERIVATION_PATH } from 'near-seed-phrase';
import { useStoreEffect } from '../../../../../../../../../../react-vault/index.js';
// import { yupResolver } from '@hookform/resolvers/yup';
import { TextareaGroup } from '../../../../../../../_general/TextareaGroup/TextareaGroup.jsx';
import { MessageGroup } from '../_general/MessageGroup/MessageGroup.jsx';

export const SeedPhrase = ({ isOpen, close, setStep }) => {
  const { spaceId, networkId } = useParams();
  const importFromSeedPhrase = useStoreEffect(
    (store) => store.nearProtocol.keys.importFromSeedPhrase,
  );
  // TODO: send validation request to the backend instead of fetching all data locally
  // const schema = useMemo(() => createSchema(records), [records]);

  const form = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      publicKey: null,
      seedPhrase: null,
      derivationPath: KEY_DERIVATION_PATH,
    },
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = form;

  const publicKey = useWatch({ control, name: 'publicKey' });

  const prevStep = () => {
    setStep('selectImport');
  };

  const onSubmit = (formValues) => {
    importFromSeedPhrase({ formValues, spaceId, networkId, reset });
  };

  return (
    <ModalGroup
      isOpen={isOpen}
      closeModal={close}
      text="Import from Seed Phrase"
      prevStep={prevStep}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn.container}>
          <p className={cn.title}>
            Make sure you type the correct 12 words without extra spaces or symbols.
          </p>
          <div className={cn.seedWrapper}>
            <TextareaGroup
              register={register}
              name="seedPhrase"
              rows={4}
              errors={errors?.seedPhrase?.message}
              label="Seed phrase"
            />
          </div>
          <div className={cn.derivationWrapper}>
            <InputGroup register={register} name="derivationPath" label="Derivation Path" />
          </div>
          <MessageGroup
            error={errors?.seedPhrase}
            publicKey={publicKey}
            dirtyFields={dirtyFields.seedPhrase}
          />
          <div className={cn.buttonWrapper}>
            <Button type="submit" text="Import" src={addIcon} />
          </div>
        </div>
      </form>
    </ModalGroup>
  );
};
