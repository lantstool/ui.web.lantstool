import cn from './Item.module.css';

export const Item = ({ text, onClick, disabled = false }) => (
  <button onClick={onClick} className={cn.button} disabled={disabled} type="button">
    <p className={cn.text}>{text}</p>
  </button>
);
