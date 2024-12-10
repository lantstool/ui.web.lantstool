import { useWatch } from 'react-hook-form';
import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { InputDropdownGroup } from '../../../../../../../../../_general/InputDropdownGroup/InputDropdownGroup.jsx';
import cn from './CreateAccount.module.scss';

export const CreateAccount = ({ form, removeAction, name, order }) => {
  const accountId = useWatch({
    control: form.control,
    name: 'receiverId.value',
  });

  return (
    <ActionBase
      label={name}
      iconStyle={cn.icon}
      color={'green'}
      order={order}
      removeAction={removeAction}
      tooltipContent="Create account"
    >
      {/*<InputDropdownGroup control={form.control} name={'accountId'} />*/}
      {/*<p className={cn.title}>{accountId}</p>*/}
    </ActionBase>
  );
};
