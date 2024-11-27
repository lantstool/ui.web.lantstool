import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { FormDropdown } from '../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import cn from './Receiver.module.scss';

export const ReceiverId = ({ form }) => {
  const { control } = form;
  const options = useAccountsOptions();

  return (
    <div className={cn.receiver}>
      <h3 className={cn.title}>Receiver</h3>
      <FormDropdown
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
