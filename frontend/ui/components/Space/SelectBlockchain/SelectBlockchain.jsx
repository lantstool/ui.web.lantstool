import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { BackButton } from '../../_general/BackButton/BackButton.jsx';
import { FormRadioButton } from '../../_general/FormRadioButton/FormRadioButton.jsx';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SelectBlockchainForm } from '../../_general/SelectBlockchainForm/SelectBlockchainForm.jsx';
import cn from './SelectBlockchain.module.scss';

export const SelectBlockchain = () => {
  const navigate = useNavigate();
  const { control } = useForm({ defaultValues: { blockchain: 'near-protocol' } });

  useSaveToHistory();

  const handleClick = () => {
    navigate('../near-protocol/networks');
  };

  return (
    <div className={cn.selectBlockchain}>
      <BackButton />
      <SelectBlockchainForm control={control} btnText="Select Blockchain" onClick={handleClick} />
    </div>
  );
};
