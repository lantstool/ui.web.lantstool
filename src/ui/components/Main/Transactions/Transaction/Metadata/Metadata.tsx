import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';

export const Metadata = ({ form }: any) => {
  const { register, getValues } = form;
  const name = getValues().name;

  return (
    <div>
      <h2>{name}</h2>
      <h3>From</h3>
      <InputGroup register={register} name="signerId" label="Signer Id" />
      <InputGroup register={register} name="publicKey" label="Public Key" />
    </div>
  );
};
