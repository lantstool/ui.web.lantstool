import { useStoreAction } from '@react-vault';
import Select from 'react-select';
import { options } from './options.js';
import { Dropdown } from '../../../../../../../_general/Dropdown/Dropdown.jsx';

export const SelectMethod = ({ callId, form, method, setMethod }) => {
  const setDraft = useStoreAction((store) => store.nearProtocol.calls.setDraft);

  // const onChange = (field) => (event) => {
  //   field.onChange(event);
  //   setDraft({ callId, draft: form.getValues() });
  //   setMethod(event);
  // };

  const onChange = (event) => {
    form.setValue('method', event);
    console.log(form.getValues());
    setMethod(event);
  };

  return (
    <Select
      value={method}
      onChange={onChange}
      options={options}
      placeholder="Select RPC method you want to use"
      isClearable
      isSearchable
    />
    // <Dropdown
    //   name="method"
    //   label="RPC Method"
    //   control={form.control}
    //   onChange={onChange}
    //   options={options}
    //   placeholder="Select RPC method you want to use"
    //   isClearable
    //   isSearchable
    // />
  );
};
