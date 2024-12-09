import { DeleteModal as Modal } from '../../../../../../../../../_general/modals/DeleteModal/DeleteModal.jsx';
import { useStoreEffect } from '@react-vault';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ rpc, rpcType, spaceId, networkId, close }) => {
  const removeRpc = useStoreEffect((store) => store.nearProtocol.networks.removeRpc);

  const remove = () => {
    removeRpc({ rpcId: rpc.id, rpcType, spaceId, networkId, close });
  };

  return (
    <Modal
      close={close}
      submit={remove}
      text={{
        title: (
          <>
            Delete <span className={cn.deleteText}>{rpc.name} RPC?</span>
          </>
        ),
        description: `
          Don’t worry – you can always add this RPC again from the predefined list.
        `,
        submitButtonText: 'Remove',
      }}
    />
  );
};
