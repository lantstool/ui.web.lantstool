import { useWatch } from 'react-hook-form';
import { FunctionCall } from './FunctionCall/FunctionCall.jsx';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { FormDropdown } from '../../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { FormRadioButton } from '../../../../../../../../../_general/FormRadioButton/FormRadioButton.jsx';
import { useKeysOptions } from './useKeysOptions.js';
import cn from './AddKey.module.scss';

export const AddKey = ({ iconStyle, form, getName, removeAction, order }) => {
  const { control } = form;
  const options = useKeysOptions();
  const permissionFormName = getName('permission');
  const permission = useWatch({ control, name: permissionFormName });

  return (
    <ActionBase
      iconStyle={iconStyle}
      label="Add Key"
      order={order}
      color="green"
      tooltipContent={
        <>
          Adds a new access key to the account.
          <br />• The key can be either a Full Access Key or a Function Call Key.
          <br />• A Full Access Key allows any future actions to be performed on the account it is
          added to.
          <br />• A Function Call Key restricts the account to executing only Function Call actions
          on the specified contract.
          <br />• It may have a gas limit for executing transactions.
          <br />• It may include an exclusive list of contract methods that can be invoked using
          this key.
          <br />• This action can only be executed on the Signer’s account or on a newly created
          subaccount.
        </>
      }
      removeAction={removeAction}
    >
      <div>
        <FormDropdown
          control={control}
          options={options}
          name={getName('publicKey')}
          label="New Public Key"
          copy={false}
          creatableSelect
          isSearchable
          isClearable
          placeholder="Select or type..."
        />
        <div className={cn.permission}>
          <h2 className={cn.title}>Permission</h2>
          <div className={cn.container}>
            <FormRadioButton
              label="Full Access"
              name={permissionFormName}
              control={control}
              value="FullAccess"
            />
            <FormRadioButton
              label="Function Call"
              name={permissionFormName}
              control={control}
              value="FunctionCall"
            />
          </div>
          {permission === 'FunctionCall' && <FunctionCall form={form} getName={getName} />}
        </div>
      </div>
    </ActionBase>
  );
};
