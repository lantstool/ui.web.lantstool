import { ContractId } from '../general/ContractId/ContractId.jsx';
import { SignerKey } from '../general/SignerKey/SignerKey.jsx';

export const ViewAccessKey = ({ form }) => (
  <>
    <ContractId form={form} />
    <SignerKey form={form} />
  </>
);
