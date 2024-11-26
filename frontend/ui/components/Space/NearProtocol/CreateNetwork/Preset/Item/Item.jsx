import { useWatch } from 'react-hook-form';
import { NetworkOutline } from '../../../../../_general/icons/NetworkOutline.jsx';
import { Label } from '../../../../../_general/Label/Label.jsx';
import { RadioButton } from '../../../../../_general/RadioButton/RadioButton.jsx';
import cn from './Item.module.scss';

export const Item = ({ presetId, form }) => {
  const selected = useWatch({ control: form.control, name: 'presetId' });

  const selectPreset = () => form.setValue('presetId', presetId);

  return (
    <div className={cn.item} onClick={selectPreset}>
      <Label Icon={NetworkOutline} color={selected === presetId ? 'green' : 'grey'}>
        {presetId}
      </Label>
      <RadioButton register={form.register} name="presetId" value={presetId} />
    </div>
  );
};
