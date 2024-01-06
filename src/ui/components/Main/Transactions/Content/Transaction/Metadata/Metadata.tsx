import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';
import { AccessKey } from './AccessKey/AccessKey.tsx';
import { SignerAccount } from './SignerAccount/SignerAccount.tsx';
import { SignerKey } from './SignerKey/SignerKey.tsx';

export const Metadata = ({ form }: any) => {
  const { register } = form;

  return (
    <div>
      <h3>Sender</h3>
      <SignerAccount form={form} />
      <SignerKey form={form} />
    </div>
  );
};
