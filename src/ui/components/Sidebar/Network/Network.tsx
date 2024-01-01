import cn from '../Sidebar.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu, MenuItem } from '@mui/material';
import { useMemo, useState } from 'react';
import { useStoreState, useStoreAction } from '../../../../react-vault';

const useGetMenuItems = () => {
  const { current, list, map }: any = useStoreState((store: any) => store.networks);

  return useMemo(
    () =>
      list
        .filter((id: any) => id !== current.networkId)
        .map((id: any) => ({ networkId: map[id].networkId, name: map[id].name })),
    [current.networkId, list, map],
  );
};

export const Network = () => {
  const current: any = useStoreState((store: any) => store.networks.current);
  const setCurrent = useStoreAction((store: any) => store.networks.setCurrent);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const items = useGetMenuItems();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (networkId: any) => {
    setCurrent({ networkId });
    handleClose();
  };

  return (
    <>
      <div className={cn.subtitleGroup} onClick={handleClick}>
        <h4 className={cn.subtitle}>{current.name}</h4>
        <KeyboardArrowDownIcon style={{ color: 'white' }} />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {items.map((network: any) => (
          <MenuItem key={network.networkId} onClick={() => handleMenuItemClick(network.networkId)}>
            {network.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
