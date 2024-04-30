import cn from './Item.module.css';

export const Item = ({ text, onClick }) => (
  <button onClick={onClick} className={cn.button} type="button">
    <p className={cn.text}>{text}</p>
  </button>
);
