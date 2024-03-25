import cn from './Button.module.css';
import cnm from 'classnames';

const types = {
  primary: { button: cn.primary, btnText: cn.text },
  secondary: { button: cn.secondary, btnText: cn.text },
  outlined: { button: cn.outlined, btnText: cn.textOutlined },
};

const getType = (style: any) => {
  return types[style] === undefined ? types['primary'] : types[style];
};

export const Button = ({ text, onClick, src, style, type = 'button' }: any) => {
  const { button, btnText } = getType(style);

  return (
    <button type={type} className={cnm(cn.button, button)} onClick={onClick}>
      {src && <img className={cn.icon} src={src} alt="#" />}
      <p className={btnText}>{text}</p>
    </button>
  );
};
