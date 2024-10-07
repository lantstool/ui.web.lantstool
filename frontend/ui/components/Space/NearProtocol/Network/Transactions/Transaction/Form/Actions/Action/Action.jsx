import { CreateAccount } from './CreateAccount/CreateAccount.jsx';
import { Transfer } from './Transfer/Transfer.jsx';
import { AddKey } from './AddKey/AddKey.jsx';
import { DeployContract } from './DeployContract/DeployContract.jsx';
import { FunctionCall } from './FunctionCall/FunctionCall.jsx';
import { DeleteKey } from './DeleteKey/DeleteKey.jsx';
import { DeleteAccount } from './DeleteAccount/DeleteAccount.jsx';
import cn from './Action.module.css';
import { DeleteIcon } from '../../../../../../../../_general/icons/DeleteIcon.jsx';
import { useWatch } from 'react-hook-form';

export const Action = ({ form, action, index, remove }) => {
  const { type, name } = action;
  const signerKey = useWatch({ control: form.control, name: 'signerKey.permission.functionCall' });
  const order = index + 1;

  const getName = (name) => `actions.${index}.${name}`;
  const removeAction = () => remove(index);

  return (
    <div className={cn.action}>
      <div className={cn.topbar}>
        <p className={cn.order}>#{order}</p>
        <h4 className={cn.title}>{name}</h4>
        {!signerKey && (
          <button className={cn.removeButton} onClick={removeAction}>
            <DeleteIcon style={cn.icon} />
          </button>
        )}
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
