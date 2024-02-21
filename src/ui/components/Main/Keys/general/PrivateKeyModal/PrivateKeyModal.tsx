import { ModalGroup } from '../general/ModalGroup/ModalGroup.tsx';
import cn from './PrivateKeyModal.module.css';
import { TextAreaGroup } from '../../../../general/TextAreaGroup/TextAreaGroup.tsx';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSchema } from './schema.ts';
import { useStoreEffect, useStoreState } from '../../../../../../react-vault';
import { Button } from '../../../general/Button/Button.tsx';
import addIcon from '../../../../../assets/addIcon.svg';
import { KeyPair } from 'near-api-js';
import { MessageGroup } from '../general/MessageGroup/MessageGroup.tsx';

export const PrivateKeyModal = ({ isOpen, close, setStep }) => {
  const addKey = useStoreEffect((store: any) => store.keys.addKey);
  const records = useStoreState((store: any) => store.keys.records);
  const schema = createSchema(records);


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
  }: any = form;

  const publicKey = useWatch({ control, name: 'publicKey' });

  const prevStep = () => {
    setStep('selectImport');
  };

  const onSubmit = (data: any) => {
    const pk = KeyPair.fromString(data.privateKey).getPublicKey().toString();
    setValue('publicKey', pk);
    addKey({
      data: {
        publicKey: data.publicKey,
        privateKey: data.privateKey,
        seedPhrase: null,
      },
      wallet: 'lantstool',
    });
    resetField('privateKey');
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
            <TextAreaGroup
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
