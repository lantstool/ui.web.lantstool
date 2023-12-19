import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';
import { useStoreEffect } from '../../../../../../../react-vault';
import { KeyPair } from 'near-api-js';

export const PrivateKey = ({ closeModal, form, setStep, accountId, ref1, ref2 }: any) => {
  const onAddKey = useStoreEffect((store: any) => store.vault.onAddKey);
  const {
    register,
    formState: { errors },
    clearErrors,
    resetField,
    setValue,
    handleSubmit,
  } = form;

  const onPrevStep = (e: any) => {
    e.preventDefault();
    clearErrors('privateKey');
    resetField('privateKey');
    setStep('importType');
  };
  const onSubmit = (data: any) => {
    const pk = KeyPair.fromString(data.privateKey).getPublicKey().toString();
    setValue('type', 'privateKey');
    setValue('publicKey', pk);
    onAddKey({ data, accountId });
  };
  const onClick = () => {
    clearTimeout(ref1.current);
    ref1.current = 0;
    clearTimeout(ref2.current);
    ref2.current = 0;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <button onClick={(e) => onPrevStep(e)}>
            <ArrowBackRoundedIcon />
          </button>
          <button onClick={closeModal}>
            <CloseRoundedIcon />
          </button>
        </div>
        <h2>Type your private key. Be sure this private key matches the public key.</h2>
        <InputGroup register={register} name="privateKey" label="Private key" />
        {errors?.privateKey && <p>{errors?.privateKey?.message}</p>}
        <button type="submit" onClick={onClick}>
          Add key
        </button>
      </form>
    </>
  );
};
