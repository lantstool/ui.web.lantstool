import { useFieldArray, useWatch } from 'react-hook-form';
import { Dropdown } from '../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';

export const AccountIds = ({ form }) => {
  const { control } = form;
  const options = useAccountsOptions();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'params.accountIds',
  });

  return fields.map((field, index) => {
    console.log('field', field);
    return (
      <Dropdown
        key={field.id}
        name={`accountIds.${index}.accountId`}
        label="Account Id"
        control={control}
        options={options}
        isSearchable
        isClearable
        creatableSelect
      />
    );
  });
};
