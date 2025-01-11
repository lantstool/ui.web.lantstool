import { useWatch } from 'react-hook-form';
import { FormDropdown } from '../../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { FormRadioButton } from '../../../../../../../../../_general/FormRadioButton/FormRadioButton.jsx';
import { FormInput } from '../../../../../../../../../_general/input/FormInput/FormInput.jsx';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { config } from '../../config.js';
import cn from './BlockTarget.module.scss';

const { finality } = config;
const finalityOptions = [finality.final, finality['near-final'], finality.optimistic];

export const BlockTarget = ({ form }) => {
  const {
    control,
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
          <FormRadioButton control={control} label="Latest" name="blockTarget" value="latest" />
          <FormRadioButton control={control} label="Specific" name="blockTarget" value="specific" />
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
          <FormInput
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
