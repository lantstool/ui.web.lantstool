import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../../../../_general/BackButton/BackButton.jsx';
import logoLantstool from '@assets/logoLantstool.svg';
import { Button } from '../../../../_general/Button/Button.jsx';
import { RpcForm } from '../../../../_general/nearProtocol/RpcForm/RpcForm.jsx';
import { useRpcForm } from '../../../../_general/nearProtocol/RpcForm/useRpcForm.js';
import cn from './CreateManually.module.scss';

export const CreateManually = () => {
  const { spaceId } = useParams();
  const createManually = useStoreEffect((store) => store.nearProtocol.networks.createManually);
  const navigate = useNavigate();

  const form = useRpcForm();

  const onSubmit = form.handleSubmit((formValues) => {
    createManually({ formValues, spaceId, navigate });
  });

  return (
    <div className={cn.container}>
      <BackButton classes={{ container: cn.backButtonContainer }} />
      <img className={cn.logo} src={logoLantstool} alt="Lantstool logo" />
      <h1 className={cn.title}>Add Network</h1>
      <p className={cn.description}>
        Enter the RPC URL, and the app will handle everything for you.
        You can manage this RPC later in the settings.
      </p>
      <RpcForm form={form} classes={{ container: cn.rpcFormContainer }} />
      <div className={cn.buttonWrapper}>
        <Button onClick={onSubmit}>Add Network</Button>
      </div>
    </div>
  );
};
