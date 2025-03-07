import cnm from 'classnames';
import cn from './Item.module.scss';

export const Item = ({ currentDecimals, decimals, setDecimals, label }) => {
  const onClick = () => setDecimals(decimals);
  const isActive = currentDecimals === decimals;

  return (
    <button onClick={onClick} className={cnm(cn.button, isActive && cn.active)}>
      {label}
    </button>
  );
};
