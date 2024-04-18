import cn from './Item.module.css';

export const Item = ({ el, onClick }) => (
  <button onClick={onClick} className={cn.button} type="button">
    <p className={cn.text}>{el.text}</p>
  </button>
);
