import { useWatch } from 'react-hook-form';
import { FunctionCall } from './FunctionCall/FunctionCall.jsx';
import { Input } from '../../../../../../../../../_general/Input/Input.jsx';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { FormDropdown } from '../../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { RadioButton } from '../../../../../../../../../_general/RadioButton/RadioButton.jsx';
import { useKeysOptions } from './useKeysOptions.js';
import cn from './AddKey.module.scss';

export const AddKey = ({ iconStyle, form, getName, removeAction, name, order }) => {
  const { control, register } = form;
  const options = useKeysOptions();
  const permissionName = getName('permission.type');
  const permissionType = useWatch({
    control,
    name: permissionName,
  });

  return (
    <ActionBase
      iconStyle={iconStyle}
      label={name}
      order={order}
      color="green"
      tooltipContent="Add key"
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
        />
        <Input
          control={control}
          name={getName('nonce')}
          label="Nonce"
          copy={false}
          placeholder={0}
        />
        <div className={cn.permission}>
          <h2 className={cn.title}>Permission</h2>
          <div className={cn.container}>
            <RadioButton
              label="Full Access"
              name={permissionName}
              register={register}
              value="FullAccess"
            />
            <RadioButton
              label="Function Call"
              name={permissionName}
              register={register}
              value="FunctionCall"
            />
          </div>
          {permissionType === 'FunctionCall' && <FunctionCall form={form} getName={getName} />}
        </div>
      </div>
    </ActionBase>
  );
};
