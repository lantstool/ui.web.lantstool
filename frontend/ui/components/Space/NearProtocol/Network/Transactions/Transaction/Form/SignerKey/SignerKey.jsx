import { Option } from '../_general/components/Option/Option.jsx';
import { FormSelectGroup } from '../../../../../../../_general/FormSelectGroup/FormSelectGroup.jsx';
import { useDropdownOptions } from './useDropdownOptions.js';
import { SelectHeadLabel } from '../_general/components/SelectHeadLabel/SelectHeadLabel.jsx';

export const SignerKey = ({ form }) => {
  const { control } = form;
  const options = useDropdownOptions(control);

  return (
    <FormSelectGroup
      name="signerKey"
      control={control}
      options={options}
      isClearable={true}
      components={{ Option }}
    >
      <SelectHeadLabel text="Access Key"  />
    </FormSelectGroup>
  );
};
