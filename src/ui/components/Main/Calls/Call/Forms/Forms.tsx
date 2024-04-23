import { ContractsForms } from './ContractsForms/ContractsForms.tsx';
import { AccessKeysForms } from './AccessKeysForms/AccessKeysForms.tsx';
import { AccountsForms } from './AccountsForms/AccountsForms.tsx';

export const Forms = ({ call }: any) => {
  return (
    <>
      <ContractsForms call={call} />
      <AccessKeysForms call={call} />
      <AccountsForms call={call} />
    </>
  );
};
