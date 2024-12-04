import { useWatch } from 'react-hook-form';
import { RadioButton } from '../../../../../../../../../_general/RadioButton/RadioButton.jsx';
import { Input } from '../../../../../../../../../_general/Input/Input.jsx';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import cn from './EpochTarget.module.scss';

export const EpochTarget = ({ form }) => {
  const { control, register } = form;
  const epochTarget = useWatch({ control, name: 'epochTarget' });

  return (
    <>
      <div className={cn.epochTarget}>
        <div className={cn.container}>
          <p className={cn.tooltipText}>Epoch target </p>
          <Tooltip content="Epoch traget" placement="top" defaultContent />
        </div>
        <div className={cn.wrapper}>
          <RadioButton register={register} label="Latest" name="epochTarget" value="latest" />
          <RadioButton register={register} label="Specific" name="epochTarget" value="specific" />
        </div>
        {epochTarget === 'specific' && (
          <div className={cn.content}>
            <Input
              name="epochId"
              control={control}
              label="Epoch Id"
              tooltip={<Tooltip content="Epoch id" placement="top" defaultContent />}
            />
          </div>
        )}
      </div>
    </>
  );
};
