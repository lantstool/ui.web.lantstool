import { useState } from 'react';
import { MenuItem } from '../../../../../../../../_general/menu/MenuItem/MenuItem.jsx';
import { Menu as GeneralMenu } from '../../../../../../../../_general/menu/Menu/Menu.jsx';
import { DeleteModal } from './DeleteModal/DeleteModal.jsx';
import cn from './Menu.module.scss';

export const Menu = ({ rpc, rpcType, spaceId, networkId, isLastRpcInList }) => {
  const [isRemoveOpen, setRemoveOpen] = useState(false);

  const openRemove = () => setRemoveOpen(true);
  const closeRemove = () => setRemoveOpen(false);

  return (
    <>
      <GeneralMenu classes={{ container: cn.container, menu: cn.menu }}>
        <MenuItem label="Edit" icon="edit-rename-outline" />
        {!isLastRpcInList && <MenuItem label="Delete" icon="trash-bin-outline" onClick={openRemove} />}
      </GeneralMenu>
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
