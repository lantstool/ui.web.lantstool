import cn from './Button.module.css';
import cnm from 'classnames';

const types = {
  primary: cn.primary,
  secondary: cn.secondary,
};

const getType = (style: any) => {
  return types[style] === undefined ? types['primary'] : types[style];
};

export const Button = ({ text, onClick, src, style, type }: any) => {
  const classColor = getType(style);

  return (
    <button type={type} className={cnm(cn.button, classColor)} onClick={onClick}>
      {src && <img className={cn.icon} src={src} alt="#" />}
      <p className={cn.text}>{text}</p>
    </button>
  );
};
