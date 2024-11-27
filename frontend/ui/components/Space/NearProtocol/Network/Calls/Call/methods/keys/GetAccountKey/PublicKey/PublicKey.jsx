import { usePublicKeyOptions } from './usePublicKeyOptions.js';
import { FormDropdown } from '../../../../../../../../../_general/FormDropdown/FormDropdown.jsx';

export const PublicKey = ({ control }) => {
  const options = usePublicKeyOptions(control);
  return (
    <FormDropdown
      name="publicKey"
      label="Public key"
      control={control}
      options={options}
      isSearchable
    />
  );
};
