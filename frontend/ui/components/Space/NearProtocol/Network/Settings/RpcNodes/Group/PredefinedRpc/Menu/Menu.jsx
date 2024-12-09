import { useState } from 'react';
import { MenuItem } from '../../../../../../../../_general/menu/MenuItem/MenuItem.jsx';
import { Menu as GeneralMenu } from '../../../../../../../../_general/menu/Menu/Menu.jsx';
import { RemoveModal } from './RemoveModal/RemoveModal.jsx';
import cn from './Menu.module.scss';

export const Menu = ({ rpc, rpcType, spaceId, networkId }) => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <>
      <GeneralMenu classes={{ container: cn.container, menu: cn.menu }} closeAfterClickOnItem>
        <MenuItem label="Remove" icon="trash-bin-outline" onClick={open} />
      </GeneralMenu>
      {isOpen && (
        <RemoveModal
          rpc={rpc}
          rpcType={rpcType}
          spaceId={spaceId}
          networkId={networkId}
          close={close}
        />
      )}
    </>
  );
};
