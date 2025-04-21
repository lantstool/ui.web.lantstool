import { FormRadioButton } from '@gc/FormRadioButton/FormRadioButton.jsx';
import cn from './ModeOption.module.scss';

export const ModeOption = ({ form, value, title, description }) => {
  return (
    <label className={cn.modeOption} htmlFor={`mode-${value}`}>
      <FormRadioButton
        control={form.control}
        name="mode"
        value={value}
      />
      <div className={cn.texts}>
        <h3 className={cn.title}>{title}</h3>
        <p className={cn.description}>{description}</p>
      </div>
    </label>
  );
};
