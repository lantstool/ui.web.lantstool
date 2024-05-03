import cn from './Network.module.css';
import { ArrowDownIcon } from '../../../assets/components/ArrowDownIcon.jsx';
import { useEffect, useMemo, useState } from 'react';
import { useStoreState, useStoreEffect } from '../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import { Popup } from './Popup/Popup.tsx';

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
  const changeNetwork = useStoreEffect((store: any) => store.networks.changeNetwork);
  const current: any = useStoreState((store: any) => store.networks.current);
  const getNetworks = useStoreEffect((store: any) => store.networks.getNetworks);
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

  const handleMenuItemClick = (networkId: any) => {
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
