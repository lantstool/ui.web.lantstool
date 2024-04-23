import { ContractsForms } from './ContractsForms/ContractsForms.tsx';
import { AccessKeysForms } from './AccessKeysForms/AccessKeysForms.tsx';

export const Forms = ({ call }: any) => {
  return (
    <>
      <ContractsForms call={call} />
      <AccessKeysForms call={call} />
    </>
  );
};
