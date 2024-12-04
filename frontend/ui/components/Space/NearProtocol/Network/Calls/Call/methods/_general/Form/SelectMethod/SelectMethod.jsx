import { useStoreAction } from '@react-vault';
import { options } from './options.js';
import { Dropdown } from '../../../../../../../../../_general/Dropdown/Dropdown.jsx';
import { CodeCircleOutline } from '../../../../../../../../../_general/icons/CodeCircleOutline.jsx';
import cn from './SelectMethod.module.scss';

export const SelectMethod = ({ callId, method }) => {
  const setDraftCurrentMethod = useStoreAction(
    (store) => store.nearProtocol.calls.setDraftCurrentMethod,
  );

  const onChange = (event) => {
    setDraftCurrentMethod({ callId, currentMethod: event.value });
  };

  return (
    <div className={cn.selectMethods}>
      <div className={cn.container}>
        <CodeCircleOutline style={cn.icon} />
        <h1 className={cn.title}>Select method</h1>
      </div>
      <Dropdown
        value={method}
        onChange={onChange}
        options={options}
        placeholder="Select RPC method you want to use"
        isSearchable
        copy={false}
        dynamicErrorSpace
      />
    </div>
  );
};
