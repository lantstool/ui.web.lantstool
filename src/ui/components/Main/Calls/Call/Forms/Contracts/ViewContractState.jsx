import { ContractId } from '../general/ContractId/ContractId.jsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.jsx';

export const ViewContractState = ({ form }) => (
  <>
    <ContractId form={form} />
    <InputGroup register={form.register} label="Prefix base 64" name="params.prefix_base64" />
  </>
);
