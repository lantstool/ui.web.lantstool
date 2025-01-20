import { FormDropdown } from '../../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { useContractMethodsOptions } from '../../../../../../_general/hooks/useContractMethodsOptions.js';

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
    />
  );
};
