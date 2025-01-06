import { useWatch } from 'react-hook-form';
import { Label } from '../../../Label/Label.jsx';
import { RadioButton } from '../../../RadioButton/RadioButton.jsx';
import cn from './Item.module.scss';

export const Item = ({ presetId, form }) => {
  const selected = useWatch({ control: form.control, name: 'presetId' });

  const selectPreset = () => form.setValue('presetId', presetId);

  return (
    <div className={cn.item} onClick={selectPreset}>
      <Label iconStyles={cn.networkIcon} color={selected === presetId ? 'green' : 'grey'}>
        {presetId}
      </Label>
      <RadioButton register={form.register} name="presetId" value={presetId} />
    </div>
  );
};
