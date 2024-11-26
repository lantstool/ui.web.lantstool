import { useStoreAction } from '@react-vault';
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
    <Dropdown
      value={method}
      onChange={onChange}
      options={options}
      placeholder="Select RPC method you want to use"
      isSearchable
    />
  );
};
