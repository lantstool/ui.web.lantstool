import cn from './TextAreaGroup.module.css';
import { TextArea } from '../TextArea/TextArea.tsx';

export const TextAreaGroup = ({
  name,
  register,
  disabled,
  cols,
  rows,
  errors = false,
  label,
}: any) => (
  <div className={cn.inputGroup}>
    <label htmlFor={name}>{label}</label>
    <TextArea
      name={name}
      register={register}
      disabled={disabled}
      cols={cols}
      rows={rows}
      errors={errors}
    />
    <div className={cn.error}>{errors}</div>
  </div>
);
