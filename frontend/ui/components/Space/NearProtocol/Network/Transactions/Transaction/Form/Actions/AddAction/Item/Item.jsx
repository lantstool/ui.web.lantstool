import cnm from 'classnames';
import cn from './Item.module.scss';

export const Item = ({ color, iconStyles, text, onClick, disabled = false }) => (
  <button className={cn[color]} onClick={onClick} disabled={disabled} type="button">
    <span className={cnm(iconStyles, cn.icon)} />
    {text}
  </button>
);
