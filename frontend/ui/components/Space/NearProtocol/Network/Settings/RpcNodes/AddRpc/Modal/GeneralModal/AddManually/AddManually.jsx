import { useStoreEffect } from '@react-vault';
import { ModalFooter } from '../../../../../../../../../_general/modals/ModalFooter/ModalFooter.jsx';
import { RpcForm } from '../../../../../../../../../_general/nearProtocol/RpcForm/RpcForm.jsx';
import { useRpcForm } from '../../../../../../../../../_general/nearProtocol/RpcForm/useRpcForm.js';
import cn from './AddManually.module.scss';

export const AddManually = ({ network, close }) => {
  const addUserDefinedRpc = useStoreEffect(
    (store) => store.nearProtocol.networks.addUserDefinedRpc,
  );
  const form = useRpcForm();

  const onSubmit = form.handleSubmit((formValues) => {
    addUserDefinedRpc({ network, formValues, close });
  });

  return (
    <>
      <RpcForm form={form} classes={{ container: cn.rpcForm }} />
      <ModalFooter
        action={{
          label: 'Add',
          onClick: onSubmit,
        }}
        classes={{ container: cn.modalFooter }}
      />
    </>
  );
};
