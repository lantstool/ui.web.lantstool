// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { parseSeedPhrase } from 'near-seed-phrase';
import cn from './SeedPhrase.module.css';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';
import { useStoreEffect, useStoreState } from '../../../../../../../react-vault';
import { useForm, useWatch } from 'react-hook-form';
import { createSchema } from './schema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModalGroup } from '../ModalGroup/ModalGroup.tsx';

export const SeedPhrase = ({ closeModal, navigate, accountId, isOpen }: any) => {
  const onAddKey = useStoreEffect((store: any) => store.vault.onAddKey);
  const accessKeyList: any = useStoreState((state: any) => state.vault.accessKeyList);
  const list: any = useStoreState((store: any) => store.vault.map[accountId].list);
  const schema: any = createSchema(accessKeyList, list);

  const form = useForm<any>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      publicKey: null,
      seedPhrase: null,
    },
  });
  const {
    register,
    control,
    formState: { errors, isDirty },
    clearErrors,
    resetField,
    handleSubmit,
    setValue,
  }: any = form;

  const publicKey = useWatch({
    control,
    name: 'publicKey',
  });
  const onPrevStep = () => {
    clearErrors('seedPhrase');
    resetField('seedPhrase');
    setValue('privateKey', null);
    navigate('importType');
  };

  const onSubmit = (data: any) => {
    const phraseData = parseSeedPhrase(data.seedPhrase);
    setValue('publicKey', phraseData.publicKey);
    onAddKey({ data: phraseData, accountId });
    resetField('seedPhrase');
  };

  return (
    <ModalGroup isOpen={isOpen} closeModal={closeModal} prevStep={onPrevStep}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Type your seed phrase. Be sure this seed phrase matches the public key.</h2>
        <div>
          <InputGroup register={register} name="seedPhrase" label="Seed phrase" />
          <p className={cn.error}>{errors?.seedPhrase && errors?.seedPhrase.message}</p>
          <div className={cn.publicKey}>
            {!errors?.seedPhrase?.message && publicKey && isDirty && (
              <p className={cn.successfulMessage}>Add key: {publicKey} successful!</p>
            )}
          </div>
        </div>
        <button type="submit">Add key</button>
      </form>
    </ModalGroup>
  );
};
