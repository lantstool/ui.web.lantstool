import { useWatch } from 'react-hook-form';
import { FormSelectGroup } from '../../../../../../../_general/FormSelectGroup/FormSelectGroup.jsx';
import { useAccountsOptions } from '../_general/hooks/useAccountsOptions.js';
import cn from './Receiver.module.scss';

export const ReceiverId = ({ form }) => {
  const { control } = form;
  const options = useAccountsOptions();
  const accountId = useWatch({ control, name: 'receiverId.value' });

  return (
    <>
      <h3 className={cn.title}>Receiver</h3>
      <FormSelectGroup
        name="receiverId"
        control={control}
        isSearchable={true}
        isClearable={true}
        options={options}
        creatableSelect={true}
        accountId={accountId}
        label="Account Id"
      />
    </>
  );
};
