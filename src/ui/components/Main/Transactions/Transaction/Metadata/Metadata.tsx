import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';

export const Metadata = ({ form }: any) => {
  const { register, getValues } = form;
  const name = getValues().name;

  return (
    <div>
      <h2>{name}</h2>
      <h3>From</h3>
      <InputGroup register={register} name="signer.accountId" label="Signer Id" />
      <InputGroup register={register} name="signerKey.publicKey" label="Signer Public Key" />
    </div>
  );
};
