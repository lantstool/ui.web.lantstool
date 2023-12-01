import cn from "../../Transactions/Empty/Empty.module.css";
import { AddAccount } from "../Sidebar/AddAccount/AddAccount.tsx";

export const Empty = (list:any) => {
  return (
    <div className={cn.empty}>
      <div>
        <AddAccount list={list}/>
      </div>
    </div>
  );
}