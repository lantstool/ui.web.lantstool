import { useWatch } from 'react-hook-form';
import { FormRadioButton } from '../../../../../../../../../_general/FormRadioButton/FormRadioButton.jsx';
import { FormInput } from '../../../../../../../../../_general/input/FormInput/FormInput.jsx';
import cn from './BlockTarget.module.scss';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';

export const BlockTarget = ({ form }) => {
  const { control } = form;

  const blockTarget = useWatch({ control, name: 'blockTarget' });

  return (
    <>
      <div className={cn.blockTarget}>
        <div className={cn.container}>
          <p className={cn.tooltipText}>Block Target </p>
          <Tooltip content="Block traget" placement="top" defaultContent />
        </div>
        <div className={cn.wrapper}>
          <FormRadioButton control={control} label="Latest" name="blockTarget" value="latest" />
          <FormRadioButton control={control} label="Specific" name="blockTarget" value="specific" />
        </div>
        {blockTarget === 'specific' && (
          <div className={cn.content}>
            <FormInput
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
