import { useAccountsOptions } from '../_general/hooks/useAccountsOptions.js';
import { Dropdown } from '../../../../../../../_general/Dropdown/Dropdown.jsx';
import cn from './Receiver.module.scss';

export const ReceiverId = ({ form }) => {
  const { control } = form;
  const options = useAccountsOptions();

  return (
    <div className={cn.receiver}>
      <h3 className={cn.title}>Receiver</h3>
      <Dropdown
        name="receiverId"
        control={control}
        isSearchable={true}
        isClearable={true}
        options={options}
        creatableSelect={true}
        label="Account Id"
      />
    </div>
  );
};
