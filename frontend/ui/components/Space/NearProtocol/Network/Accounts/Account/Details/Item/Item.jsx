import cn from './Item.module.css';
import { CopyButton } from '../../../../general/CopyButton/CopyButton.jsx';

export const Item = ({ title, data, copy = null }) => (
  <div className={cn.item}>
    <p className={cn.title}>{title}</p>
    <div className={cn.wrapper}>
      <p className={cn.data}>{data}</p>
      {copy && <CopyButton text={data} />}
    </div>
  </div>
);
