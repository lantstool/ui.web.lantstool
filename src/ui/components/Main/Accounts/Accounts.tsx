import cn from './Accounts.module.css';
import { useStoreEffect } from "../../../../react-vault";

export const Accounts = () =>  {
  const addAccounts = useStoreEffect((store) => store.accounts.addAccounts);

  return (
    <div className={cn.container}>
      Accounts
      <div>
        <button type="button" onClick={addAccounts}>Add Accounts</button>
      </div>

    </div>
  );
};
