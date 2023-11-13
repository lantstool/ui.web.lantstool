import { useStoreState } from '../../../../react-vault';
import cn from './Vault.module.css';

export const Vault = () => {
  const list = useStoreState((store: any) => store.vault.list);
  const map = useStoreState((store: any) => store.vault.map);

  return (
    <div>
      <h1>Vault</h1>
      {list.map((accountId: any) => (
        <div key={accountId} className={cn.account}>
          <h2>{accountId}</h2>
          {map[accountId].map((key: any) => (
            <div key={key.publicKey} className={cn.key}>
              <p>{key.publicKey}</p>
              <p>{key.seedPhrase}</p>
              <p>{key.privateKey}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
