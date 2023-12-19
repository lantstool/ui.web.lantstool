import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const ImportType = ({ closeModal, setStep }: any) => {
  const onPrevStep = () => setStep('signTx');
  const onSeedPhrase = () => setStep('seedPhrase');
  const onPrivateKey = () => setStep('privateKey');

  return (
    <>
      <div>
        <button onClick={onPrevStep}>
          <ArrowBackRoundedIcon />
        </button>
        <button onClick={closeModal}>
          <CloseRoundedIcon />
        </button>
      </div>

      <h2>How do you want to import your private key?</h2>
      <button onClick={onSeedPhrase}>I have seed phrase</button>
      <button onClick={onPrivateKey}>I have private key</button>
    </>
  );
};
