import { CreateAccount } from './CreateAccount/CreateAccount.tsx';
import { Transfer } from './Transfer/Transfer.tsx';
import { AddKey } from './AddKey/AddKey.tsx';
import { DeployContract } from './DeployContract/DeployContract.tsx';
import { FunctionCall } from './FunctionCall/FunctionCall.tsx';
import cn from './Action.module.css';

export const Action = ({ form, action, index, remove }: any) => {
  const { type, name } = action;

  const getName = (name: any) => `actions.${index}.${name}`;
  const removeAction = () => remove(index);

  return (
    <div className={cn.action}>
      <div className={cn.topbar}>
        <h4>{name}</h4>
        <button onClick={removeAction}>Delete</button>
      </div>
      {type === 'CreateAccount' && <CreateAccount form={form} />}
      {type === 'Transfer' && <Transfer form={form} getName={getName} />}
      {type === 'AddKey' && <AddKey getName={getName} action={action} form={form} />}
      {type === 'DeployContract' && (
        // @ts-ignore
        <DeployContract getName={getName} action={action} form={form} />
      )}
      {type === 'FunctionCall' && <FunctionCall form={form} getName={getName} />}
    </div>
  );
};
