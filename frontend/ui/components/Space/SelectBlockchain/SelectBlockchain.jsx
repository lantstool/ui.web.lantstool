import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { BackButton } from '../../_general/BackButton/BackButton.jsx';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SelectBlockchainForm } from '../../_general/SelectBlockchainForm/SelectBlockchainForm.jsx';
import cn from './SelectBlockchain.module.scss';

export const SelectBlockchain = () => {
  const navigate = useNavigate();
  const { register } = useForm({ defaultValues: { near: '' } });

  useSaveToHistory();

  const handleClick = () => {
    navigate('../near-protocol/networks');
  };

  return (
    <div className={cn.selectBlockchain}>
      <BackButton />
      <SelectBlockchainForm register={register} btnText="Select Blockchain" onClick={handleClick} />
    </div>
  );
};
