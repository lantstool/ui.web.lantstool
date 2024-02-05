import cn from './Network.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu, MenuItem } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useStoreState, useStoreEffect } from '../../../../react-vault';
import { useNavigate } from 'react-router-dom';

const useGetMenuItems = () => {
  const { current, list, map }: any = useStoreState((store: any) => store.networks);

  return useMemo(
    () =>
      list
        .filter((id: any) => id !== current?.networkId)
        .map((id: any) => ({ networkId: map[id].networkId, name: map[id].name })),
    [current?.networkId, list, map],
  );
};

export const Network = () => {
  const current: any = useStoreState((store: any) => store.networks.current);
  const getNetworks = useStoreEffect((store: any) => store.networks.getNetworks);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const items = useGetMenuItems();

  useEffect(() => {
    getNetworks();
  }, []);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (networkId: any) => {
    navigate(`/${networkId}`);
    handleClose();
  };

  return (
    <>
      <div className={cn.subtitleGroup} onClick={handleClick}>
        <h4 className={cn.subtitle}>{current.networkId}</h4>
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
            {network.networkId}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
