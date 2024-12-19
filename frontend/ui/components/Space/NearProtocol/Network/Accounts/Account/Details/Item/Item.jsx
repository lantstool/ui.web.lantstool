import cn from './Item.module.scss';

export const Item = ({ icon, title, data }) => (
  <div className={cn.item}>
    <div className={cn.label}>
      {icon && <img src={icon} alt="#" className={cn.icon} />}
      <p className={cn.title}>{title}</p>
    </div>
    <div className={cn.wrapper}>
      <p className={cn.data}>{data}</p>
    </div>
  </div>
);
