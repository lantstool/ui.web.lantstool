import { useWatch } from 'react-hook-form';
import { FormDropdown } from '../../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { RadioButton } from '../../../../../../../../../_general/RadioButton/RadioButton.jsx';
import { Input } from '../../../../../../../../../_general/input/Input/Input.jsx';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { config } from '../../config.js';
import cn from './BlockTarget.module.scss';

const { finality } = config;
const finalityOptions = [finality.final, finality['near-final'], finality.optimistic];

export const BlockTarget = ({ form }) => {
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const blockTarget = useWatch({ control, name: 'blockTarget' });

  return (
    <>
      <div className={cn.blockTarget}>
        <div className={cn.container}>
          <p className={cn.tooltipText}>Block target </p>
          <Tooltip content="Block traget" placement="top" defaultContent />
        </div>
        <div className={cn.wrapper}>
          <RadioButton register={register} label="Latest" name="blockTarget" value="latest" />
          <RadioButton register={register} label="Specific" name="blockTarget" value="specific" />
        </div>
        {blockTarget === 'latest' && (
          <FormDropdown
            copy={false}
            name="finality"
            label="Finality"
            control={control}
            options={finalityOptions}
            tooltip={<Tooltip content="Last block" placement="top" defaultContent />}
            dynamicErrorSpace
          />
        )}
        {blockTarget === 'specific' && (
          <Input
            name="blockId"
            control={control}
            label="Block Id"
            tooltip={<Tooltip content="Block id" placement="top" defaultContent />}
            error={errors?.blockId?.message}
            dynamicErrorSpace
          />
        )}
      </div>
    </>
  );
};
