import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { FormDropdown } from '../../../../../../../_general/dropdown/FormDropdown.jsx';
import { useEffect, useRef } from 'react';
import { MenuList } from '../_general/MenuList/MenuList.jsx';
import { ImportAccount } from '../../../../_general/ImportAccount/ImportAccount.jsx';
import { useToggler } from '@hooks/useToggler.js';
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
  const [isModalOpen, openModal, closeModal] = useToggler();
  const ref = useRef(null);
  const signerId = watch('signerId');
  const receiverId = watch('receiverId.value');
  const actions = watch('actions');

  const { isRestricted, hasCreateAccount } = getActionsState(actions);

  useEffect(() => {
    if (isRestricted && !hasCreateAccount) {
      setValue('receiverId', signerId);
    }
  }, [isRestricted, hasCreateAccount, receiverId, signerId]);

  const setAccount = (value) => {
    setValue('receiverId', { value: value, label: value });
  };

  const onClick = () => {
    openModal();
    ref.current.blur();
  };

  return (
    <div className={cn.receiver}>
      <div className={cn.label}>
        <span className={cn.icon} />
        <h3 className={cn.title}>Receiver</h3>
      </div>
      <FormDropdown
        dropdownRef={ref}
        name="receiverId"
        control={control}
        isSearchable
        isClearable
        isDisabled={isRestricted || hasCreateAccount}
        options={options}
        creatableSelect
        label="Receiver Id"
        placeholder="Select or type..."
        components={{
          MenuList: (props) => (
            <MenuList props={props} onClick={onClick} icon={cn.importIcon} title="Import account" />
          ),
        }}
      />
      {isModalOpen && <ImportAccount closeModal={closeModal} setAccount={setAccount} />}
    </div>
  );
};
