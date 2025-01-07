import { CreateSpaceForm } from '../../_general/CreateSpaceForm/CreateSpaceForm.jsx';
import { SelectBlockchainForm } from '../../_general/SelectBlockchainForm/SelectBlockchainForm.jsx';
import { CreateNetwork } from './CreateNetwork/CreateNetwork.jsx';
import { useForm } from 'react-hook-form';
import { getRandomBadge } from '../../../../store/helpers/getRandomBadge.js';
import { useNavigate } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.js';
import cnm from 'classnames';
import cn from './GetStartedForm.module.scss';

export const GetStartedForm = ({ step, setStep }) => {
  const steps = ['createSpace', 'selectBlockchain', 'createNetwork'];
  const availablePresets = ['testnet', 'mainnet'];
  const currentStepIndex = steps.indexOf(step);
  const getStarted = useStoreEffect((store) => store.getStarted);
  const navigate = useNavigate();
  const randomBadge = getRandomBadge();

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      //Create space
      badge: randomBadge,
      spaceName: '',
      //Select blockchain
      blockchain: 'near-protocol',
      //Create network
      networkCreateType: 'selectPredefined',
      presetId: availablePresets[0],
      name: '',
      url: '',
      withHeader: false,
      header: null,
    },
  });

  const { handleSubmit, trigger, setValue, setError, watch, control } = form;

  const setNetworkCreateType = (value) => {
    setValue('networkCreateType', value);
  };
  const networkCreateType = watch('networkCreateType');

  const onSubmit = handleSubmit((formValues) => {
    getStarted({ formValues, navigate, setError });
  });

  const nextStep = async (step) => {
    const isValid = await trigger();
    if (isValid) {
      setStep(step);
    }
  };

  const goBack = (step) => {
    setStep(step);
  };

  return (
    <form className={cn.getStarted}>
      {step === 'createSpace' && (
        <CreateSpaceForm
          onClick={() => nextStep('selectBlockchain')}
          form={form}
          btnText="Continue"
        />
      )}
      {step === 'selectBlockchain' && (
        <SelectBlockchainForm
          control={control}
          onClick={() => setStep('createNetwork')}
          btnText="Continue"
          goBack={() => goBack('createSpace')}
        />
      )}
      {step === 'createNetwork' && (
        <CreateNetwork
          availablePresets={availablePresets}
          form={form}
          goBack={() => goBack('selectBlockchain')}
          onSubmit={onSubmit}
          tab={networkCreateType}
          setTab={setNetworkCreateType}
          btnText="Finish setup"
        />
      )}
      <div className={cn.stepper}>
        {steps.map((step, index) => (
          <div key={step} className={cnm(cn.step, currentStepIndex >= index && cn.activeStep)} />
        ))}
      </div>
    </form>
  );
};
