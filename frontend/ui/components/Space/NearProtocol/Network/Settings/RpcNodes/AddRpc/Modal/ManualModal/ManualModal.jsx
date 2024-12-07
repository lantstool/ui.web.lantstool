import { BaseModal } from '../../../../../../../../_general/modals/BaseModal/BaseModal.jsx';
import { ModalFooter } from '../../../../../../../../_general/modals/ModalFooter/ModalFooter.jsx';
import { ModalHeader } from '../../../../../../../../_general/modals/ModalHeader/ModalHeader.jsx';
import { RpcForm } from '../../../../../../../../_general/nearProtocol/RpcForm/RpcForm.jsx';
import { useRpcForm } from '../../../../../../../../_general/nearProtocol/RpcForm/useRpcForm.js';
import cn from './ManualModal.module.scss';

export const ManualModal = ({ network, close }) => {
  const form = useRpcForm();

  const onSubmit = form.handleSubmit((formValues) => {
    console.log(network.networkId, formValues);
  });

  return (
    <BaseModal close={close} classes={{ modal: cn.modal }}>
      <ModalHeader title="Add RPC" close={close} classes={{ container: cn.headerContainer }} />
      <RpcForm form={form} classes={{ container: cn.rpcForm }} />
      <ModalFooter
        action={{
          label: 'Add',
          onClick: onSubmit,
        }}
        classes={{ container: cn.modalFooter }}
      />
    </BaseModal>
  );
};
