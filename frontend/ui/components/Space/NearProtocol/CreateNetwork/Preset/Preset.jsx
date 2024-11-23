import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useForm } from 'react-hook-form';
import { Item } from './Item/Item.jsx';
import { Button } from '../../../../_general/Button/Button.jsx';
import cn from './Preset.module.scss';

export const Preset = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const createFromPreset = useStoreEffect((store) => store.nearProtocol.networks.createFromPreset);

  const form = useForm({ defaultValues: { presetId: 'testnet' } });
  const { handleSubmit, setError } = form;

  const onSubmit = handleSubmit((formValues) => {
    createFromPreset({ formValues, spaceId, navigate, setError });
  });

  return (
    <form className={cn.preset}>
      <div className={cn.presetWrapper}>
        <Item presetId="testnet" form={form} />
        <Item presetId="mainnet" form={form} />
      </div>
      <div className={cn.buttonWrapper}>
        <Button onClick={onSubmit}>Create Network</Button>
      </div>
    </form>
  );
};
