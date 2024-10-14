import { ContractIds } from '../general/ContractIds/ContractIds.jsx';
import { InputGroup } from '../../../../../../../_general/InputGroup/InputGroup.jsx';

export const ViewContractStateChanges = ({ form }) => (
  <>
    <ContractIds form={form} />
    <InputGroup
      register={form.register}
      label="Key prefix base64"
      name="params.key_prefix_base64"
    />
    <InputGroup register={form.register} label="Block Id" name="params.block_id" />
  </>
);
