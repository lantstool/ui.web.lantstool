import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export const SignTx = ({ closeModal, form, setStep }: any) => {
  const { setValue } = form;

  const onImportType = () => {
    setStep('importType');
  };
  const onExtraService = () => setValue('step', 'extraService');

  return (
    <>
      <div>
        <button onClick={closeModal}>
          <CloseRoundedIcon />
        </button>
      </div>

      <h2>Where do you like to sign your transactions?</h2>
      <button onClick={onImportType}>Locally, without extra steps</button>
      <button onClick={onExtraService}>On external service</button>
    </>
  );
};
