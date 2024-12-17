import { appendAction } from './appendAction.js';
import { Item } from './Item/Item.jsx';
import cn from './AddAction.module.scss';

export const AddAction = ({ append, fields }) => {
  const isCreateAccount = fields.length < 1;
  const isDeleteAccount = fields.find((action) => action.type === 'DeleteAccount');

  const createAccount = () => {
    appendAction.createAccount(append);
  };

  const transfer = () => {
    appendAction.transfer(append);
  };

  const addKey = () => {
    appendAction.addKey(append);
  };

  const deployContract = () => {
    appendAction.deployContract(append);
  };

  const deleteKey = () => {
    appendAction.deleteKey(append);
  };

  const deleteAccount = () => {
    appendAction.deleteAccount(append);
  };

  const functionCall = () => {
    appendAction.functionCall(append);
  };

  return (
    <div>
      <h2 className={cn.title}>Add actions</h2>
      <div className={cn.addAction}>
        <div className={cn.container}>
          <Item
            onClick={createAccount}
            disabled={!isCreateAccount || isDeleteAccount}
            text="Create Account"
            iconStyles={cn.iconCreateAccount}
            color="green"
          />
          <Item
            onClick={addKey}
            text="Add Key"
            iconStyles={cn.iconAddKey}
            color="green"
            disabled={isDeleteAccount}
          />
          <Item
            onClick={transfer}
            text="Transfer"
            iconStyles={cn.iconTransfer}
            color="blue"
            disabled={isDeleteAccount}
          />
        </div>
        <div className={cn.container}>
          <Item
            onClick={deployContract}
            text="Deploy Contract"
            iconStyles={cn.iconDeployContract}
            color="deepBlue"
            disabled={isDeleteAccount}
          />
          <Item
            onClick={functionCall}
            text="FunctionCall"
            iconStyles={cn.iconFunctionCall}
            color="purple"
            disabled={isDeleteAccount}
          />
        </div>
        <div className={cn.container}>
          <Item
            onClick={deleteKey}
            text="Delete Key"
            iconStyles={cn.iconDeleteKey}
            color="red"
            disabled={isDeleteAccount}
          />
          <Item
            onClick={deleteAccount}
            text="Delete Account"
            iconStyles={cn.iconDeleteAccount}
            color="red"
            disabled={isDeleteAccount}
          />
        </div>
      </div>
    </div>
  );
};
