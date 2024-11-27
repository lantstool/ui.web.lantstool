import { Option } from '../_general/Option/Option.jsx';
import { useDropdownOptions } from './useDropdownOptions.js';
import { FormDropdown } from '../../../../../../../_general/FormDropdown/FormDropdown.jsx';

export const SignerKey = ({ form }) => {
  const { control } = form;
  const options = useDropdownOptions(control);

  return (
    <FormDropdown
      name="signerKey"
      control={control}
      options={options}
      isClearable={true}
      components={{ Option }}
      label="Access key"
    />
  );
};
