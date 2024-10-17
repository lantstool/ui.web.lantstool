import { Option } from '../_general/components/Option/Option.jsx';
import { useDropdownOptions } from './useDropdownOptions.js';
import {Dropdown} from '../../../../../../../_general/Dropdown/Dropdown.jsx';

export const SignerKey = ({ form }) => {
  const { control } = form;
  const options = useDropdownOptions(control);

  return (
    <Dropdown
      name="signerKey"
      control={control}
      options={options}
      isClearable={true}
      components={{ Option }}
      label='Access key'
    />
  );
};
