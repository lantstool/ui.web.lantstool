import { useState } from 'react';
import { useLoader } from '@hooks/useLoader.js';
import cn from './Key.module.scss';
import { PrivateItem } from './PrivateItem/PrivateItem.jsx';
import { PublicItem } from './PublicItem/PublicItem.jsx';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { TopBar } from './TopBar/TopBar.jsx';

export const Key = () => {
  const { spaceId, networkId, publicKey } = useParams();
  const getKey = useStoreEffect((store) => store.nearProtocol.keys.getKey);
  const [isLoading, key] = useLoader(getKey, { spaceId, networkId, publicKey });

  if (isLoading) return null;

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <TopBar publicKey={publicKey} />
        <div className={cn.body}>
          <h2 className={cn.title}>Key Data</h2>
          <PublicItem text={key.publicKey} label="Public Key" />
          <PrivateItem text={key.privateKey} label="Private Key" />
          {key.seedPhrase && <PrivateItem text={key.seedPhrase} label="Seed Phrase" />}
          {key.derivationPath && <PublicItem text={key.derivationPath} label="Derivation Path" />}
          <div className={cn.walletWrapper}>
            <h4 className={cn.subtitle}>Wallet</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
