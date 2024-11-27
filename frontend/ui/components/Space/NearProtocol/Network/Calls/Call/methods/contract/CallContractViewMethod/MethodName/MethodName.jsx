import { FormDropdown } from '../../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { useDropdownOptions } from './useDropdownOptions.js';

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
    />
  );
};
