import { CopyButton } from '../../../general/CopyButton/CopyButton.tsx';
import { Label } from './Label/Label.tsx';
import cn from './Item.module.css';
import { NavLink } from 'react-router-dom';

export const Item = ({ data }: any) => {
  return (
    <div className={cn.container}>
      <NavLink to={data.publicKey}>
        <p className={cn.key}>{data.publicKey}</p>
      </NavLink>
      <div className={cn.wrapper}>
        <Label wallet={data.wallet} />
        <div className={cn.btn}>
          <CopyButton text={data.publicKey} />
        </div>
      </div>
    </div>
  );
};
