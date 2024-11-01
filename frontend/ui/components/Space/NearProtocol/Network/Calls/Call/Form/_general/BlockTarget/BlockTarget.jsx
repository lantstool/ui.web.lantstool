import { useWatch } from 'react-hook-form';
import { Dropdown } from '../../../../../../../../_general/Dropdown/Dropdown.jsx';
import { RadioButton } from '../../../../../../../../_general/RadioButton/RadioButton.jsx';
import { Input } from '../../../../../../../../_general/Input/Input.jsx';
import cn from './BlockTarget.module.scss';

const finalityOptions = [
  { label: 'Final', value: 'final' },
  { label: 'Near Final', value: 'near-final' },
  { label: 'Optimistic', value: 'optimistic' },
];

export const BlockTarget = ({ form }) => {
  const { control, register } = form;

  const blockTarget = useWatch({ control, name: 'params.blockTarget' });

  return (
    <>
      <div className={cn.radioButtons}>
        <p>Block Target :</p>
        <RadioButton register={register} label="Latest" name="params.blockTarget" value="latest" />
        <RadioButton
          register={register}
          label="Specific"
          name="params.blockTarget"
          value="specific"
        />
      </div>
      {blockTarget === 'latest' && (
        <Dropdown
          name="params.finality"
          label="Finality"
          control={control}
          options={finalityOptions}
        />
      )}
      {blockTarget === 'specific' && (
        <Input name="params.blockId" register={register} control={control} label="Block Id" />
      )}
    </>
  );
};
