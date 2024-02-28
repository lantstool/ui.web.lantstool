import { CopyButton } from '../../../../general/CopyButton/CopyButton.tsx';
import { Label } from './Label/Label.tsx';
import cn from './Item.module.css';
import { NavLink, useParams } from 'react-router-dom';

const formatPublicKey = (key: any) => {
  return key.replace(/\bed25519:\b/g, '');
};

export const Item = ({ data }: any) => {
  const { currentNetworkId } = useParams();
  const publicKey = formatPublicKey(data.publicKey);

  return (
    <div className={cn.container}>
      <NavLink className={cn.link} to={`/${currentNetworkId}/keys/${data.publicKey}`}>
        <p className={cn.key}>{publicKey}</p>
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
