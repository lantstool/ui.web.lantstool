import { useDropdownOptions } from './useDropdownOptions.js';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { FormDropdown } from '../../../../../../../../../_general/dropdown/FormDropdown.jsx';

export const DeleteKey = ({ form, getName, order, removeAction, iconStyle }) => {
  const { control } = form;
  const options = useDropdownOptions(control);

  const onChange = (field) => (event) => {
    field.onChange(event);
  };

  return (
    <ActionBase
      removeAction={removeAction}
      label="Delete Key"
      iconStyle={iconStyle}
      color="error"
      order={order}
      tooltipContent={
        <>
          Removes an access key from the account.
          <br />• If the last Full Access Key is removed, the account will be permanently locked and
          direct actions (such as Transfer or Add Key) will no longer be possible.
          <br />• This action can only be executed on the Signer’s account or on a newly created
          subaccount.
        </>
      }
    >
      <FormDropdown
        onChange={onChange}
        control={control}
        name={getName('publicKey')}
        options={options}
        label="Public Key"
        placeholder="Select or type..."
        dynamicErrorSpace
        isSearchable
        isClearable
      />
    </ActionBase>
  );
};
