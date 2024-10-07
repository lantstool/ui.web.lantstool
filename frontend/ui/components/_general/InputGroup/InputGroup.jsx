import cn from './ImputGroup.module.css';
import { InputDPR } from '../InputDPR/InputDPR.jsx';

export const InputGroup = ({
  register,
  name,
  label,
  disabled,
  textarea,
  cols,
  rows,
  type,
  error,
}) => (
  <div className={cn.inputGroup}>
    <label className={cn.title} htmlFor={name}>
      {label}
    </label>
    <InputDPR
      name={name}
      type={type}
      register={register}
      disabled={disabled}
      textarea={textarea}
      cols={cols}
      rows={rows}
    />
    <div className={cn.error}>{error}</div>
  </div>
);
