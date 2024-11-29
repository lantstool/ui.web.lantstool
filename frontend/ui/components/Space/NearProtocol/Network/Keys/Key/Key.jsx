import { useLoader } from '@hooks/useLoader.js';
import { Link, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { HeadCard } from './HeadCard/HeadCard.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';
import { ArrowLeftOutline } from '../../../../../_general/icons/ArrowLeftOutline.jsx';
import { Item } from './Item/Item.jsx';
import { KeyOutline } from '../../../../../_general/icons/KeyOutline.jsx';
import { PasswordSeedPhraseInputOutline } from '../../../../../_general/icons/PasswordSeedPhraseInputOutline.jsx';
import { LockKeyholeOutline } from '../../../../../_general/icons/LockKeyholeOutline.jsx';
import { RoutingDerivationPathOutline } from '../../../../../_general/icons/RoutingDerivationPathOutline.jsx';
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
        <Button color="tertiary" size="small" IconLeft={ArrowLeftOutline}>
          Back
        </Button>
      </Link>
      <div className={cn.key}>
        <HeadCard keyData={key} />
        <Item Icon={KeyOutline} value={publicKey} label="Public key" isVisible={false} />
        <Item Icon={LockKeyholeOutline} value={privateKey} label="Private key" isVisible={true} />
        {seedPhrase && (
          <Item
            Icon={PasswordSeedPhraseInputOutline}
            value={seedPhrase}
            label="Seed hrase"
            isVisible={true}
          />
        )}
        {derivationPath && (
          <Item
            Icon={RoutingDerivationPathOutline}
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
