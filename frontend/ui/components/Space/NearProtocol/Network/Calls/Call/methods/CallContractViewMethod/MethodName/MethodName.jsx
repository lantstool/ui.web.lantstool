import { Dropdown } from '../../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useDropdownOptions } from './useDropdownOptions.js';

export const MethodName = ({ control }) => {
  const options = useDropdownOptions(control);
  return (
    <Dropdown
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
