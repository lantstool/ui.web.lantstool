import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { AccessKey } from './AccessKey/AccessKey.tsx';

export const Metadata = ({ form }: any) => {
  const { register, getValues } = form;
  const name = getValues().name;

  return (
    <div>
      <h2>{name}</h2>
      <h3>From</h3>
      <InputGroup register={register} name="signer.accountId" label="Signer Id" />
      <AccessKey form={form} />
    </div>
  );
};
