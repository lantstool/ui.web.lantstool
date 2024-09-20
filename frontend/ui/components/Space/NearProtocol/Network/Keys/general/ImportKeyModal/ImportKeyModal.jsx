import cn from './ImportKeyModal.module.css';
import { ModalGroup } from '../../../../../../_general/ModalGroup/ModalGroup.jsx';
import { IconGroup } from './IconGroup/IconGroup.jsx';
import seedPhrase from '../../../../../../../assets/seedPhrase.svg';
import privateKey from '../../../../../../../assets/privateKey.svg';
import file from '../../../../../../../assets/file.svg';
import ledger from '../../../../../../../assets/ledger.svg';
import myNearWallet from '../../../../../../../assets/myNearWallet.svg';
import cnm from 'classnames';

export const ImportKeyModal = ({ isOpen, close, setStep }) => {
  const toSeedPhrase = () => setStep('seedPhrase');
  const toPrivateKey = () => setStep('privateKey');

  return (
    <ModalGroup isOpen={isOpen} closeModal={close} text={'Import Key'}>
      <div className={cn.container}>
        <h4 className={cn.title}>
          You can import your access key locally or connect external wallet for transaction signing.
          It could be an any valid ed25519 key, even if it’s not attached to any account at this
          moment.
        </h4>
        <h2 className={cn.groupTitle}>Import locally</h2>
        <div className={cn.importContainer}>
          <IconGroup
            styles={cn.imgContainer}
            src={seedPhrase}
            text="Seed Phrase"
            selectStep={toSeedPhrase}
          />
          <IconGroup
            styles={cn.imgContainer}
            src={privateKey}
            text="Private Key"
            selectStep={toPrivateKey}
          />
          <IconGroup
            styles={cnm(cn.imgContainer, cn.disabled)}
            src={file}
            text="File"
            comingSoon={true}
          />
        </div>
        <h2 className={cn.groupTitle}>Connect wallet</h2>
        <div className={cn.importContainer}>
          <IconGroup
            styles={cnm(cn.imgContainer, cn.disabled)}
            src={ledger}
            text="Ledger"
            comingSoon={true}
          />
          <IconGroup
            styles={cnm(cn.imgContainer, cn.disabled)}
            src={myNearWallet}
            text="MyNearWallet"
            comingSoon={true}
          />
        </div>
      </div>
    </ModalGroup>
  );
};
