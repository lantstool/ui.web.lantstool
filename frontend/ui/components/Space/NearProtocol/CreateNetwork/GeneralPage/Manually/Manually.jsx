import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { Button } from '../../../../../_general/Button/Button.jsx';
import { RpcForm } from '../../../../../_general/nearProtocol/RpcForm/RpcForm.jsx';
import { useRpcForm } from '../../../../../_general/nearProtocol/RpcForm/useRpcForm.js';
import cn from './Manually.module.scss';

export const Manually = () => {
  const { spaceId } = useParams();
  const createManually = useStoreEffect((store) => store.nearProtocol.networks.createManually);
  const navigate = useNavigate();

  const form = useRpcForm();

  const onSubmit = form.handleSubmit((formValues) => {
    createManually({ formValues, spaceId, navigate });
  });

  return (
    <>
      <RpcForm form={form} classes={{ container: cn.rpcFormContainer }} />
      <div className={cn.buttonWrapper}>
        <Button onClick={onSubmit}>Add Network</Button>
      </div>
    </>
  );
};
