import { useMatch, useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { useState } from 'react';
import { DropDown } from './DropDown/DropDown.jsx';
import { DropDownSelector } from '../_general/DropDownSelector/DropDownSelector.jsx';
import cn from './SelectSpace.module.scss';

export const SelectSpace = () => {
  const { spaceId } = useParams();
  const getAll = useStoreEffect((store) => store.spaces.getAll);
  const records = useStoreState((store) => store.spaces.records);
  const [isLoading] = useLoader(getAll);
  const [isOpen, setOpen] = useState(false);
  const match = useMatch('/space/:spaceId/*');

  if (isLoading || !match) return null;

  const openMenu = () => setOpen(true);

  return (
    <div className={cn.selectSpace}>
      <DropDownSelector title={records[spaceId].name} openMenu={openMenu} isOpen={isOpen}>
        <div className={cn.badge} />
      </DropDownSelector>
      <DropDown isOpen={isOpen} setOpen={setOpen} spaceId={spaceId} />
    </div>
  );
};
