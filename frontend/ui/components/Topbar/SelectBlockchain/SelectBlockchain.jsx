import { useMatch, useNavigate } from 'react-router-dom';
import { DropDownSelector } from '../_general/DropDownSelector/DropDownSelector.jsx';
import { useState } from 'react';
import { Popper } from '../_general/Popper/Popper.jsx';
import { NearToken } from '../../_general/icons/NearToken.jsx';
import { ClockCircleOutline } from '../../_general/icons/ClockCircleOutline.jsx';
import { CheckMarkOutline } from '../../_general/icons/CheckmarkOutline.jsx';
import cn from './SelectBlockchain.module.scss';

export const SelectBlockchain = () => {
  const navigate = useNavigate();
  const match = useMatch('/space/:spaceId/:segment/*');
  const [isOpen, setOpen] = useState(false);

  if (!match) return null;

  const { spaceId, segment } = match.params;
  if (segment === 'select-blockchain' || segment === 'settings') return null;

  const closeMenu = () => setOpen(false);
  const openMenu = () => setOpen(true);
  const selectNearProtocol = () => {
    navigate(`space/${spaceId}/near-protocol`);
    closeMenu();
  };

  return (
    <>
      <hr className={cn.border} />
      <div className={cn.selectBlockchain}>
        <DropDownSelector isOpen={isOpen} title="NEAR Protocol" openMenu={openMenu}>
          <NearToken style={cn.icon} />
        </DropDownSelector>
        <Popper isOpen={isOpen} closeMenu={closeMenu}>
          <div className={cn.dropdown}>
            <div className={cn.container}>
              <button onClick={selectNearProtocol} className={cn.item}>
                <div className={cn.itemWrapper}>
                  <NearToken style={cn.icon} />
                  <p className={cn.title}>NEAR Protocol</p>
                </div>
                <CheckMarkOutline style={cn.icon} />
              </button>
            </div>
            <hr className={cn.settingsBorder} />
            <div className={cn.settings}>
              <div className={cn.comingSoon}>
                <ClockCircleOutline style={cn.clockIcon} />
                <p className={cn.message}>More blockchains coming later...</p>
              </div>
            </div>
          </div>
        </Popper>
      </div>
    </>
  );
};
