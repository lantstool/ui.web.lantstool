import { useWatch } from 'react-hook-form';
import { FormRadioButton } from '../../../../../../../../../_general/FormRadioButton/FormRadioButton.jsx';
import { Input } from '../../../../../../../../../_general/input/Input/Input.jsx';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import cn from './EpochTarget.module.scss';

export const EpochTarget = ({ form }) => {
  const { control } = form;
  const epochTarget = useWatch({ control, name: 'epochTarget' });

  return (
    <>
      <div className={cn.epochTarget}>
        <div className={cn.container}>
          <p className={cn.tooltipText}>Epoch target </p>
          <Tooltip content="Epoch traget" placement="top" defaultContent />
        </div>
        <div className={cn.wrapper}>
          <FormRadioButton control={control} label="Latest" name="epochTarget" value="latest" />
          <FormRadioButton control={control} label="Specific" name="epochTarget" value="specific" />
        </div>
        {epochTarget === 'specific' && (
          <div className={cn.content}>
            <Input
              name="epochId"
              control={control}
              label="Epoch Id"
              dynamicErrorSpace
              tooltip={<Tooltip content="Epoch id" placement="top" defaultContent />}
            />
          </div>
        )}
      </div>
    </>
  );
};
