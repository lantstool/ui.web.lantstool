import cn from './Textarea.module.css';
import cnm from 'classnames';

export const Textarea = ({ register, name, id, placeholder, cols, rows, disabled, errors }) => (
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
