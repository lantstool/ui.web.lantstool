import { useWatch } from 'react-hook-form';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { InputActionGroup } from '../../../../../../../../../_general/InputActionGroup/InputActionGroup.jsx';

export const CreateAccount = ({iconStyle, form, removeAction, name, order }) => {
  const accountId = useWatch({
    control: form.control,
    name: 'signerId.value',
  });
  const singleValue = accountId? `.${accountId}` : '';
//TODO use account id
  return (
    <ActionBase
      label={name}
      iconStyle={iconStyle}
      color='green'
      order={order}
      removeAction={removeAction}
      tooltipContent="Create account"
    >
      <InputActionGroup
        control={form.control}
        inputGroup="text"
        name='accountId'
        label="Account id"
        singleValue={singleValue}
        dynamicErrorSpace
      />
    </ActionBase>
  );
};
