import { Button } from '../../../general/Button/Button.tsx';
import addIcon from '../../../../../assets/addIcon.svg';
import { useStoreEffect } from '../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';

export const AddTransaction = () => {
  const onAddTransaction = useStoreEffect((store: any) => store.transactions.onAddTransaction);
  const navigate = useNavigate();

  const onSubmit = () => {
    onAddTransaction(navigate);
  };

  return <Button text="Create Transaction" onClick={onSubmit} src={addIcon} type="submit" />;
};
