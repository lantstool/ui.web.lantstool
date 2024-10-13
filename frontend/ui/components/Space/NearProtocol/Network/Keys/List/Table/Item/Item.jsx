import { CopyButton } from '../../../../_general/CopyButton/CopyButton.jsx';
import cn from './Item.module.scss';
import { Link } from 'react-router-dom';

const formatPublicKey = (key) => {
  return key.replace(/\bed25519:\b/g, '');
};

export const Item = ({ keyData }) => {
  const { publicKey } = keyData;
  const formattedPublicKey = formatPublicKey(publicKey);

  return (
    <div className={cn.container}>
      <Link className={cn.link} to={`./${publicKey}`}>
        <p className={cn.key}>{formattedPublicKey}</p>
      </Link>
      <div className={cn.wrapper}>
        <div className={cn.btn}>
          <CopyButton text={publicKey} />
        </div>
      </div>
    </div>
  );
};
