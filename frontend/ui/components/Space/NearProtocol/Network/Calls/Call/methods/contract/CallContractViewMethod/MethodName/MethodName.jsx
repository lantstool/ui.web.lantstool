import { FormDropdown } from '../../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { useContractMethodsOptions } from '../../../../../../_general/hooks/useContractMethodsOptions.js';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';

export const MethodName = ({ control }) => {
  const options = useContractMethodsOptions(control, 'contractId.value');
  return (
    <FormDropdown
      name="methodName"
      label="Method"
      control={control}
      options={options}
      isSearchable
      isClearable
      creatableSelect
      tooltip={<Tooltip content="Method name" placement="top" defaultContent />}
    />
  );
};
