import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { useWatch } from 'react-hook-form';
import { KeyPair } from 'near-api-js';
import { useEffect } from 'react';
import { AccessKey } from './AccessKey/AccessKey.tsx';

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
    setValue('signerKey.publicKey', getPublicKey(signerType?.privateKey));
  }, [signerType?.privateKey]);

  return (
    <div>
      <h2>{name}</h2>
      <h3>From</h3>
      <InputGroup register={register} name="signer.accountId" label="Signer Id" />
      <AccessKey register={register} signerType={signerType} />
    </div>
  );
};
