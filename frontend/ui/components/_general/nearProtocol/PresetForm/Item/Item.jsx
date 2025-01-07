import { useWatch } from 'react-hook-form';
import { Label } from '../../../Label/Label.jsx';
import { FormRadioButton } from '../../../FormRadioButton/FormRadioButton.jsx';
import cn from './Item.module.scss';

export const Item = ({ presetId, form }) => {
  const selected = useWatch({ control: form.control, name: 'presetId' });

  const selectPreset = () => form.setValue('presetId', presetId);

  return (
    <div className={cn.item} onClick={selectPreset}>
      <Label iconStyles={cn.networkIcon} color={selected === presetId ? 'green' : 'grey'}>
        {presetId}
      </Label>
      <FormRadioButton control={form.control} name="presetId" value={presetId} />
    </div>
  );
};
