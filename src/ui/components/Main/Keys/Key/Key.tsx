import cn from './Key.module.css';
import { PrivateItem } from './PrivateItem/PrivateItem.tsx';
import { PublicItem } from './PublicItem/PublicItem.tsx';
import { useParams } from 'react-router-dom';
import { useStoreState } from '../../../../../react-vault';
import { TopBar } from './TopBar/TopBar.tsx';

const types = {
  lantstool: 'nonCustodial',
  ledger: 'nonCustodial',
  myNearWallet: 'nonCustodial',
  customWallet: 'custodial',
};

const getType = (type: any) => {
  return types[type] === undefined ? types['lantstool'] : types[type];
};

export const Key = () => {
  const records: any = useStoreState((store: any) => store.keys.records);
  const { key, currentNetworkId } = useParams();
  const data = records[key];
  const walletType = getType(data.wallet) === 'nonCustodial' ? 'Non-Custodial' : 'Custodial';

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <TopBar networkId={currentNetworkId} data={data} />
        <div className={cn.body}>
          <h2 className={cn.title}>Key Data</h2>
          <PublicItem text={data.publicKey} label="Public Key" />
          <PrivateItem text={data.privateKey} label="Private Key" />
          {data.seedPhrase && <PrivateItem text={data.seedPhrase} label="Seed Phrase" />}
          {data.derivationPath && <PublicItem text={data.derivationPath} label="Derivation Path" />}
          <div className={cn.walletWrapper}>
            <h4 className={cn.subtitle}>Wallet</h4>
            <p className={cn.wallet}>
              {data.wallet} - {walletType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
