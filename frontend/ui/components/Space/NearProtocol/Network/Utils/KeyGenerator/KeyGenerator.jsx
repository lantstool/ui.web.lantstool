import { useLoader } from '@hooks/useLoader.js';
import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { useStoreEffect, useStoreState } from '@react-vault';
import get from 'lodash/get';
import { useParams } from 'react-router-dom';
import { Item } from './Item/Item.jsx';
import { Button } from '@gc/Button/Button.jsx';
import cn from './KeyGenerator.module.scss';

export const KeyGenerator = () => {
  const { spaceId, networkId } = useParams();
  const keyGenerator = useStoreState((store) => store.nearProtocol.utils.keyGenerator);
  const generateKey = useStoreEffect((store) => store.nearProtocol.utils.generateKey);
  const onMountKeyGenerator = useStoreEffect(
    (store) => store.nearProtocol.utils.onMountKeyGenerator,
  );

  useSaveToHistory();

  const [isLoading] = useLoader(onMountKeyGenerator, { spaceId, networkId }, [spaceId, networkId]);
  if (isLoading) return null;

  const { publicKey, privateKey, seedPhrase, derivationPath, implicitAccount } = get(keyGenerator, [
    spaceId,
    networkId,
  ]);

  const generate = () => generateKey({ spaceId, networkId });

  return (
    <div className={cn.seedPhraseGenerator}>
      <Item icon={cn.publicKeyIcon} value={publicKey} label="Public key" isVisible={false} />
      <Item icon={cn.privateKeyIcon} value={privateKey} label="Private key" isVisible={true} />
      <Item icon={cn.seedPhraseIcon} value={seedPhrase} label="Seed Phrase" isVisible={true} />
      <Item
        icon={cn.implicitAccountIcon}
        value={implicitAccount}
        label="Implicit Account"
        isVisible={false}
      />
      <Item
        icon={cn.derivationPathIcon}
        value={derivationPath}
        label="Derivation path"
        isVisible={false}
        isCopy={false}
      />
      <div className={cn.btnContainer}>
        <Button iconLeftStyles={cn.magicStickOutline} onClick={generate}>
          Generate Key
        </Button>
      </div>
    </div>
  );
};
