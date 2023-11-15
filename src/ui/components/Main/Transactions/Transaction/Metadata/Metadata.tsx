import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { useWatch } from 'react-hook-form';
import { KeyPair } from 'near-api-js';
import { useEffect } from 'react';

const getPublicKey = (privateKey: string) => {
  try {
    return KeyPair.fromString(privateKey).getPublicKey().toString();
  } catch (e) {
    return e;
  }
};

export const Metadata = ({ form }: any) => {
  const { register, getValues, control, setValue } = form;
  const name = getValues().name;

  const signerType = useWatch({
    control,
    name: 'signerKey',
  });

  useEffect(() => {
    setValue(`signerKey.publicKey`, getPublicKey(signerType?.privateKey));
  }, [signerType?.privateKey]);

  return (
    <div>
      <h2>{name}</h2>
      <h3>From</h3>
      <InputGroup register={register} name="signer.accountId" label="Signer Id" />

      <fieldset style={{ borderRadius: 8 }}>
        <legend>Access key</legend>

        <input
          {...register('signerKey.source')}
          type="radio"
          value="Manually"
          id={'signerKey.source.manually'}
        />
        <label htmlFor={'signerKey.source.manually'}>Type manually</label>

        <input
          {...register('signerKey.source')}
          type="radio"
          value="Existing"
          id={'signerKey.source.existing'}
        />
        <label htmlFor={'signerKey.source.existing'}>Select existing</label>

        {signerType?.source === 'Manually' && (
          <>
            <InputGroup register={register} name={'signerKey.privateKey'} label="Private Key" />
            <InputGroup
              register={register}
              name={'signerKey.publicKey'}
              label="Public Key"
              disabled={true}
            />
          </>
        )}
      </fieldset>
    </div>
  );
};
