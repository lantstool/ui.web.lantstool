import { ContractId } from '../general/ContractId/ContractId.jsx';
import { SignerKey } from '../general/SignerKey/SignerKey.jsx';

export const ViewAccessKeyChangesSingle = ({ form }) => (
  <>
    <ContractId form={form} />
    <SignerKey form={form} />
  </>
);
