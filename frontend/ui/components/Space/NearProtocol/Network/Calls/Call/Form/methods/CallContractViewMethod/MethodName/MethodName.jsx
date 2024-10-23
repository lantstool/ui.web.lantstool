import { Dropdown } from '../../../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useDropdownOptions } from './useDropdownOptions.js';

export const MethodName = ({ form }) => {
  const { control } = form;
  const options = useDropdownOptions(control);

  return (
    <Dropdown
      name="params.methodName"
      label="Method"
      control={control}
      options={options}
      isSearchable
      isClearable
      creatableSelect
    />
  );
};
