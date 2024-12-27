import { useLoader } from '@hooks/useLoader.js';
import { Link, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { HeadCard } from './HeadCard/HeadCard.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';
import { Item } from './Item/Item.jsx';
import { DangerZone } from './DangerZone/DangerZone.jsx';
import cn from './Key.module.scss';

export const Key = () => {
  const { spaceId, networkId, publicKey } = useParams();
  const getKey = useStoreEffect((store) => store.nearProtocol.keys.getKey);
  const [isLoading, key] = useLoader(getKey, { spaceId, networkId, publicKey });

  if (isLoading) return null;

  const { privateKey, seedPhrase, derivationPath } = key;

  return (
    <>
      <Link className={cn.backBtn} to="..">
        <Button color="tertiary" size="small" iconLeftStyles={cn.icon}>
          Back
        </Button>
      </Link>
      <div className={cn.key}>
        <HeadCard keyData={key} />
        <Item icon={cn.publicKeyIcon} value={publicKey} label="Public key" isVisible={false} />
        <Item icon={cn.privateKeyIcon} value={privateKey} label="Private key" isVisible={true} />
        {seedPhrase && (
          <Item icon={cn.seedPhraseIcon} value={seedPhrase} label="Seed hrase" isVisible={true} />
        )}
        {derivationPath && (
          <Item
            icon={cn.derivationPassIcon}
            value={derivationPath}
            label="Derivation path"
            isVisible={false}
            isCopy={false}
          />
        )}
        <DangerZone />
      </div>
    </>
  );
};
