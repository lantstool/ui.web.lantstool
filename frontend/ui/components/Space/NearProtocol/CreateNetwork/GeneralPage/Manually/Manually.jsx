import { ManuallyForm } from '../../../../../_general/nearProtocol/ManuallyForm/ManuallyForm.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useRpcForm } from '../../../../../_general/nearProtocol/RpcForm/useRpcForm.js';

export const Manually = () => {
  const { spaceId } = useParams();
  const createManually = useStoreEffect((store) => store.nearProtocol.networks.createManually);
  const navigate = useNavigate();

  const form = useRpcForm();

  const onSubmit = form.handleSubmit((formValues) => {
    createManually({ formValues, spaceId, navigate });
  });

  return <ManuallyForm form={form} onSubmit={onSubmit} btnText="Add network" />;
};
