import { ContractIds } from '../general/ContractIds/ContractIds.jsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.jsx';

export const ViewContractCodeChanges = ({ form }) => (
  <>
    <ContractIds form={form} />
    <InputGroup register={form.register} label="Block Id" name="params.block_id" />
  </>
);
