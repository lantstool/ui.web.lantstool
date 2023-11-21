import cn from './Account.module.css';
import { Key } from './Key/Key.tsx';

export const Account = ({ map, activeAccId }: any) => {
  return (
    <div className={cn.container}>
      <div className={cn.topBar}>
        <h2 className={cn.title}>{activeAccId}</h2>
        <div className={cn.buttonGroup}>
          <button className={cn.buttonImport}>Import key</button>
          <button className={cn.buttonRemove}>Remove</button>
        </div>
      </div>
      <div className={cn.keyWrapper}>
        {map[activeAccId].map((accountKey: any) => (
          <Key key={accountKey.privateKey} accountKey={accountKey} />
        ))}
      </div>
    </div>
  );
};
