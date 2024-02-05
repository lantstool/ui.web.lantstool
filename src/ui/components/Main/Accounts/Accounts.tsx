import cn from './Accounts.module.css';
import { useStoreEffect } from "../../../../react-vault";
import { useEffect } from "react";

export const Accounts = () =>  {
  const addAccounts = useStoreEffect((store) => store.accounts.addAccounts);

  // useEffect(() => {
  //   addAccounts();
  // }, []);

  return (
    <div className={cn.container}>
      Accounts
      <div>
        <button type="button" onClick={addAccounts}>Add Accounts</button>
      </div>

    </div>
  );
};
