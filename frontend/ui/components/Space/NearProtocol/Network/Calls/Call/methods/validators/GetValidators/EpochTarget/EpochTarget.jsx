import { useWatch } from 'react-hook-form';
import { RadioButton } from '../../../../../../../../../_general/RadioButton/RadioButton.jsx';
import { Input } from '../../../../../../../../../_general/Input/Input.jsx';
import cn from './EpochTarget.module.scss';

export const EpochTarget = ({ form }) => {
  const { control, register } = form;
  const epochTarget = useWatch({ control, name: 'epochTarget' });

  return (
    <>
      <div className={cn.radioButtons}>
        <p>Epoch Target:</p>
        <RadioButton register={register} label="Latest" name="epochTarget" value="latest" />
        <RadioButton register={register} label="Specific" name="epochTarget" value="specific" />
      </div>
      {epochTarget === 'specific' && <Input name="epochId" control={control} label="Epoch Id" />}
    </>
  );
};
