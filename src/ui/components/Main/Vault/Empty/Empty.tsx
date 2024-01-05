import cn from "../../Transactions/Empty/Empty.module.css";
import { AddAccount } from "../general/AddAccount/AddAccount.tsx";

export const Empty = (list:any) => {
  return (
    <div className={cn.empty}>
      <div>
        <AddAccount list={list} styles={cn.modalContainer}/>
      </div>
    </div>
  );
}