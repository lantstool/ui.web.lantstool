import cn from './TextareaGroup.module.css';
import { TextareaDPR } from '../TextareaDPR/TextareaDPR.jsx';

export const TextareaGroup = ({ name, register, disabled, cols, rows, errors = false, label }) => (
  <div className={cn.inputGroup}>
    <label className={cn.label} htmlFor={name}>
      {label}
    </label>
    <TextareaDPR
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
