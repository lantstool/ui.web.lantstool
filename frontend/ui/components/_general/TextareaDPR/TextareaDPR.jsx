import cnm from 'classnames';
import cn from './TextareaDPR.module.css';

export const TextareaDPR = ({ register, name, id, placeholder, cols, rows, disabled, errors }) => (
  <textarea
    {...register(name)}
    id={id || name}
    placeholder={placeholder}
    cols={cols}
    rows={rows}
    className={cnm(!errors ? cn.textarea : `${cn.textarea} ${cn.errors}`)}
    disabled={disabled}
  />
);
