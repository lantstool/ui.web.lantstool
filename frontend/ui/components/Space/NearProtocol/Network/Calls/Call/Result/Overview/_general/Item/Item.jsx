import { Label } from '../../../../../../../../../_general/Label/Label.jsx';
import cn from './Item.module.scss';

export const Item = ({ icon, title, data = null, methods = null }) => (
  <div className={cn.item}>
    <div className={cn.label}>
      {icon && <img src={icon} alt="#" className={cn.icon} />}
      <p className={cn.title}>{title}</p>
    </div>
    <div>
      {data && <p className={cn.data}>{data}</p>}

      <div className={cn.methods}>
        {methods?.length === 0 ? (
          <p className={cn.data}>All</p>
        ) : (
          methods?.map((method, index) => (
            <Label key={index} color="grey">
              {method}
            </Label>
          ))
        )}
      </div>
    </div>
  </div>
);
