import { useWatch } from 'react-hook-form';
import { FunctionCall } from './FunctionCall/FunctionCall.jsx';
import { Input } from '../../../../../../../../../_general/Input/Input.jsx';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { RadioButton } from '../../../../../../../../../_general/RadioButton/RadioButton.jsx';
import cn from './AddKey.module.scss';

export const AddKey = ({ iconStyle, form, getName, removeAction, name, order }) => {
  const { control, register } = form;
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
        <Input control={control} name={getName('publicKey')} label="New Public Key" copy={false} />
        <Input control={control} name={getName('nonce')} label="Nonce" copy={false} />
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
