import { useWatch } from 'react-hook-form';
import { RadioButton } from '../../../../../../../../../_general/RadioButton/RadioButton.jsx';
import { Input } from '../../../../../../../../../_general/Input/Input.jsx';
import cn from './BlockTarget.module.scss';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';

export const BlockTarget = ({ form }) => {
  const { control, register } = form;

  const blockTarget = useWatch({ control, name: 'blockTarget' });

  return (
    <>
      <div className={cn.blockTarget}>
        <div className={cn.container}>
          <p className={cn.tooltipText}>Block Target </p>
          <Tooltip content="Block traget" placement="top" defaultContent />
        </div>
        <div className={cn.wrapper}>
          <RadioButton register={register} label="Latest" name="blockTarget" value="latest" />
          <RadioButton register={register} label="Specific" name="blockTarget" value="specific" />
        </div>
        {blockTarget === 'specific' && (
          <div className={cn.content}>
            <Input
              name="blockId"
              control={control}
              label="Block Id"
              dynamicErrorSpace
              tooltip={<Tooltip content="Block id" placement="top" defaultContent />}
            />
          </div>
        )}
      </div>
    </>
  );
};
