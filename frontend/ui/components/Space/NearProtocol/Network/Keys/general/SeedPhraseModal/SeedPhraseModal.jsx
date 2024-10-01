import { ModalGroup } from '../../../../../../_general/ModalGroup/ModalGroup.jsx';
import { InputGroup } from '../../../../../../_general/InputGroup/InputGroup.jsx';
import { Button } from '../../../_general/Button/Button.jsx';
import { useForm, useWatch } from 'react-hook-form';
import cn from './SeedPhraseModal.module.css';
import addIcon from '../../../../../../../assets/addIcon.svg';
import { createSchema } from './schema.js';
import { KEY_DERIVATION_PATH } from 'near-seed-phrase';
import { useStoreEffect, useStoreState } from '../../../../../../../../../react-vault/index.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextareaGroup } from '../../../../../../_general/TextareaGroup/TextareaGroup.jsx';
import { MessageGroup } from '../general/MessageGroup/MessageGroup.jsx';
import { useMemo } from 'react';

export const SeedPhraseModal = ({ isOpen, close, setStep }) => {
  const addKey = useStoreEffect((store) => store.keys.addKey);
  const records = useStoreState((store) => store.keys.records);
  const schema = useMemo(() => createSchema(records), [records]);

  const form = useForm({
    resolver: yupResolver(schema),
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
    setValue,
    resetField,
    formState: { errors, dirtyFields },
  } = form;

  const publicKey = useWatch({ control, name: 'publicKey' });

  const prevStep = () => {
    setStep('selectImport');
  };

  const onSubmit = (formValue) => {
    addKey({ formValue, wallet: 'lantstool', setValue, resetField });
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
