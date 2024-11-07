import { useMatch, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { DropDownSelector } from '../_general/DropDownSelector/DropDownSelector.jsx';
import { DropDown } from './DropDown/DropDown.jsx';
import { useState } from 'react';
import cn from './SelectNearNetwork.module.scss';

export const SelectNearNetwork = () => {
  const { spaceId, networkId } = useParams();
  const getAll = useStoreEffect((store) => store.nearProtocol.networks.getAll);
  const [isOpen, setOpen] = useState(false);
  const [isLoading] = useLoader(getAll, { spaceId }, [spaceId]);
  const match = useMatch('/space/:spaceId/near-protocol/*');

  // We also want to hide select when user go to '/near-protocol/networks' - we use networkId for that
  if (isLoading || !match || !networkId) return null;

  const openMenu = () => setOpen(true);

  return (
    <div className={cn.selectNearNetwork}>
      <DropDownSelector isOpen={isOpen} title={networkId} openMenu={openMenu} />
      <DropDown isOpen={isOpen} setOpen={setOpen} spaceId={spaceId} networkId={networkId} />
    </div>
  );
};
