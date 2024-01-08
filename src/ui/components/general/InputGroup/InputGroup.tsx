import cn from './ImputGroup.module.css';
import { Input } from '../Input/Input.tsx';

export const InputGroup = ({ register, name, label, disabled, textarea, cols, rows, type }: any) => (
  <div className={cn.inputGroup}>
    <label htmlFor={name}>{label}</label>
    <Input
      name={name}
      type={type}
      register={register}
      disabled={disabled}
      textarea={textarea}
      cols={cols}
      rows={rows}
    />
  </div>
);
