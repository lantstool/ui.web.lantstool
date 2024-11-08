import { usePublicKeyOptions } from './usePublicKeyOptions.js';
import { Dropdown } from '../../../../../../../../../_general/Dropdown/Dropdown.jsx';

export const PublicKey = ({ control }) => {
  const options = usePublicKeyOptions(control);
  return (
    <Dropdown
      name="publicKey"
      label="Public key"
      control={control}
      options={options}
      isSearchable
    />
  );
};
