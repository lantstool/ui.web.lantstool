import { ModalGroup } from '../../../../../../general/ModalGroup/ModalGroup.jsx';
import cn from './PrivateKeyModal.module.css';
import { TextareaGroup } from '../../../../../../general/TextareaGroup/TextareaGroup.jsx';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSchema } from './schema.js';
import { useStoreEffect, useStoreState } from '../../../../../../../../react-vault/index.js';
import { Button } from '../../../general/Button/Button.jsx';
import addIcon from '../../../../../../../assets/addIcon.svg';
import { MessageGroup } from '../general/MessageGroup/MessageGroup.jsx';
import { useMemo } from 'react';

export const PrivateKeyModal = ({ isOpen, close, setStep }) => {
  const addKey = useStoreEffect((store) => store.keys.addKey);
  const records = useStoreState((store) => store.keys.records);
  const schema = useMemo(() => createSchema(records), [records]);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      publicKey: null,
      privateKey: null,
      seedPhrase: null,
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
      text="Import from Private Key"
      prevStep={prevStep}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn.container}>
          <h2 className={cn.title}>
            Make sure you type the correct ed25519 private key without extra spaces or symbols
          </h2>
          <div className={cn.privateWrapper}>
            <TextareaGroup
              register={register}
              name="privateKey"
              rows={4}
              errors={errors?.privateKey?.message}
              label="Private key"
            />
          </div>
          <MessageGroup
            errors={errors?.privateKey}
            publicKey={publicKey}
            dirtyFields={dirtyFields.privateKey}
          />
          <div className={cn.buttonWrapper}>
            <Button type="submit" text="Import" src={addIcon} />
          </div>
        </div>
      </form>
    </ModalGroup>
  );
};
