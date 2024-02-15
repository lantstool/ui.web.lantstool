import cn from './ImportKeyModal.module.css';
import { ModalGroup } from './general/ModalGroup/ModalGroup.tsx';
import seedPhrase from '../../../../../assets/seedPhrase.svg';
import privateKey from '../../../../../assets/privateKey.svg';
import file from '../../../../../assets/file.svg';
import ledger from '../../../../../assets/ledger.svg';
import myNearWallet from '../../../../../assets/myNearWallet.svg';
import cnm from 'classnames';

export const ImportKeyModal = ({ isOpen, close }) => {
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
          <div className={cn.imgContainer}>
            <img className={cn.img} src={seedPhrase} alt="#" />
            <p className={cn.subtitle}>Seed Phrase</p>
          </div>
          <div className={cn.imgContainer}>
            <img className={cn.img} src={privateKey} alt="#" />
            <p className={cn.subtitle}>Private Key</p>
          </div>
          <div className={cnm(cn.imgContainer, cn.comingSoon)}>
            <img className={cn.img} src={file} alt="#" />
            <p className={cn.subtitle}>File</p>
          </div>
        </div>
        <h2 className={cn.groupTitle}>Connect wallet</h2>
        <div className={cn.importContainer}>
          <div className={cnm(cn.imgContainer, cn.comingSoon)}>
            <img className={cn.img} src={ledger} alt="#" />
            <p className={cn.subtitle}>Ledger</p>
          </div>
          <div className={cnm(cn.imgContainer, cn.comingSoon)}>
            <img className={cn.img} src={myNearWallet} alt="#" />
            <p className={cn.subtitle}>MyNearWallet</p>
          </div>
        </div>
      </div>
    </ModalGroup>
  );
};
