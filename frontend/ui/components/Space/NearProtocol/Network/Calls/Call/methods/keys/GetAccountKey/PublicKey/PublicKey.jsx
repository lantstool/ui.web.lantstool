import { useWatch } from 'react-hook-form';
import { usePublicKeyOptions } from './usePublicKeyOptions.js';
import { FormDropdown } from '../../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';

export const PublicKey = ({ control }) => {
  const options = usePublicKeyOptions(control);
  const accountId = useWatch({ control, name: 'accountId.value' });

  return (
    <FormDropdown
      name="publicKey"
      label="Public key"
      control={control}
      options={options}
      isSearchable
      isDisabled={!accountId}
      tooltip={<Tooltip content="Publick key" placement="top" defaultContent />}
    />
  );
};
