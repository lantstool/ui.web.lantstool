import { useStoreEffect, useStoreState } from '@react-vault';
import { useEffect } from 'react';
import { Item } from './Item/Item.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';
import cn from './KeyGenerator.module.scss';

export const KeyGenerator = () => {
  const generatedKey = useStoreState((store) => store.nearProtocol.utils.generatedKey);
  const generateKey = useStoreEffect((store) => store.nearProtocol.utils.generateKey);
  const onMountKeyGenerator = useStoreEffect(
    (store) => store.nearProtocol.utils.onMountKeyGenerator,
  );
  const { publicKey, privateKey, seedPhrase, derivationPath, implicitAccount } = generatedKey;

  useEffect(() => {
    onMountKeyGenerator();
  }, []);

  return (
    <div className={cn.seedPhraseGenerator}>
      <Item icon={cn.publicKeyIcon} value={publicKey} label="Public key" isVisible={false} />
      <Item icon={cn.privateKeyIcon} value={privateKey} label="Private key" isVisible={true} />
      <Item icon={cn.seedPhraseIcon} value={seedPhrase} label="Seed hrase" isVisible={true} />
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
        <Button iconLeftStyles={cn.magicStickOutline} onClick={generateKey}>
          Generate Key
        </Button>
      </div>
    </div>
  );
};
