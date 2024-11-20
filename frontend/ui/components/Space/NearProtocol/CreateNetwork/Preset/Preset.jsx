import { Label } from '../../../../_general/Label/Label.jsx';
import { NetworkOutline } from '../../../../_general/icons/NetworkOutline.jsx';
import { RadioButton } from '../../../../_general/RadioButton/RadioButton.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useForm, useWatch } from 'react-hook-form';
import { Button } from '../../../../_general/Button/Button.jsx';
import cn from './Preset.module.scss';

export const Preset = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const createPreset = useStoreEffect((store) => store.nearProtocol.networks.createPreset);
  const form = useForm({ defaultValues: { networkId: 'testnet' } });

  const { handleSubmit, register, control, setError, setValue } = form;

  const networkId = useWatch({ control, name: 'networkId' });

  const onSubmit = (formValues) => {
    createPreset({ formValues, spaceId, navigate, setError });
  };

  const handleClick = (networkId) => setValue('networkId', networkId);

  return (
    <form className={cn.preset} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn.presetWrapper}>
        <div className={cn.container} onClick={() => handleClick('mainnet')}>
          <Label Icon={NetworkOutline} color={networkId === 'mainnet' ? 'green' : 'grey'}>
            mainnet
          </Label>
          <RadioButton register={register} name="networkId" value="mainnet" />
        </div>
        <div className={cn.container} onClick={() => handleClick('testnet')}>
          <Label Icon={NetworkOutline} color={networkId === 'testnet' ? 'green' : 'grey'}>
            testnet
          </Label>
          <RadioButton register={register} name="networkId" value="testnet" />
        </div>
      </div>
      <div className={cn.buttonWrapper}>
        <Button type="submit">Create Network</Button>
      </div>
    </form>
  );
};
