import { CopyButton } from '../../../general/CopyButton/CopyButton.tsx';
import { Label } from './Label/Label.tsx';
import cn from './Item.module.css';
import { NavLink, useParams } from 'react-router-dom';

export const Item = ({ data }: any) => {
  const { currentNetworkId } = useParams();

  return (
    <div className={cn.container}>
      <NavLink className={cn.link} to={`/${currentNetworkId}/keys/${data.publicKey}`}>
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
