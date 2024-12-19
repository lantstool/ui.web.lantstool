import { MenuItem } from '../../../../../../../../_general/menu/MenuItem/MenuItem.jsx';
import { Menu as GeneralMenu } from '../../../../../../../../_general/menu/Menu/Menu.jsx';
import { EditModal } from './EditModal/EditModal.jsx';
import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import { useToggler } from '@hooks/useToggler.js';
import cn from './Menu.module.scss';

export const Menu = ({ rpc, rpcType, spaceId, networkId, isLastRpcInList }) => {
  const [isEditOpen, openEdit, closeEdit] = useToggler();
  const [isRemoveOpen, openRemove, closeRemove] = useToggler();

  return (
    <>
      <GeneralMenu classes={{ container: cn.container, menu: cn.menu }}>
        <MenuItem label="Edit" icon="edit-rename-outline" onClick={openEdit} />
        {!isLastRpcInList && (
          <MenuItem label="Delete" icon="trash-bin-outline" onClick={openRemove} />
        )}
      </GeneralMenu>
      {isEditOpen && (
        <EditModal
          rpc={rpc}
          rpcType={rpcType}
          spaceId={spaceId}
          networkId={networkId}
          close={closeEdit}
        />
      )}
      {isRemoveOpen && (
        <DeleteModal
          rpc={rpc}
          rpcType={rpcType}
          spaceId={spaceId}
          networkId={networkId}
          close={closeRemove}
        />
      )}
    </>
  );
};
