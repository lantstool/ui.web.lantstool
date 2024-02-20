import cn from './TextArea.module.css';
import cnm from "classnames";


type Props = {
  register?: any;
  id?: string;
  name: string;
  placeholder?: string;
  cols?: number;
  rows?: number;
  disabled?: boolean;
  errors?: any;
};

export const TextArea = ({
  register,
  name,
  id,
  placeholder,
  cols,
  rows,
  disabled,
  errors,
}: Props) => (
  <textarea
    {...register(name)}
    id={id || name}
    placeholder={placeholder}
    cols={cols}
    rows={rows}
    className={cnm(!errors? cn.textarea:`${ cn.textarea} ${ cn.errors}`)}
    disabled={disabled}
  />
);
