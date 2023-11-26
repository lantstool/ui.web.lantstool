import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { AccessKey } from './AccessKey/AccessKey.tsx';
import cn from './Metadata.module.css';
import { useStoreEffect } from '../../../../../../react-vault';
import { useNavigate } from "react-router-dom";

export const Metadata = ({ form }: any) => {
  const onDeleteTransaction = useStoreEffect(
    (store: any) => store.transactions.onDeleteTransaction,
  );
  const navigate = useNavigate();

  const { register, getValues } = form;
  const { name, transactionId } = getValues();

  const deleteTx = () => onDeleteTransaction({ transactionId, navigate });

  return (
    <div>
      <div className={cn.topbar}>
        <h2>{name}</h2>
        <button type="button" onClick={deleteTx}>
          Delete
        </button>
      </div>
      <h3>From</h3>
      <InputGroup register={register} name="signer.accountId" label="Signer Id" />
      <AccessKey form={form} />
    </div>
  );
};
