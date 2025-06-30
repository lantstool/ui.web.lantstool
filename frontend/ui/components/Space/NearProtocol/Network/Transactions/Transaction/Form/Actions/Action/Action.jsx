import { CreateAccount } from './CreateAccount/CreateAccount.jsx';
import { Transfer } from './Transfer/Transfer.jsx';
import { AddKey } from './AddKey/AddKey.jsx';
import { DeployContract } from './DeployContract/DeployContract.jsx';
import { FunctionCall } from './FunctionCall/FunctionCall.jsx';
import { DeleteKey } from './DeleteKey/DeleteKey.jsx';
import { DeleteAccount } from './DeleteAccount/DeleteAccount.jsx';
import cn from './Action.module.scss';

export const Action = ({ form, action, index, remove, loadContractFunctions }) => {
  const { type } = action;
  const order = index + 1;

  const getName = (name) => `actions.${index}.${name}`;
  const removeAction = () => remove(index);

  return (
    <div className={cn.action}>
      {type === 'CreateAccount' && (
        <CreateAccount
          iconStyle={cn.createAccount}
          order={order}
          getName={getName}
          removeAction={removeAction}
          form={form}
        />
      )}
      {type === 'Transfer' && (
        <Transfer
          form={form}
          order={order}
          removeAction={removeAction}
          getName={getName}
          iconStyle={cn.transfer}
        />
      )}
      {type === 'AddKey' && (
        <AddKey
          getName={getName}
          form={form}
          order={order}
          removeAction={removeAction}
          iconStyle={cn.key}
        />
      )}
      {type === 'DeployContract' && (
        <DeployContract
          getName={getName}
          form={form}
          order={order}
          index={index}
          removeAction={removeAction}
          iconStyle={cn.deployContract}
        />
      )}
      {type === 'FunctionCall' && (
        <FunctionCall
          form={form}
          getName={getName}
          order={order}
          removeAction={removeAction}
          iconStyle={cn.functionCall}
          loadContractFunctions={loadContractFunctions}
        />
      )}
      {type === 'DeleteKey' && (
        <DeleteKey
          form={form}
          getName={getName}
          order={order}
          removeAction={removeAction}
          iconStyle={cn.key}
        />
      )}
      {type === 'DeleteAccount' && (
        <DeleteAccount
          form={form}
          getName={getName}
          order={order}
          removeAction={removeAction}
          iconStyle={cn.deleteAccount}
        />
      )}
    </div>
  );
};
