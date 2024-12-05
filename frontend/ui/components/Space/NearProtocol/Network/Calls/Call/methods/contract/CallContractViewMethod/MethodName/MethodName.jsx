import { FormDropdown } from '../../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { useDropdownOptions } from './useDropdownOptions.js';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';

export const MethodName = ({ control }) => {
  const options = useDropdownOptions(control);
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
