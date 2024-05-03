import cn from './Network.module.css';
import { ArrowDownIcon } from '../../../assets/components/ArrowDownIcon.jsx';
import { useEffect, useMemo, useState } from 'react';
import { useStoreState, useStoreEffect } from '../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import { Popup } from './Popup/Popup.jsx';

const useGetMenuItems = () => {
  const { current, list, map } = useStoreState((store) => store.networks);

  return useMemo(
    () =>
      list
        .filter((id) => id !== current?.networkId)
        .map((id) => ({ networkId: map[id].networkId, name: map[id].name })),
    [current?.networkId, list, map],
  );
};

export const Network = () => {
  const changeNetwork = useStoreEffect((store) => store.networks.changeNetwork);
  const current = useStoreState((store) => store.networks.current);
  const getNetworks = useStoreEffect((store) => store.networks.getNetworks);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const items = useGetMenuItems();

  useEffect(() => {
    getNetworks();
  }, []);

  const openMenu = () => {
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(!isOpen);
    console.log(1);
    console.log(isOpen);
  };

  const handleMenuItemClick = (networkId) => {
    changeNetwork({ navigate, networkId });
    closeMenu();
  };

  return (
    <div className={cn.network}>
      <button onClick={openMenu} className={cn.networkBtn}>
        <h2 className={cn.networkId}> {current.networkId}</h2>
      </button>
      <div className={cn.subtitleGroup}>
        <button className={cn.networkBtn} onClick={openMenu}>
          <ArrowDownIcon style={cn.icon} />
        </button>
        <Popup
          isOpen={isOpen}
          closeMenu={closeMenu}
          position="bottomLeft"
          items={items}
          handleMenuItemClick={handleMenuItemClick}
        />
      </div>
    </div>
  );
};
