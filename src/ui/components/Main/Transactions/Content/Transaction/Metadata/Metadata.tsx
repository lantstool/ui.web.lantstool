import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';
import { AccessKey } from './AccessKey/AccessKey.tsx';

export const Metadata = ({ form }: any) => {
  const { register } = form;

  return (
    <div>
      <h3>Sender</h3>
      <InputGroup register={register} name="signer.accountId" label="Signer Id" />
      <AccessKey form={form} />
    </div>
  );
};
