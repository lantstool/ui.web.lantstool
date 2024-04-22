import cn from './Item.module.css';

export const Item = ({ el, onClick, disabled = false }) => (
  <button onClick={onClick} className={cn.button} type="button" disabled={disabled}>
    <p className={cn.text}>{el.text}</p>
  </button>
);
