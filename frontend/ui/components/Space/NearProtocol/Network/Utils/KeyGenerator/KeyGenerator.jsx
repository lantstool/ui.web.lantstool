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

  useLoader(onMountKeyGenerator, { spaceId, networkId }, [spaceId, networkId]);
  const values = get(keyGenerator, [spaceId, networkId]);

  if (!values) return null;

  const generate = () => generateKey({ spaceId, networkId });

  return (
    <div className={cn.seedPhraseGenerator}>
      <Item icon={cn.publicKeyIcon} value={values.publicKey} label="Public key" isVisible={false} />
      <Item
        icon={cn.privateKeyIcon}
        value={values.privateKey}
        label="Private key"
        isVisible={true}
      />
      <Item
        icon={cn.seedPhraseIcon}
        value={values.seedPhrase}
        label="Seed Phrase"
        isVisible={true}
      />
      <Item
        icon={cn.implicitAccountIcon}
        value={values.implicitAccount}
        label="Implicit Account"
        isVisible={false}
      />
      <Item
        icon={cn.derivationPathIcon}
        value={values.derivationPath}
        label="Derivation path"
        isVisible={false}
        isCopy={false}
      />
      <div className={cn.btnContainer}>
        <Button size="medium" onClick={generate}>
          Generate New Key
        </Button>
      </div>
    </div>
  );
};
