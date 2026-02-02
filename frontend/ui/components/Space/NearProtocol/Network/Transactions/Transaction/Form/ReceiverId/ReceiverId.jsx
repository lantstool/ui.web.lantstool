import { Tooltip } from '@gc/Tooltip/Tooltip.jsx';
import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { useEffect, useRef } from 'react';
import { MenuList } from '../_general/MenuList/MenuList.jsx';
import { ImportAccount } from '../../../../_general/ImportAccount/ImportAccount.jsx';
import { useToggler } from '@hooks/useToggler.js';
import cn from './Receiver.module.scss';

const restrictedTypes = ['AddKey', 'DeployContract', 'DeleteKey', 'DeleteAccount'];

const getActionsState = (actions) => {
  const isRestricted = actions.some((action) => restrictedTypes.includes(action.type));
  const hasCreateAccount = actions.some((action) => action.type === 'CreateAccount');
  const hasFunctionCall = actions.some((action) => action.type === 'FunctionCall');
  return { isRestricted, hasCreateAccount, hasFunctionCall };
};

export const ReceiverId = ({ form }) => {
  const { control, watch, setValue } = form;
  const [isModalOpen, openModal, closeModal] = useToggler();
  const ref = useRef(null);
  const signerId = watch('signerId');
  const receiverId = watch('receiverId.value');
  const actions = watch('actions');
  const options = useAccountsOptions(signerId);

  const { isRestricted, hasCreateAccount, hasFunctionCall } = getActionsState(actions);
  const disableReceiverId = isRestricted || hasCreateAccount || hasFunctionCall;

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
        <Tooltip
          content={
            <div className={cn.tooltipContent}>
              The account relative to which the actions are executed. Examples:
              <br />• A Transfer action will send tokens from the Signer to this account.
              <br />• The Signer will invoke a Function Call on this contract.
              <br />• In the case of a Delete Account action, the Signer deletes itself.
            </div>
          }
          placement="top"
          defaultContent
        />
      </div>
      <FormDropdown
        dropdownRef={ref}
        name="receiverId"
        control={control}
        isSearchable
        isClearable
        isDisabled={disableReceiverId}
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
