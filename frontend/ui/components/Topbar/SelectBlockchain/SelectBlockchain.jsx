import { useMatch, useNavigate } from 'react-router-dom';
import { DropDownSelector } from '../_general/DropDownSelector/DropDownSelector.jsx';
import { useState } from 'react';
import { Popper } from '@gc/Popper/Popper.jsx';
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
          <span className={cn.nearToken} />
        </DropDownSelector>
        <Popper isOpen={isOpen} closeMenu={closeMenu}>
          <div className={cn.dropdown}>
            <div className={cn.container}>
              <button onClick={selectNearProtocol} className={cn.item}>
                <div className={cn.itemWrapper}>
                  <span className={cn.nearTokenLight} />
                  <p className={cn.title}>NEAR Protocol</p>
                </div>
                <span className={cn.checkmarkIcon} />
              </button>
            </div>
            <hr className={cn.settingsBorder} />
            <div className={cn.settings}>
              <div className={cn.comingSoon}>
                <div className={cn.clock}>
                  <span className={cn.clockIcon} />
                </div>
                <p className={cn.message}>More blockchains coming soon</p>
              </div>
            </div>
          </div>
        </Popper>
      </div>
    </>
  );
};
