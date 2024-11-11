import { useStoreAction } from '@react-vault';
import Select from 'react-select';
import { options } from './options.js';
import { Dropdown } from '../../../../../../../../../_general/Dropdown/Dropdown.jsx';

export const SelectMethod = ({ callId, method }) => {
  const setDraftCurrentMethod = useStoreAction(
    (store) => store.nearProtocol.calls.setDraftCurrentMethod,
  );

  const onChange = (event) => {
    setDraftCurrentMethod({ callId, currentMethod: event.value });
  };

  return (
    <Select
      value={method}
      onChange={onChange}
      options={options}
      placeholder="Select RPC method you want to use"
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
