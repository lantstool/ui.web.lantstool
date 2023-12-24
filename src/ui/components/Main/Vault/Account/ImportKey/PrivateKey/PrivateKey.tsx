import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';
import { useStoreEffect, useStoreState } from '../../../../../../../react-vault';
import { KeyPair } from 'near-api-js';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSchema } from './schema.ts';
import { ModalGroup } from '../ModalGroup/ModalGroup.tsx';
import cn from '../SeedPhrase/SeedPhrase.module.css';

export const PrivateKey = ({ closeModal, navigate, accountId, isOpen }: any) => {
  const onAddKey = useStoreEffect((store: any) => store.vault.onAddKey);
  const accessKeyList: any = useStoreState((state: any) => state.vault.accessKeyList);
  const list: any = useStoreState((store: any) => store.vault.map[accountId].list);
  const schema: any = createSchema(list, accessKeyList);

  const form = useForm<any>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      privateKey: null,
      publicKey: null,
    },
  });
  const {
    register,
    control,
    formState: { errors, isDirty },
    clearErrors,
    resetField,
    setValue,
    handleSubmit,
  }: any = form;

  const publicKey = useWatch({
    control,
    name: 'publicKey',
  });
  const onPrevStep = (e: any) => {
    e.preventDefault();
    clearErrors('privateKey');
    resetField('privateKey');
    navigate('importType');
  };
  const onSubmit = (data: any) => {
    const pk = KeyPair.fromString(data.privateKey).getPublicKey().toString();
    setValue('publicKey', pk);
    onAddKey({ data, accountId });
  };

  return (
    <ModalGroup isOpen={isOpen} closeModal={closeModal} prevStep={onPrevStep}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Type your private key. Be sure this private key matches the public key.</h2>
        <InputGroup register={register} name="privateKey" label="Private key" />
        {errors?.privateKey && <p>{errors?.privateKey?.message}</p>}
        <div className={cn.publicKey}>
          {!errors?.seedPhrase?.message && publicKey && isDirty && (
            <p className={cn.successfulMessage}>Add key: {publicKey} successful!</p>
          )}
        </div>
        <button type="submit">Add key</button>
      </form>
    </ModalGroup>
  );
};
