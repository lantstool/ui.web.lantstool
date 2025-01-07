import { Item } from './Item/Item.jsx';
import { Button } from '../../Button/Button.jsx';
import cn from './PresetForm.module.scss';

export const PresetForm = ({ btnText, availablePresets, onSubmit, form, goBack }) => (
  <>
    <div className={cn.presetWrapper}>
      {availablePresets.map((presetId) => (
        <Item key={presetId} presetId={presetId} form={form} />
      ))}
    </div>
    <div className={cn.buttonWrapper}>
      {goBack && (
        <Button color="secondary" onClick={goBack} iconLeftStyles={cn.backIcon}>
          Back
        </Button>
      )}
      <Button onClick={onSubmit}>{btnText}</Button>
    </div>
  </>
);
