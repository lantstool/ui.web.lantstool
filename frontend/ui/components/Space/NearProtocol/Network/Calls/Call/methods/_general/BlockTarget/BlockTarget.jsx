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

  const blockTarget = useWatch({ control, name: 'blockTarget' });

  return (
    <>
      <div className={cn.radioButtons}>
        <p>Block Target :</p>
        <RadioButton register={register} label="Latest" name="blockTarget" value="latest" />
        <RadioButton
          register={register}
          label="Specific"
          name="blockTarget"
          value="specific"
        />
      </div>
      {blockTarget === 'latest' && (
        <Dropdown
          name="finality"
          label="Finality"
          control={control}
          options={finalityOptions}
        />
      )}
      {blockTarget === 'specific' && (
        <Input name="blockId" control={control} label="Block Id" />
      )}
    </>
  );
};
