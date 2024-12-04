import { useWatch } from 'react-hook-form';
import { FormDropdown } from '../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { RadioButton } from '../../../../../../../../_general/RadioButton/RadioButton.jsx';
import { Input } from '../../../../../../../../_general/Input/Input.jsx';
import { InfoCircleLinear } from '../../../../../../../../_general/icons/InfoCircleLinear.jsx';
import { Tooltip } from '../../../../../../../../_general/Tooltip/Tooltip.jsx';
import cn from './BlockTarget.module.scss';

const finalityOptions = [
  { label: 'Final', value: 'final' },
  { label: 'Near Final', value: 'near-final' },
  { label: 'Optimistic', value: 'optimistic' },
];

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
          <p className={cn.tooltipText}>Block Target </p>
          <Tooltip style={cn.tooltip} content="Block traget" placement="top">
            <InfoCircleLinear />
          </Tooltip>
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
            tooltip={
              <Tooltip style={cn.tooltip} content="Last block" placement="top">
                <InfoCircleLinear />
              </Tooltip>
            }
            dynamicErrorSpace
          />
        )}
        {blockTarget === 'specific' && (
          <Input
            name="blockId"
            control={control}
            label="Block Id"
            tooltip={
              <Tooltip style={cn.tooltip} content="Block id" placement="top">
                <InfoCircleLinear />
              </Tooltip>
            }
            error={errors?.blockId?.message}
            dynamicErrorSpace
          />
        )}
      </div>
    </>
  );
};
