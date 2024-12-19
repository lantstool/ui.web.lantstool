import { useDropdownOptions } from './useDropdownOptions.js';
import { FormDropdown } from '../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import cn from './SignerKey.module.scss';

export const SignerKey = ({ form }) => {
  const { control } = form;
  const options = useDropdownOptions(control);

  return (
    <div className={cn.signerKey}>
      <FormDropdown
        name="signerKey"
        control={control}
        options={options}
        isClearable={true}
        label="Access key"
      />
    </div>
  );
};
