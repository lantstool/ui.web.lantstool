import { useEffect } from 'react';
import { KeyPair } from 'near-api-js';
import { useWatch } from 'react-hook-form';
import { InputGroup } from '../../../../../../general/InputGroup/InputGroup.tsx';
import { SelectKey } from "./SelectKey/SelectKey.tsx";

const getPublicKey = (privateKey: string) => {
  try {
    return KeyPair.fromString(privateKey).getPublicKey().toString();
  } catch (e) {
    return e;
  }
};

export const AccessKey = ({ form }: any) => {
  const { register, control, setValue } = form;

  const signerType = useWatch({ control, name: 'signerKey' });

  useEffect(() => {
    setValue('signerKey.publicKey', getPublicKey(signerType.privateKey));
  }, [signerType.privateKey]);

  return (
    <fieldset style={{ borderRadius: 8 }}>
      <legend>Access key</legend>

      <input
        {...register('signerKey.source')}
        type="radio"
        value="Existing"
        id="signerKey.source.existing"
      />
      <label htmlFor="signerKey.source.existing">Select from Vault</label>

      <input
        {...register('signerKey.source')}
        type="radio"
        value="Manually"
        id="signerKey.source.manually"
      />
      <label htmlFor="signerKey.source.manually">Type manually</label>

      {signerType.source === 'Existing' && <SelectKey form={form} />}

      {signerType.source === 'Manually' && (
        <>
          <InputGroup register={register} name="signerKey.privateKey" label="Private Key" />
          <InputGroup register={register} name="signerKey.publicKey" label="Public Key" disabled />
        </>
      )}
    </fieldset>
  );
};
