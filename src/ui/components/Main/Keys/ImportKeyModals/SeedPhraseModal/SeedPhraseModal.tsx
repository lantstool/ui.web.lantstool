import { ModalGroup } from '../general/ModalGroup/ModalGroup.tsx';
import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { Button } from '../../../general/Button/Button.tsx';
import { useForm, useWatch } from 'react-hook-form';
import cn from './SeedPhraseModal.module.css';
import addIcon from '../../../../../assets/addIcon.svg';
import { createSchema } from './schema.ts';
import { parseSeedPhrase, KEY_DERIVATION_PATH } from 'near-seed-phrase';
import { useEffect } from 'react';
import { useStoreEffect, useStoreState } from '../../../../../../react-vault';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextAreaGroup } from '../../../../general/TextAreaGroup/TextAreaGroup.tsx';
import { MessageGroup } from '../general/MessageGroup/MessageGroup.tsx';

export const SeedPhraseModal = ({ isOpen, close, setStep }) => {
  const addKey = useStoreEffect((store: any) => store.keys.addKey);
  const records: any = useStoreState((store: any) => store.keys.records);
  const schema: any = createSchema(records);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      publicKey: null,
      seedPhrase: null,
      derivationPath: null,
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

  const derivationPath = useWatch({ control, name: 'derivationPath' });
  const publicKey = useWatch({ control, name: 'publicKey' });

  const prevStep = () => {
    setStep('selectImport');
  };

  useEffect(() => {
    setValue('derivationPath', KEY_DERIVATION_PATH);
  }, []);

  const onSubmit = (data: any) => {
    const phraseData: any = parseSeedPhrase(data.seedPhrase);
    setValue('publicKey', phraseData.publicKey);
    addKey({ data: phraseData, wallet: 'lantstool', derivationPath });
    resetField('seedPhrase');
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
            <TextAreaGroup
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
