import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { FormDropdown } from '../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import cn from './Receiver.module.scss';

export const ReceiverId = ({ form }) => {
  const { control } = form;
  const options = useAccountsOptions();

  return (
    <div className={cn.receiver}>
      <div className={cn.label}>
        <span className={cn.icon} />
        <h3 className={cn.title}>Receiver account details</h3>
      </div>
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
