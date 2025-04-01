import { CopyButton } from '@gc/CopyButton/CopyButton.jsx';
import cn from './ReadOnlyInput.module.scss';

export const ReadOnlyInput = ({ value, isCopyable = true, label, tooltip }) => {
  return (
    <div className={cn.container}>
      {label && (
        <div className={cn.labelWrapper}>
          <label className={cn.label}>{label}</label>
          {tooltip}
        </div>
      )}
      <div className={cn.inputWrapper}>
        <input value={value} className={cn.input} type="text" disabled />
        {value && (
          <div className={cn.buttonWrapper}>{isCopyable && <CopyButton value={value} />}</div>
        )}
      </div>
    </div>
  );
};
