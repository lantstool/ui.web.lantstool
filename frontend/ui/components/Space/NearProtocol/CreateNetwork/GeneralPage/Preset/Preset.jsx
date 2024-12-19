import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useForm } from 'react-hook-form';
import { Item } from './Item/Item.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';
import cn from './Preset.module.scss';

export const Preset = ({ availablePresets }) => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const createFromPreset = useStoreEffect((store) => store.nearProtocol.networks.createFromPreset);

  const form = useForm({ defaultValues: { presetId: availablePresets[0] } });
  const { handleSubmit, setError } = form;

  const onSubmit = handleSubmit((formValues) => {
    createFromPreset({ formValues, spaceId, navigate, setError });
  });

  return (
    <>
      <div className={cn.presetWrapper}>
        {availablePresets.map((presetId) => (
          <Item key={presetId} presetId={presetId} form={form} />
        ))}
      </div>
      <div className={cn.buttonWrapper}>
        <Button onClick={onSubmit}>Add Network</Button>
      </div>
    </>
  );
};
