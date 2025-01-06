import { PresetForm } from '../../../../../_general/nearProtocol/PresetForm/PresetForm.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useForm } from 'react-hook-form';

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
    <PresetForm
      availablePresets={availablePresets}
      onSubmit={onSubmit}
      form={form}
      btnText="Add network"
    />
  );
};
