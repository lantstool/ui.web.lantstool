import { Link } from 'react-router-dom';
import { CopyButton } from '@gc/CopyButton/CopyButton.jsx';
import { useStoreState } from '@react-vault';
import cn from './KeyList.module.scss';

export const KeyList = () => {
  const ids = useStoreState((store) => store.nearProtocol.keys.ids);

  return (
    <div className={cn.keyList}>
      {ids.map((publicKey) => (
        <Link key={publicKey} className={cn.item} to={`./${publicKey}`}>
          <div className={cn.wrapper}>
            <p className={cn.title}>{publicKey}</p>
          </div>
          <div className={cn.copy}>
            <CopyButton color="secondary" value={publicKey} event="onClick" />
          </div>
        </Link>
      ))}
    </div>
  );
};
