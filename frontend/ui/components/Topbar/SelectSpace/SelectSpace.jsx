import { useMatch, useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { useRef, useState } from 'react';
import { DropDown } from './DropDown/DropDown.jsx';
import { DropDownSelector } from '../_general/DropDownSelector/DropDownSelector.jsx';
import { Badge } from '@gc/Badge/Badge.jsx';
import cn from './SelectSpace.module.scss';

export const SelectSpace = () => {
  const { spaceId } = useParams();
  const getAll = useStoreEffect((store) => store.spaces.getAll);
  const records = useStoreState((store) => store.spaces.records);
  const [isLoading] = useLoader(getAll);
  const [isOpen, setOpen] = useState(false);
  const match = useMatch('/space/:spaceId/*');
  const anchorRef = useRef(null);

  if (isLoading || !match) return null;

  const openMenu = () => setOpen(true);

  return (
    <div className={cn.selectSpace} ref={anchorRef}>
      <DropDownSelector title={records[spaceId].name} openMenu={openMenu} isOpen={isOpen}>
        <Badge badge={records[spaceId].badge} />
      </DropDownSelector>
      <DropDown isOpen={isOpen} setOpen={setOpen} spaceId={spaceId} anchorEl={anchorRef.current}/>
    </div>
  );
};
