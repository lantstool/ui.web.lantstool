import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { FormDropdown } from '../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { useEffect } from 'react';
import cn from './Receiver.module.scss';

const restrictedTypes = ['AddKey', 'DeployContract', 'DeleteKey', 'DeleteAccount'];

const getActionsState = (actions) => {
  const isRestricted = actions.some((action) => restrictedTypes.includes(action.type));
  const hasCreateAccount = actions.some((action) => action.type === 'CreateAccount');
  return { isRestricted, hasCreateAccount };
};

export const ReceiverId = ({ form }) => {
  const { control, watch, setValue } = form;
  const options = useAccountsOptions();

  const signerId = watch('signerId');
  const receiverId = watch('receiverId.value');
  const actions = watch('actions');

  const { isRestricted, hasCreateAccount } = getActionsState(actions);

  useEffect(() => {
    if (isRestricted && !hasCreateAccount) {
      setValue('receiverId', signerId);
    }
  }, [isRestricted, hasCreateAccount, receiverId, signerId]);

  return (
    <div className={cn.receiver}>
      <div className={cn.label}>
        <span className={cn.icon} />
        <h3 className={cn.title}>Receiver account details</h3>
      </div>
      <FormDropdown
        name="receiverId"
        control={control}
        isSearchable
        isClearable
        isDisabled={isRestricted || hasCreateAccount}
        options={options}
        creatableSelect
        label="Account Id"
      />
    </div>
  );
};
