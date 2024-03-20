import { CreateAccount } from './CreateAccount/CreateAccount.tsx';
import { Transfer } from './Transfer/Transfer.tsx';
import { AddKey } from './AddKey/AddKey.tsx';
import { DeployContract } from './DeployContract/DeployContract.tsx';
import { FunctionCall } from './FunctionCall/FunctionCall.tsx';
import { DeleteKey } from './DeleteKey/DeleteKey.tsx';
import { DeleteAccount } from './DeleteAccount/DeleteAccount.tsx';
import cn from './Action.module.css';
import { DeleteIcon } from '../../../../../../../assets/components/DeleteIcon.tsx';

export const Action = ({ form, action, index, remove }: any) => {
  const { type, name } = action;
  const order = index + 1;

  const getName = (name: any) => `actions.${index}.${name}`;
  const removeAction = () => remove(index);

  return (
    <div className={cn.action}>
      <div className={cn.topbar}>
        <p className={cn.order}>#{order}</p>
        <h4 className={cn.title}>{name}</h4>
        <button className={cn.removeButton} onClick={removeAction}>
          <DeleteIcon style={cn.icon} />
        </button>
      </div>
      <div className={cn.wrapper}>
        {type === 'CreateAccount' && <CreateAccount form={form} />}
        {type === 'Transfer' && <Transfer form={form} getName={getName} />}
        {type === 'AddKey' && <AddKey getName={getName} action={action} form={form} />}
        {type === 'DeployContract' && (
          // @ts-ignore
          <DeployContract getName={getName} action={action} form={form} />
        )}
        {type === 'FunctionCall' && <FunctionCall form={form} getName={getName} />}
        {type === 'DeleteKey' && <DeleteKey action={action} form={form} getName={getName} />}
        {type === 'DeleteAccount' && <DeleteAccount form={form} getName={getName} />}
      </div>
    </div>
  );
};
