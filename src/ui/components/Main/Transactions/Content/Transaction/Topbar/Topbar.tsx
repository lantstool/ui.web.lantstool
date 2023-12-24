import cn from './Topbar.module.css';
import { useStoreEffect } from "../../../../../../../react-vault";
import { useNavigate } from "react-router-dom";

export const Topbar = ({ form }: any) => {
  const onDeleteTransaction = useStoreEffect(
    (store: any) => store.transactions.onDeleteTransaction,
  );
  const navigate = useNavigate();

  const { getValues } = form;
  const { name, transactionId } = getValues();

  const deleteTx = () => onDeleteTransaction({ transactionId, navigate });

  return (
    <div className={cn.topbar}>
      <h1 className={cn.name}>{name}</h1>
      <button type="button" onClick={deleteTx} className={cn.delete}>
        Delete
      </button>
    </div>
  );
};
