import { ModalFooter } from '../../../../../../../../../_general/modals/ModalFooter/ModalFooter.jsx';
import { RpcForm } from '../../../../../../../../../_general/nearProtocol/RpcForm/RpcForm.jsx';
import { useRpcForm } from '../../../../../../../../../_general/nearProtocol/RpcForm/useRpcForm.js';
import cn from './AddManually.module.scss';

export const AddManually = () => {
  const form = useRpcForm();

  const onSubmit = form.handleSubmit((formValues) => {
    console.log(formValues);
  });

  return (
    <>
      <RpcForm form={form} classes={{ container: cn.rpcForm }}/>
      <ModalFooter
        action={{
          label: 'Add',
          onClick: onSubmit,
        }}
        classes={{ container: cn.modalFooter}}
      />
    </>
  );
};
