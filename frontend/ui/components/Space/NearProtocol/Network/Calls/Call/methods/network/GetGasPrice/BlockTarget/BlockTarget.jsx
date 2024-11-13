import { useWatch } from 'react-hook-form';
import { RadioButton } from '../../../../../../../../../_general/RadioButton/RadioButton.jsx';
import { Input } from '../../../../../../../../../_general/Input/Input.jsx';
import cn from './BlockTarget.module.scss';

export const BlockTarget = ({ form }) => {
  const { control, register } = form;

  const blockTarget = useWatch({ control, name: 'blockTarget' });

  return (
    <>
      <div className={cn.radioButtons}>
        <p>Block Target :</p>
        <RadioButton register={register} label="Latest" name="blockTarget" value="latest" />
        <RadioButton register={register} label="Specific" name="blockTarget" value="specific" />
      </div>
      {blockTarget === 'specific' && <Input name="blockId" control={control} label="Block Id" />}
    </>
  );
};
