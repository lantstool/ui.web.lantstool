import { options } from './options.js';
import { Dropdown } from '../../../../../../../../_general/Dropdown/Dropdown.jsx';

export const SelectMethod = ({ form }) => {
  // Somehow if we call form.setValue after field.onChange the Topbar don't see
  // the form state change and don't update isDirty param properly
  const onChange = (field) => (event) => {
    form.setValue('params', null);
    field.onChange(event ? event.value : '');
  };

  return (
    <Dropdown
      name="method"
      label="RPC Method"
      control={form.control}
      onChange={onChange}
      options={options}
      placeholder="Select RPC method you want to use"
      isClearable
      isSearchable
    />
  );
};
