import { useDropdownOptions } from './useDropdownOptions.js';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { FormDropdown } from '../../../../../../../../../_general/dropdown/FormDropdown.jsx';

export const DeleteKey = ({ form, getName, name, order, removeAction, iconStyle }) => {
  const { control } = form;
  const options = useDropdownOptions(control);

  const onChange = (field) => (event) => {
    field.onChange(event);
  };

  return (
    <ActionBase
      removeAction={removeAction}
      label={name}
      iconStyle={iconStyle}
      color="error"
      order={order}
      tooltipContent="Delete key"
    >
      <FormDropdown
        onChange={onChange}
        control={control}
        name={getName('accessKey')}
        options={options}
        label="Access key"
        placeholder="Select or enter..."
        dynamicErrorSpace
        isSearchable
        isClearable
      />
    </ActionBase>
  );
};
