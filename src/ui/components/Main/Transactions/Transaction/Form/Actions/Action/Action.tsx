import { CreateAccount } from './CreateAccount/CreateAccount.tsx';
import { Transfer } from './Transfer/Transfer.tsx';
import { AddKey } from './AddKey/AddKey.tsx';
import { DeployContract } from './DeployContract/DeployContract.tsx';
import { FunctionCall } from './FunctionCall/FunctionCall.tsx';
import { DeleteKey } from './DeleteKey/DeleteKey.tsx';
import { DeleteAccount } from './DeleteAccount/DeleteAccount.tsx';
import cn from './Action.module.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


export const Action = ({ form, action, index, remove }: any) => {
  const { type, name } = action;

  const getName = (name: any) => `actions.${index}.${name}`;
  const removeAction = () => remove(index);

  return (
    <div className={cn.action}>
      <div className={cn.topbar}>
        <h4>{name}</h4>
        <button className={cn.removeButton} onClick={removeAction}>
          <DeleteOutlineOutlinedIcon className={cn.deleteIcon} />
        </button>
      </div>
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
  );
};
