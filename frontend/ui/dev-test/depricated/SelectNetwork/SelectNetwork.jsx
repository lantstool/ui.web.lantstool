import cn from './SelectNetwork.module.scss';
import { ArrowDownIcon } from '../../../assets/components/ArrowDownIcon.jsx';
import { useEffect, useMemo, useState } from 'react';
import { useStoreState, useStoreEffect } from '../../../../../react-vault/index.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Popup } from './Popup/Popup.jsx';
import { useLoader } from '../../../hooks/useLoader.js';

const useGetMenuItems = (networkId) => {
  const { ids, records } = useStoreState((store) => store.nearProtocol.networks);

  return useMemo(
    () =>
      ids
        .filter((id) => id !== networkId)
        .map((id) => ({ networkId: records[id].networkId, name: records[id].name })),
    [networkId, ids, records],
  );
};

export const SelectNetwork = ({ spaceId, networkId }) => {
  const [isOpen, setOpen] = useState(false);
  // const navigate = useNavigate();
  // const changeNetwork = useStoreEffect((store) => store.nearProtocol.networks.changeNetwork);
  const getAll = useStoreEffect((store) => store.nearProtocol.networks.getAll);

  useLoader(getAll, { spaceId });

  const items = useGetMenuItems(networkId);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  // const handleMenuItemClick = (networkId) => {
  //   changeNetwork({ navigate, networkId, closeMenu });
  // };

  return (
    <div className={cn.network}>
      <button onClick={openMenu} className={cn.networkBtn}>
        <h2 className={cn.networkId}>{networkId}</h2>
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
          // handleMenuItemClick={handleMenuItemClick}
        />
      </div>
    </div>
  );
};
