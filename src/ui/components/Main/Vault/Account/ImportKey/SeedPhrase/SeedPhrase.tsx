// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { parseSeedPhrase } from 'near-seed-phrase';
import cn from './SeedPhrase.module.css';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';
import { useStoreEffect } from '../../../../../../../react-vault';
import { useWatch } from 'react-hook-form';

export const SeedPhrase = ({ closeModal, form, setStep, accountId, ref1, ref2 }: any) => {
  const onAddKey = useStoreEffect((store: any) => store.vault.onAddKey);
  const {
    register,
    control,
    formState: { errors },
    clearErrors,
    resetField,
    handleSubmit,
    setValue,
  } = form;
  const privateKey = useWatch({
    control,
    name: 'privateKey',
  });

  const onPrevStep = () => {
    clearTimeout(ref1.current);
    clearTimeout(ref2.current);
    clearErrors('seedPhrase');
    resetField('seedPhrase');
    setValue('privateKey', null);
    setStep('importType');
  };

  const onSubmit = (data: any) => {
    const sk = parseSeedPhrase(data.seedPhrase).secretKey;
    const pk = parseSeedPhrase(data.seedPhrase).publicKey;
    setValue('type', 'seedPhrase');
    setValue('publicKey', pk);
    setValue('privateKey', sk);
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
          <button onClick={onPrevStep}>
            <ArrowBackRoundedIcon />
          </button>
          <button onClick={closeModal}>
            <CloseRoundedIcon />
          </button>
        </div>
        <h2>Type your seed phrase. Be sure this seed phrase matches the public key.</h2>
        <div>
          <InputGroup register={register} name="seedPhrase" label="Seed phrase" />
          <p className={cn.error}>{errors?.seedPhrase && errors?.seedPhrase?.message}</p>
          <p className={cn.privateKey}>{!errors?.seedPhrase?.message && privateKey}</p>
        </div>
        <button type="submit" onClick={onClick}>
          Add key
        </button>
      </form>
    </>
  );
};
