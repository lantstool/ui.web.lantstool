import { useStoreEffect } from '@react-vault';
import { BaseModal } from '../../../../../../../../../_general/modals/BaseModal/BaseModal.jsx';
import { ModalFooter } from '../../../../../../../../../_general/modals/ModalFooter/ModalFooter.jsx';
import { ModalHeader } from '../../../../../../../../../_general/modals/ModalHeader/ModalHeader.jsx';
import { RpcForm } from '../../../../../../../../../_general/nearProtocol/RpcForm/RpcForm.jsx';
import { useRpcForm } from '../../../../../../../../../_general/nearProtocol/RpcForm/useRpcForm.js';
import cn from './EditModal.module.scss';

export const EditModal = ({ rpc, rpcType, spaceId, networkId, close }) => {
  const editUserDefinedRpc = useStoreEffect(
    (store) => store.nearProtocol.networks.editUserDefinedRpc,
  );
  const form = useRpcForm(rpc);

  const submit = form.handleSubmit((formValues) => {
    editUserDefinedRpc({ rpc, rpcType, formValues, spaceId, networkId, close });
  });

  return (
    <BaseModal close={close} classes={{ modal: cn.modal }}>
      <ModalHeader title="Edit RPC" close={close} classes={{ container: cn.headerContainer }} />
      <RpcForm form={form} classes={{ container: cn.rpcForm }} />
      <ModalFooter
        close={close}
        action={{
          label: 'Save',
          onClick: submit,
        }}
        classes={{ container: cn.modalFooter }}
      />
    </BaseModal>
  );
};
