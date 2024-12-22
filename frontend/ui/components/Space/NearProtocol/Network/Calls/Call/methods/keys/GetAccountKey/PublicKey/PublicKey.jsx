import { usePublicKeyOptions } from './usePublicKeyOptions.js';
import { FormDropdown } from '../../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';

export const PublicKey = ({ control }) => {
  const options = usePublicKeyOptions(control);
  return (
    <FormDropdown
      name="publicKey"
      label="Public key"
      control={control}
      options={options}
      isSearchable
      tooltip={<Tooltip content="Publick key" placement="top" defaultContent />}
    />
  );
};
